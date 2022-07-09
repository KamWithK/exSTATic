export function isGameEntry(key, new_value) {
    try {
        return (
            typeof(key) === "string" && typeof new_value == "object"
                && "name" in new_value
                && "dates_read_on" in new_value
                && "last_line_added" in new_value
        )
    } catch {}

    return false
}

export function isGameDateEntry(key, new_value) {
    try {
        return (typeof(key) === "string" && typeof new_value == "object"
            && "lines_read" in new_value && "chars_read" in new_value && "time_read" in new_value
            && "last_line_recieved" in new_value)
    } catch {}

    return false
}

export function isLineEntry(key, old_value, new_value) {
    try {
        parsed = JSON.parse(key)
        
        return (
            old_value == undefined && typeof(new_value) == "string"
                && typeof(key) === "string" && parsed.length == 2
                && typeof(parsed[0]) === "string" && Number.isInteger(parsed[1])
        )
    } catch {}

    return false
}
