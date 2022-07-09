(() => {
  // src/calculations.js
  function charsInLine(line2) {
    return line2.length;
  }
  function lineSplitCount(line2) {
    line2.split("\n");
    return line2.split("\n").length;
  }

  // src/storage.js
  var MAX_TIME_AWAY = 1 * 60 * 60 * 1e3;
  async function previousGameEntry() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("previously_hooked", function(game_entry2) {
        if (game_entry2 === void 0 || game_entry2["previously_hooked"] === void 0) {
          reject();
        }
        chrome.storage.local.get(game_entry2["previously_hooked"], function(game_entry3) {
          resolve(game_entry3);
        });
      });
    });
  }
  function safeDeleteLine(process_path2, line_id2, line2) {
    line_key = JSON.stringify([process_path2, line_id2]);
    chrome.storage.local.remove(line_key);
    chrome.storage.local.get(process_path2, function(game_entry2) {
      last_read_date = game_entry2[process_path2]["dates_read_on"].at(-1);
      game_date_key = process_path2 + "_" + last_read_date;
      chrome.storage.local.get(game_date_key, function(game_entry3) {
        game_entry3[game_date_key]["lines_read"] -= lineSplitCount(line2);
        game_entry3[game_date_key]["chars_read"] -= charsInLine(line2);
        chrome.storage.local.set(game_entry3);
      });
    });
  }

  // src/check_entry_type.js
  function isGameEntry(key, new_value) {
    try {
      return typeof key === "string" && typeof new_value == "object" && "name" in new_value && "dates_read_on" in new_value && "last_line_added" in new_value;
    } catch {
    }
    return false;
  }
  function isGameDateEntry(key, new_value) {
    try {
      return typeof key === "string" && typeof new_value == "object" && "lines_read" in new_value && "chars_read" in new_value && "time_read" in new_value && "last_line_recieved" in new_value;
    } catch {
    }
    return false;
  }
  function isLineEntry(key, old_value, new_value) {
    try {
      parsed = JSON.parse(key);
      return old_value == void 0 && typeof new_value == "string" && typeof key === "string" && parsed.length == 2 && typeof parsed[0] === "string" && Number.isInteger(parsed[1]);
    } catch {
    }
    return false;
  }

  // src/inject.js
  console.log("Injected");
  var previous_game;
  function gameNameChanged(event) {
    chrome.storage.local.get(previous_game, function(game_entry2) {
      game_entry2[previous_game]["name"] = event["target"].value;
      chrome.storage.local.set(game_entry2);
    });
  }
  document.getElementById("game_name").onchange = gameNameChanged;
  async function showNameTitle(game_name) {
    game_name_heading = document.getElementById("game_name");
    game_name_heading.disabled = true;
    game_name_heading.value = game_name;
    game_name_heading.disabled = false;
    document.title = "CharTracker | " + game_name;
  }
  function deleteLine(event) {
    confirmed = confirm("Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly however time read won't change...");
    if (confirmed) {
      element_div = event["target"].parentNode;
      line_id = Number.parseInt(element_div.dataset.line_id);
      line = element_div.querySelector(".sentence").textContent;
      safeDeleteLine(previous_game, line_id, line);
      element_div.remove();
    }
  }
  function newLineDiv(line2, line_id2) {
    container_div = document.createElement("div");
    new_svg = document.createElement("svg");
    new_p = document.createElement("p");
    new_button = document.createElement("button");
    container_div.classList.add("sentence-entry");
    new_svg.classList.add("circle-bullet-point");
    new_p.classList.add("sentence");
    new_button.classList.add("delete-button");
    new_button.classList.add("material-icons");
    container_div.dataset.line_id = line_id2;
    new_p.innerHTML = line2;
    new_button.innerHTML = "delete";
    new_button.onclick = deleteLine;
    container_div.appendChild(new_svg);
    container_div.appendChild(new_p);
    container_div.appendChild(new_button);
    return container_div;
  }
  function insertLine(line2, line_id2) {
    entry_holder = document.getElementById("entry_holder");
    new_div = newLineDiv(line2, line_id2);
    entry_holder.appendChild(new_div);
  }
  async function bulkLineAdd(game_entry2, game_name) {
    max_line_id = game_entry2["last_line_added"];
    id_queries = [...Array(max_line_id + 1).keys()].map((id) => JSON.stringify([game_name, id]));
    chrome.storage.local.get(id_queries, function(game_date_entries) {
      line_divs = [];
      for (let [key, line2] of Object.entries(game_date_entries)) {
        line_id = JSON.parse(key)[1];
        line_divs.push(newLineDiv(line2, line_id));
      }
      document.getElementById("entry_holder").replaceChildren(...line_divs);
    });
  }
  function setStats(chars_read, time_read) {
    document.getElementById("chars_read").innerHTML = chars_read.toLocaleString();
    average = Math.round(chars_read / (time_read / (60 * 60 * 1e3)));
    document.getElementById("chars_per_hour").innerHTML = average.toLocaleString();
  }
  async function startup() {
    document.getElementById("entry_holder").replaceChildren();
    try {
      game_entry = await previousGameEntry();
      previous_game = Object.keys(game_entry)[0];
      bulkLineAdd(game_entry[previous_game], previous_game);
      showNameTitle(game_entry[previous_game]["name"]);
    } catch {
    }
  }
  startup();
  chrome.storage.local.onChanged.addListener(function(changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (isGameEntry(key, newValue)) {
        if (key != previous_game) {
          showNameTitle(newValue["name"]);
          bulkLineAdd(newValue, key);
        }
      }
      if (isGameDateEntry(key, newValue)) {
        setStats(newValue["chars_read"], newValue["time_read"]);
      }
      if (isLineEntry(key, oldValue, newValue)) {
        process_path = key[0];
        line_id = key[1];
        line = newValue;
        if (process_path == previous_game) {
          insertLine(line, line_id);
        }
      }
    }
  });
})();
