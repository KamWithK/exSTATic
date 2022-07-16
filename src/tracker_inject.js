console.log("Injected")

var browser = require("webextension-polyfill")

import { previousGameEntry, todayGameEntry } from "./storage/fetch_storage"
import { safeDeleteLine } from "./storage/update_storage"
import { isGameEntry, isGameDateEntry, isLineEntry } from "./which/storage_type"
import { exportStats } from "./data_wrangling/data_extraction"
import { timeNowSeconds } from "./calculations"

var SECS_TO_HOURS = 60 * 60

// In seconds
var MAX_TIME_AWAY = 60

// In milliseconds
var REFRESH_STATS_INTERVAL = 1000

var previous_game
var previous_time
var chars_read
var time_read
var idle_time_added = true

async function gameNameChanged(event) {
    let game_entry = await browser.storage.local.get(previous_game)
    game_entry[previous_game]["name"] = event["target"].value

    browser.storage.local.set(game_entry)
}
document.getElementById("game_name").onchange = gameNameChanged

function showNameTitle(game_name) {
    let game_name_heading = document.getElementById("game_name")

    // Disable editing of name until the previous value has been set
    game_name_heading.disabled = true
    game_name_heading.value = game_name
    game_name_heading.disabled = false

    // Set the document title
    document.title = "exSTATic | " + game_name
}

function deleteLine(event) {
    confirmed = confirm(
        "Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly however time read won't change..."
    )

    if (confirmed) {
        let element_div = event["target"].parentNode
        
        let line_id = Number.parseInt(element_div.dataset.line_id)
        let line = element_div.querySelector(".sentence").textContent

        safeDeleteLine(previous_game, line_id, line)
        element_div.remove()
    }
}

function newLineDiv(line, line_id) {
    let container_div = document.createElement("div")
    let new_svg = document.createElement("svg")
    let new_p = document.createElement("p")
    let new_button = document.createElement("button")
    
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
    let entry_holder = document.getElementById("entry_holder")
    entry_holder.appendChild(newLineDiv(line, line_id))
}

async function bulkLineAdd(game_entry, game_name) {
    let max_line_id = game_entry["last_line_added"]

    let id_queries = [...Array(max_line_id + 1).keys()].map(
        id => JSON.stringify([game_name, id])
    )

    let game_date_entries = await browser.storage.local.get(id_queries)
    let line_divs = Object.entries(game_date_entries).map(
        ([key, line]) => newLineDiv(line, JSON.parse(key)[1])
    )

    document.getElementById("entry_holder").replaceChildren(...line_divs)
}

function setStats(char_progress, time_taken) {
    // Set char counter
    document.getElementById("chars_read").innerHTML = char_progress.toLocaleString()

    // Set speed
    let average = Math.round(char_progress / (time_taken / SECS_TO_HOURS))
    document.getElementById("chars_per_hour").innerHTML = average.toLocaleString()

    // Set elapsed time
    let date = new Date(0)
    date.setSeconds(time_taken)
    document.getElementById("elapsed_time").innerHTML = date.toISOString().substr(11, 8)
}

function setProperty(event) {
    let property = {}
    property[event["target"].id] = event["target"].value

    browser.storage.local.set(property)
}

document.getElementById("font").onchange = (event) => {
    setProperty(event)
    document.documentElement.style.setProperty("--default-jp-font", event["target"].value)
}
document.getElementById("font_size").onchange = (event) => {
    setProperty(event)
    document.documentElement.style.setProperty("--default-jp-font-size", event["target"].value + "rem")
}

document.getElementById("afk_max_time").onchange = setProperty

document.getElementById("view_stats").onclick = (_) => {
    chrome.runtime.sendMessage({
        "action": "open_tab",
        "url": "https://kamwithk.github.io/exSTATic/stats.html"
    })
}
document.getElementById("export_stats").onclick = exportStats

// Initialise empty windows when a previous game is found
async function startup() {
    document.getElementById("entry_holder").replaceChildren()

    try {
        // Set the UI properties
        let property_entries = await browser.storage.local.get(["font", "font_size", "afk_max_time"])
        if (property_entries.hasOwnProperty("font")) {
            document.getElementById("font").value = property_entries["font"]
            document.documentElement.style.setProperty("--default-jp-font", property_entries["font"])
        }

        if (property_entries.hasOwnProperty("font_size")) {
            document.getElementById("font_size").value = property_entries["font_size"]
            document.documentElement.style.setProperty("--default-jp-font-size", property_entries["font_size"] + "rem")
        }

        if (property_entries.hasOwnProperty("afk_max_time")) {
            MAX_TIME_AWAY = property_entries["afk_max_time"]
            document.getElementById("afk_max_time").value = property_entries["afk_max_time"]
        }

        // Preload entries and set window title
        let game_entry = await previousGameEntry()
        previous_game = Object.keys(game_entry)[0]
        bulkLineAdd(game_entry[previous_game], previous_game)
        showNameTitle(game_entry[previous_game]["name"])

        let today_previous_game = await todayGameEntry()
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
async function updateStatsLive() {
    let time_now = timeNowSeconds()
    let time_between_lines = time_now - previous_time
    
    // Keep incrementing the timer whilst no break greater than allowed has been taken
    if (time_between_lines <= MAX_TIME_AWAY) {
        idle_time_added = false
        let time_so_far = time_read + time_between_lines
    
        setStats(chars_read, time_so_far)
    } else {
        // Change the total time read
        if (!idle_time_added) {
            time_read += MAX_TIME_AWAY
            setStats(chars_read, time_read)
    
            let game_entry = await todayGameEntry()
            game_entry[Object.keys(game_entry)[0]]["time_read"] = time_read
    
            browser.storage.local.set(game_entry)
            idle_time_added = true
        }
    }
}
setInterval(updateStatsLive, REFRESH_STATS_INTERVAL)

function gameDateEntryChanged(key, old_value, new_value) {
    previous_time = new_value["last_line_recieved"]
    chars_read = new_value["chars_read"]
    time_read = new_value["time_read"]
}

function gameEntryChanged(key, old_value, new_value) {
    // Change games
    if (key != previous_game) {
        previous_game = key
        showNameTitle(new_value["name"])
        bulkLineAdd(new_value, key)
    }
}

function lineFound(key, old_value, new_value) {
    let process_path = key[0]
    let line_id = key[1]
    let line = new_value

    // Only add lines where batch insertion doesn't occur
    // This is when the game hasn't changed
    if (process_path == previous_game) {
        insertLine(line, line_id)
    }
}

chrome.storage.local.onChanged.addListener((changes, _) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        let line_key = isLineEntry(key, oldValue, newValue)
        if (line_key) {
            lineFound(line_key, oldValue, newValue)
        }

        else if (isGameEntry(key, newValue)) {
            gameEntryChanged(key, oldValue, newValue)
        }
        
        else if (isGameDateEntry(key, newValue)) {
            gameDateEntryChanged(key, oldValue, newValue)
        }
    }
})
