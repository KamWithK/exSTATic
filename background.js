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
//     },
//     "game_path_date": {
//         "lines_read": 0,
//         "chars_read": 0,
//         "time_read": 0,
//         "last_line_recieved": ...,
//         "last_session_start": ...
//     },
//     "game_path_lines": {
//         "id": "line"
//     },
// }

function lineFetched(event) {
    // Start by getting a timestamp for accuracy
    rn = new Date()
    date = rn.getFullYear() + "/" + rn.getMonth() + "/" + rn.getDate()
    time = rn.getTime()

    // Parse provided data
    // Should contain sentence and executable (process) path
    // TODO: Check
    data = JSON.parse(event.data)
    console.log("Raw Data: ", data)

    // Update or create a game entry
    // Each game is stored as numerous small chunks of data
    updatedGameEntry(data["process_path"], data["sentence"], date, time)
}

function updatedGameEntry(process_path, line, date, time) {
    chrome.storage.local.get(process_path, function(game_entry) {
        if (Object.keys(game_entry).length === 0) {
            var game_entry = {}
            game_entry[process_path] = newGameEntry(process_path, date)
            game_entry[process_path + "_" + date] = newDateEntry(line, time)
            game_entry[process_path + "_lines"] = {0: line}
        } else {
            if (!game_entry[process_path]["dates_read_on"].includes(date)) {
                game_entry[process_path]["dates_read_on"].push(date)
            }
            game_entry[process_path]["last_line_added"] += 1

            game_entry[process_path + "_" + date] = updateGameDateEntry(process_path, line, date, time)
            game_entry[process_path + "_lines"] = updateGameLines(process_path, line, game_entry[process_path]["last_line_added"])
        }

        chrome.storage.local.set(game_entry)
    })
}

function newGameEntry(name, date) {
    var game_entry = {
        "name": name,
        "dates_read_on": [date],
        "last_line_added": 0
    }

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

function updateGameDateEntry(process_path, line, date, time) {
    chrome.storage.local.get(process_path + "_" + date, function(game_date_entry) {
        game_date_entry[process_path + "_" + date]["lines_read"] += lineSplitCount(line)
        game_date_entry[process_path + "_" + date]["chars_read"] += charsInLine(line)
        // TODO: Add to time read
        game_date_entry[process_path + "_" + date]["last_line_recieved"] += time
        // TODO: Replace last_session_start if necessary

        chrome.storage.local.set(game_date_entry)
    });
}

function updateGameLines(process_path, line, line_id) {
    chrome.storage.local.get(process_path + "_lines", function(game_lines_entry) {
        game_lines_entry[process_path + "_lines"][line_id] = line

        chrome.storage.local.set(game_lines_entry)
    })
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
