console.log("Injected")

function setNameTitle() {
    chrome.storage.local.get("previously_hooked", function(game_entry) {
        process_path = game_entry["previously_hooked"]
    
        chrome.storage.local.get(process_path, function(game_entry) {
            game_name_title = document.getElementById("game_name").innerHTML = game_entry[process_path]["name"]
        })
    })
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

function insertLine(line) {
    entry_holder = document.getElementById("entry_holder")
    
    new_div = document.createElement("div")
    new_svg = document.createElement("svg")
    new_p = document.createElement("p")
    
    new_div.classList.add("sentence-entry")
    new_svg.classList.add("circle-bullet-point")
    new_p.classList.add("sentence")
    
    new_p.innerHTML = line
    
    entry_holder.appendChild(new_div)
    new_div.appendChild(new_svg)
    new_div.appendChild(new_p)
}

chrome.storage.local.onChanged.addListener(function (changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        key = parseLineKey(key, oldValue, newValue)
        
        if (key) {
            setNameTitle()
            
            process_path = key[0]
            line_id = key[1]
            line = newValue

            insertLine(line)
        }
    }
})
