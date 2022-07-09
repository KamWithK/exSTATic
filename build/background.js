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
  async function createGameEntry(process_path2, line2, date2, time2) {
    var game_entry = {};
    game_entry[process_path2] = {
      "name": process_path2,
      "dates_read_on": [date2],
      "last_line_added": 0
    };
    game_entry[process_path2 + "_" + date2] = await newDateEntry(process_path2, line2, time2);
    game_entry[JSON.stringify([process_path2, 0])] = line2;
    chrome.storage.local.set(game_entry);
  }
  async function newDateEntry(process_path2, line2, time2) {
    return {
      "lines_read": lineSplitCount(line2),
      "chars_read": charsInLine(line2),
      "time_read": 0,
      "last_line_recieved": time2
    };
  }
  async function updatedGameEntry(game_entry, process_path2, line2, date2, time2) {
    game_main_entry = game_entry[process_path2];
    if (!game_main_entry["dates_read_on"].includes(date2)) {
      game_main_entry["dates_read_on"].push(date2);
    }
    game_main_entry["last_line_added"] += 1;
    dates_read_on = structuredClone(game_main_entry["dates_read_on"]);
    game_entry[JSON.stringify([process_path2, game_main_entry["last_line_added"]])] = line2;
    if (process_path2 + "_" + date2 in game_entry) {
      game_date_entry = game_entry[process_path2 + "_" + date2];
      elapsed_time = time2 - game_date_entry["last_line_recieved"];
      average_char_speed = game_date_entry["chars_read"] / game_date_entry["time_read"];
      estimate_readtime = average_char_speed * charsInLine(line2);
      if (elapsed_time > Math.max(MAX_TIME_AWAY, estimate_readtime)) {
        game_date_entry["time_read"] += estimate_readtime;
      } else {
        game_date_entry["time_read"] += elapsed_time;
      }
      game_date_entry["lines_read"] += lineSplitCount(line2);
      game_date_entry["chars_read"] += charsInLine(line2);
      game_date_entry["last_line_recieved"] = time2;
    } else {
      game_entry[process_path2 + "_" + date2] = await newDateEntry(process_path2, line2, time2);
    }
    chrome.storage.local.set(game_entry);
  }

  // src/background.js
  console.log("CharTracker");
  function connectToWebSocket(_) {
    const socket = new WebSocket("ws://localhost:9001");
    socket.onmessage = lineFetched;
    socket.onopen = connectionOpened;
    socket.onclose = connectToWebSocket;
  }
  function connectionOpened(event) {
    console.log("Connected");
  }
  function lineFetched(event) {
    rn = new Date();
    date = rn.getFullYear() + "/" + rn.getMonth() + "/" + rn.getDate();
    time = rn.getTime();
    data = JSON.parse(event.data);
    console.log("Raw Data: ", data);
    process_path = data["process_path"];
    line = data["sentence"];
    chrome.storage.local.set({ "previously_hooked": process_path });
    chrome.storage.local.get([process_path, process_path + "_" + date], function(game_entry) {
      if (Object.keys(game_entry).length === 0) {
        createGameEntry(process_path, line, date, time);
      } else {
        updatedGameEntry(game_entry, process_path, line, date, time);
      }
    });
  }
  connectToWebSocket();
})();
