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

function gameNameChanged(event) {
    // Set document title
    document.title = "CharTracker | " + game_name

    // Store name
    chrome.storage.local.get(previous_game, function(game_entry) {
        game_entry[Object.keys(game_entry)[0]]["name"] = event["target"].value

        chrome.storage.local.set(game_entry)
    })
}
document.getElementById("game_name").onchange = gameNameChanged

async function showNameTitle() {
    game_name_heading = document.getElementById("game_name")

    // Disable editing of name until the previous value has been set
    game_name_heading.disabled = true
    game_entry = await previousGameEntry()
    game_name = game_entry[Object.keys(game_entry)[0]]["name"]
    game_name_heading.value = game_name
    game_name_heading.disabled = false

    // Set the document title
    document.title = "CharTracker | " + game_name
}

showNameTitle()

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

function charsInLine(line) {
    return line.length
}

function lineSplitCount(line) {
    line.split("\n")
    return line.split("\n").length
}

function deleteLine(event) {
    confirmed = confirm(
        "Are you sure you'd like to delete this line?\nChar and line statistics will be modified accordingly however time read won't change..."
    )

    if (confirmed) {
        element_div = event["target"].parentNode
        
        line_id = element_div.dataset.line_id
        line_key = JSON.stringify([previous_game, Number.parseInt(line_id)])

        chrome.storage.local.get([line_key, previous_game], function(game_entry) {
            line = game_entry[line_key]

            delete game_entry[line_key]
            chrome.storage.local.remove(line_key)

            // TODO: Remove assumption that this was read today or ensure it's true
            game_date_key = previous_game + "_" + game_entry[previous_game]["dates_read_on"][0]
            chrome.storage.local.get(game_date_key, function(game_entry) {
                game_entry[game_date_key]["lines_read"] -= charsInLine(line)
                game_entry[game_date_key]["chars_read"] -= lineSplitCount(line)

                chrome.storage.local.set(game_entry)
                element_div.remove()
            })
        })
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
            showNameTitle()

            process_path = key[0]
            line_id = key[1]
            line = newValue

            if (process_path != previous_game) {
                console.log("Game Changed, Readding Lines...")
                bulkLineAdd()
            } else {
                insertLine(line, line_id)
            }
        }
    }
})
