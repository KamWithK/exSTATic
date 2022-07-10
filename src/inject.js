console.log("Injected")

import { previousGameEntry, safeDeleteLine, todayGameEntry } from "./storage"
import { isGameEntry, isGameDateEntry, isLineEntry } from "./check_entry_type"
import { exportStats } from "./stats"
import { timeNowSeconds } from "./calculations"

var SECS_TO_HOURS = 60 * 60

// In seconds
var MAX_TIME_AWAY = 60

// In milliseconds
REFRESH_STATS_INTERVAL = 1000

var previous_game
var previous_time
var chars_read
var time_read
var idle_time_added = true

function gameNameChanged(event) {
    chrome.storage.local.get(previous_game, function(game_entry) {
        game_entry[previous_game]["name"] = event["target"].value

        chrome.storage.local.set(game_entry)
    })
}
document.getElementById("game_name").onchange = gameNameChanged

async function showNameTitle(game_name) {
    game_name_heading = document.getElementById("game_name")

    // Disable editing of name until the previous value has been set
    game_name_heading.disabled = true
    game_name_heading.value = game_name
    game_name_heading.disabled = false

    // Set the document title
    document.title = "CharTracker | " + game_name
}

function deleteLine(event) {
    confirmed = confirm(
        "Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly however time read won't change..."
    )

    if (confirmed) {
        element_div = event["target"].parentNode
        
        line_id = Number.parseInt(element_div.dataset.line_id)
        line = element_div.querySelector(".sentence").textContent

        safeDeleteLine(previous_game, line_id, line)
        element_div.remove()
    }
}

function newLineDiv(line, line_id) {
    container_div = document.createElement("div")
    new_svg = document.createElement("svg")
    new_p = document.createElement("p")
    new_button = document.createElement("button")
    
    container_div.classList.add("sentence-entry")
    new_svg.classList.add("circle-bullet-point")
    new_p.classList.add("sentence")
    new_button.classList.add("delete-button")
    new_button.classList.add("material-icons")

    container_div.dataset.line_id = line_id    
    new_p.innerHTML = line
    new_button.innerHTML = "delete"

    new_button.onclick = deleteLine;
    
    container_div.appendChild(new_svg)
    container_div.appendChild(new_p)
    container_div.appendChild(new_button)

    return container_div
}

function insertLine(line, line_id) {
    entry_holder = document.getElementById("entry_holder")
    new_div = newLineDiv(line, line_id)
    entry_holder.appendChild(new_div)
}

async function bulkLineAdd(game_entry, game_name) {
    max_line_id = game_entry["last_line_added"]

    id_queries = [...Array(max_line_id + 1).keys()].map(id => JSON.stringify([game_name, id]))

    chrome.storage.local.get(id_queries, function(game_date_entries) {
        line_divs = []

        for (let [key, line] of Object.entries(game_date_entries)) {
            line_id = JSON.parse(key)[1]
            line_divs.push(newLineDiv(line, line_id))
        }

        document.getElementById("entry_holder").replaceChildren(...line_divs)
    })
}

function setStats(chars_read, time_read) {
    // Set char counter
    document.getElementById("chars_read").innerHTML = chars_read.toLocaleString()

    // Set speed
    average = Math.round(chars_read / (time_read / SECS_TO_HOURS))
    document.getElementById("chars_per_hour").innerHTML = average.toLocaleString()

    // Set elapsed time
    date = new Date(0)
    date.setSeconds(time_read)
    document.getElementById("elapsed_time").innerHTML = date.toISOString().substr(11, 8)
}

document.getElementById("font").onchange = function(event) {
    chrome.storage.local.set({
        "font": event["target"].value
    })
    document.documentElement.style.setProperty("--default-jp-font", event["target"].value)
}

document.getElementById("font_size").onchange = function(event) {
    chrome.storage.local.set({
        "font_size": event["target"].value
    })
    document.documentElement.style.setProperty("--default-jp-font-size", event["target"].value + "rem")
}

// Initialise empty windows when a previous game is found
async function startup() {
    document.getElementById("entry_holder").replaceChildren()
    try {
        // Set the UI properties
        chrome.storage.local.get(["font", "font_size"], function(property_entries) {
            if (property_entries.hasOwnProperty("font")) {
                document.getElementById("font").value = property_entries["font"]
                document.documentElement.style.setProperty("--default-jp-font", property_entries["font"])
            }

            if (property_entries.hasOwnProperty("font_size")) {
                document.getElementById("font_size").value = property_entries["font_size"]
                document.documentElement.style.setProperty("--default-jp-font-size", property_entries["font_size"] + "rem")
            }
        })

        // Preload entries and set window title
        game_entry = await previousGameEntry()
        previous_game = Object.keys(game_entry)[0]
        bulkLineAdd(game_entry[previous_game], previous_game)
        showNameTitle(game_entry[previous_game]["name"])

        today_previous_game = await todayGameEntry()
        today_previous_game = today_previous_game[Object.keys(today_previous_game)[0]]

        // Preset required properties for statistics
        previous_time = today_previous_game["last_line_recieved"]
        chars_read = today_previous_game["chars_read"]
        time_read = today_previous_game["time_read"]

        setStats(chars_read, time_read)
    } catch {}
}
startup()

// Update the statistics live
setInterval(async function() {
    time_now = timeNowSeconds()
    time_between_lines = time_now - previous_time

    // Keep incrementing the timer whilst no break greater than allowed has been taken
    if (time_between_lines <= MAX_TIME_AWAY) {
        idle_time_added = false
        time_so_far = time_read + time_between_lines

        setStats(chars_read, time_so_far)
    } else {
        // Change the total time read
        if (!idle_time_added) {
            time_read += MAX_TIME_AWAY
            setStats(chars_read, time_read)

            game_entry = await todayGameEntry()
            game_entry[Object.keys(game_entry)[0]]["time_read"] = time_read

            chrome.storage.local.set(game_entry)
            idle_time_added = true
        }
    }
}, REFRESH_STATS_INTERVAL)

chrome.storage.local.onChanged.addListener(function (changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (isGameEntry(key, newValue)) {
            // Change games
            if (key != previous_game) {
                previous_game = key
                showNameTitle(newValue["name"])
                bulkLineAdd(newValue, key)
            }
        }
        
        if (isGameDateEntry(key, newValue)) {
            previous_time = newValue["last_line_recieved"]
            chars_read = newValue["chars_read"]
            time_read = newValue["time_read"]
        }
        
        key = isLineEntry(key, oldValue, newValue)        
        if (key) {
            process_path = key[0]
            line_id = key[1]
            line = newValue
            
            if (process_path == previous_game) {
                insertLine(line, line_id)
            }
        }
    }
})

document.getElementById("export_stats").onclick = exportStats
