console.log("CharTracker")

function connectToWebSocket(_) {
    const socket = new WebSocket("ws://localhost:9001")

    socket.onmessage = lineFetched
    socket.onopen = connectionOpened
    socket.onclose = connectToWebSocket
}

function connectionOpened(event) {
    console.log("Connected")
}

// STORAGE SPEC
// {
//     "game_path": {
//         "name": "",
//         "dates_read_on": [],
//         "last_line_added": "id"
//         "date": {
//             "lines_read": 0,
//             "chars_read": 0,
//             "time_read": 0,
//             "last_line_recieved": ...,
//             "last_session_start": ...
//         },
//     },
//     "game_path_lines": {
//         "id": "line"
//     },
// }

function lineFetched(event) {
    // Start by getting a timestamp for accuracy
    rn = new Date();
    date = rn.getFullYear() + "/" + rn.getMonth() + "/" + rn.getDate();
    time = rn.getTime()

    // Parse provided data
    // Should contain sentence and executable (process) path
    // TODO: Check
    data = JSON.parse(event.data)
    console.log("Raw Data: ", data)

    // Update or create a game entry
    chrome.storage.local.get(data["process_path"], function(result) {
        // Create a new game entry if one doesn't exist already
        // TODO: Otherwise update the existing one
        if (Object.keys(result).length === 0) {
            var game_entry = {}
            game_entry[data["process_path"]] = newGameEntry(
                data["process_path"], data["sentence"], date, time
            )
            game_entry[data["process_path"] + "_lines"] = {0: data["sentence"]}
            chrome.storage.local.set(game_entry);
        } else {
        }
    });
}

function newGameEntry(name, line, date, time) {
    var game_entry = {
        "name": name,
        "dates_read_on": [date],
        "last_line_added": 0
    };
    
    game_entry[date] = newDateEntry(line, time)

    return game_entry
}

function newDateEntry(line, time) {
    return {
        "lines_read": lineSplitCount(line), // TODO: CHECK FOR LINE BREAKS
        "chars_read": charsInLine(line),
        "time_read": 0,
        "last_line_recieved": time,
        "last_session_start": time
    }
}

function lineSplitCount(line) {
    line.split("\n")
    return line.split("\n").length
}

// TODO: Filter useless characters
function charsInLine(line) {
    return line.length
}

connectToWebSocket()
