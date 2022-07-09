console.log("Injected")

import { previousGameEntry, safeDeleteLine } from "./storage"
import { isGameEntry, isGameDateEntry, isLineEntry } from "./check_entry_type"

var previous_game
var previous_time

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
    average = Math.round(chars_read / (time_read / (60 * 60 * 1000)))
    document.getElementById("chars_per_hour").innerHTML = average.toLocaleString()
}

// Initialise empty windows when a previous game is found
async function startup() {
    document.getElementById("entry_holder").replaceChildren()
    try {
        game_entry = await previousGameEntry()
        previous_game = Object.keys(game_entry)[0]
        bulkLineAdd(game_entry[previous_game], previous_game)
        showNameTitle(game_entry[previous_game]["name"])
    } catch {}
}
startup()

chrome.storage.local.onChanged.addListener(function (changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (isGameEntry(key, newValue)) {
            if (key != previous_game) {
                showNameTitle(newValue["name"])
                bulkLineAdd(newValue, key)
            }
        }
        
        if (isGameDateEntry(key, newValue)) {
            previous_time = newValue["last_line_recieved"]
            setStats(newValue["chars_read"], newValue["time_read"])
        }
        
        if (isLineEntry(key, oldValue, newValue)) {
            process_path = key[0]
            line_id = key[1]
            line = newValue
            
            if (process_path == previous_game) {
                insertLine(line, line_id)
            }
        }
    }
})
