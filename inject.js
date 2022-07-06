console.log("Injected")

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

chrome.storage.local.onChanged.addListener(function (changes, _) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        key = parseLineKey(key, oldValue, newValue)
        if (key) {
            process_path = key[0]
            line_id = key[1]
            line = newValue

            console.log("Process Path: ", process_path, "Line ID: ", line_id, "Line: ", line)
        }
    }
})
