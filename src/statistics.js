import { charsInLine } from "./calculations"

// Time units in hours
var MIN_TIME_READ = 1
var MIN_CHAR_READTIME = 1 / 1000

// Times are all stored as milliseconds
MIN_TIME_READ *= 60 * 60 * 1000
MIN_CHAR_READTIME *= 60 * 60 * 1000

export async function recentAverageCharSpeed(dates_read_on, process_path) {
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
                resolve(recentAverageCharSpeed(dates_read_on, process_path))
            }
        })
    })

    return char_speed
}

export async function estimateLineReadtime(dates_read_on, process_path, line) {
    return (await recentAverageCharSpeed(dates_read_on, process_path)) * charsInLine(line)
}
