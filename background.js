console.log("CharTracker")

// TODO: Move into storage so they can be set by users
// Time units should be in hours
var MIN_TIME_READ = 1
var MAX_TIME_MULTIPLE = 2
var MIN_CHAR_READTIME = 1 / 1000

// Times are all stored as milliseconds
// TODO: Change units throughout to something more reasonable
MIN_CHAR_READTIME = MIN_CHAR_READTIME * 60 * 60 * 1000

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
//     "game_path_0": "line"
// }

function lineFetched(event) {
    // Start by getting a timestamp for accuracy
    rn = new Date()
    date = rn.getFullYear() + "/" + rn.getMonth() + "/" + rn.getDate()
    time = rn.getTime()

    // Parse provided data
    // Should contain sentence and executable (process) path
    data = JSON.parse(event.data)
    console.log("Raw Data: ", data)

    process_path = data["process_path"]
    line = data["sentence"]

    // Update or create a game entry
    // Each game is stored as numerous small chunks of data
    chrome.storage.local.get(
        [process_path, process_path + "_" + date],
        function(game_entry) {
            if (Object.keys(game_entry).length === 0) {
                createGameEntry(process_path, line, date, time)
            } else {
                updatedGameEntry(game_entry, process_path, line, date, time)
            }
        }
    )
}

async function createGameEntry(process_path, line, date, time) {
    var game_entry = {}
    game_entry[process_path] = newGameEntry(process_path, date)
    game_entry[process_path + "_" + date] = await newDateEntry(process_path, line, time)
    game_entry[process_path + "_0"] = line

    chrome.storage.local.set(game_entry)
}

async function updatedGameEntry(game_entry, process_path, line, date, time) {
    // Update the main entry
    game_main_entry = game_entry[process_path]
    if (!game_main_entry["dates_read_on"].includes(date)) {
        game_main_entry["dates_read_on"].push(date)
    }
    game_main_entry["last_line_added"] += 1
    dates_read_on = structuredClone(game_main_entry["dates_read_on"])

    // Add the recieved line
    game_entry[process_path + "_" + game_main_entry["last_line_added"]] = line

    // Update the daily statistics entry
    game_date_entry = game_entry[process_path + "_" + date]
    
    // The average/estimate is calculated first even though its added afterwards
    // Ensures only previous history effects current measures
    elapsed_time = time - game_date_entry["last_line_recieved"]
    estimate_read_time = await estimateLineReadtime(dates_read_on, process_path, line)
    
    game_date_entry["lines_read"] += lineSplitCount(line)
    game_date_entry["chars_read"] += charsInLine(line)
    game_date_entry["last_line_recieved"] = time

    // Check whether some multiple of the average (or worst case) read time was taken
    // If this was not the case then a break was likely taken
    if (elapsed_time <= (MAX_TIME_MULTIPLE * estimate_read_time)) {
        game_date_entry["time_read"] += elapsed_time
    } else {
        game_date_entry["time_read"] += estimate_read_time
        game_date_entry["last_session_start"] = time
    }
    
    chrome.storage.local.set(game_entry)
}

async function recentAverageCharSpeed(dates_read_on, process_path) {
    // When nothing can be found use a reasonable slow speed measure
    if (dates_read_on.length == 0) {
        return MIN_CHAR_READTIME
    }

    last_date = dates_read_on.pop()

    char_speed = new Promise((resolve, reject) => {
        chrome.storage.local.get(process_path + "_" + last_date, function(last_game_entry) {
            last_game_date_entry = last_game_entry[process_path + "_" + last_date]

            time_read = last_game_date_entry["time_read"]
            chars_read = last_game_date_entry["chars_read"]

            if (time_read >= MIN_TIME_READ) {
                resolve(time_read / chars_read)
            }
            else {
                resolve(predictedLineReadTime(dates_read_on, process_path))
            }
        })
    })

    return char_speed
}

async function estimateLineReadtime(dates_read_on, process_path, line) {
    return (await recentAverageCharSpeed(dates_read_on, process_path)) * charsInLine(line)
}

function newGameEntry(name, date) {
    var game_entry = {
        "name": name,
        "dates_read_on": [date],
        "last_line_added": 0
    }

    return game_entry
}

async function newDateEntry(process_path, line, time) {
    return {
        "lines_read": lineSplitCount(line),
        "chars_read": charsInLine(line),
        "time_read": await estimateLineReadtime([], process_path, line),
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
