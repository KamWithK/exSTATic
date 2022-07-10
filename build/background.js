(() => {
  // src/calculations.js
  var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g;
  var SPLIT = /[\n。.！?？]/g;
  function charsInLine(line2) {
    return line2.replaceAll(IGNORE, "").length;
  }
  function lineSplitCount(line2) {
    return line2.split(SPLIT).length;
  }
  function dateNowString() {
    rn = new Date();
    return rn.getFullYear() + "/" + (rn.getMonth() + 1) + "/" + rn.getDate();
  }
  function timeNowSeconds() {
    rn = new Date();
    return rn.getTime() / 1e3;
  }

  // src/storage.js
  var MAX_TIME_AWAY = 60;
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
      if (elapsed_time <= MAX_TIME_AWAY) {
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
  function setConstants() {
    chrome.storage.local.get("afk_max_time", function(afk_max_entry) {
      if ("afk_max_time" in afk_max_entry) {
        MAX_TIME_AWAY = afk_max_entry["afk_max_time"];
      }
    });
  }
  setConstants();

  // src/background.js
  console.log("CharTracker");
  var SPLIT_PATH = /\\|\//g;
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
    time = timeNowSeconds();
    date = dateNowString();
    data = JSON.parse(event.data);
    console.log("Raw Data: ", data);
    process_path = data["process_path"];
    line = data["sentence"];
    path_segments = process_path.split(SPLIT_PATH);
    process_path = path_segments.slice(Math.max(0, path_segments.length - 3)).join("/");
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
  chrome.runtime.onMessage.addListener(function(arg, sender, send_response) {
    blob = new Blob(arg["csv"], arg["blob_options"]);
    chrome.downloads.download({
      url: URL.createObjectURL(blob),
      filename: arg["filename"]
    });
  });
})();
