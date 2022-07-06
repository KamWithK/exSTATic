console.log("Injected")

var previous_game

async function previousGameEntry() {
    return new Promise((resolve, _) => {
        chrome.storage.local.get("previously_hooked", function(game_entry) {
            if (game_entry === undefined || game_entry["previously_hooked"] === undefined) {
                reject()
            }

            chrome.storage.local.get(game_entry["previously_hooked"], function(game_entry) {
                resolve(game_entry)
            })
        })
    })
}

async function setNameTitle() {
    game_entry = await previousGameEntry()
    game_name = game_entry[Object.keys(game_entry)[0]]["name"]
    document.getElementById("game_name").innerHTML = game_name
    document.title = "CharTracker | " + game_name
}

setNameTitle()

function parseLineKey(key, old_value, new_value) {
    try {
        parsed = JSON.parse(key)
        
        if (old_value == undefined && typeof new_value == "string"
            && typeof(key) === "string" && parsed.length == 2
            && typeof(parsed[0]) === "string" && Number.isInteger(parsed[1])) {
                return parsed
            }
    } catch {}

    return false
}

function newLineDiv(line, line_id) {
    container_div = document.createElement("div")
    new_svg = document.createElement("svg")
    new_p = document.createElement("p")
    
    container_div.classList.add("sentence-entry")
    new_svg.classList.add("circle-bullet-point")
    new_p.classList.add("sentence")

    container_div.dataset.line_id = line_id    
    new_p.innerHTML = line
    
    container_div.appendChild(new_svg)
    container_div.appendChild(new_p)

    return container_div
}

function insertLine(line, line_id) {
    entry_holder = document.getElementById("entry_holder")
    new_div = newLineDiv(line, line_id)
    entry_holder.appendChild(new_div)
}

async function bulkLineAdd() {
    game_entry = await previousGameEntry()
    process_path = Object.keys(game_entry)[0]
    previous_game = process_path
    max_line_id = game_entry[process_path]["last_line_added"]

    id_queries = [...Array(max_line_id + 1).keys()].map(id => JSON.stringify([process_path, id]))

    chrome.storage.local.get(id_queries, function(game_date_entries) {
        line_divs = []

        for (let [key, line] of Object.entries(game_date_entries)) {
            line_id = JSON.parse(key)[1]
            line_divs.push(newLineDiv(line, line_id))
        }

        entry_holder = document.getElementById("entry_holder")
        entry_holder.replaceChildren(...line_divs)
    })
}
bulkLineAdd()

chrome.storage.local.onChanged.addListener(function (changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        key = parseLineKey(key, oldValue, newValue)
        
        if (key) {
            setNameTitle()

            process_path = key[0]
            line_id = key[1]
            line = newValue

            if (process_path != previous_game && previous_game !== undefined) {
                console.log("Game Changed, Readding Lines...")
                bulkLineAdd()
            } else {
                insertLine(line, line_id)
            }
        }
    }
})
