import { previousGameEntry } from "./storage"

var SECS_TO_HRS = 60 * 60

export async function exportStats() {
    game_entry = await previousGameEntry()
    process_path = Object.keys(game_entry)[0]
    game_entry = game_entry[process_path]
    game_name = game_entry["name"]
    
    game_date_queries = game_entry["dates_read_on"].map(date => process_path + "_" +  date)
    
    csv_string = new Promise((resolve, _) => {
        chrome.storage.local.get(game_date_queries, function(game_date_entries) {
            csv_string = "date,lines_read,chars_read,time_read,speed" + "\r\n"
            
            Object.entries(game_date_entries).forEach(element => {
                readtime_hours = element[1]["time_read"] / SECS_TO_HRS
                
                csv_string += element[0].split("_").at(-1) + ","
                    + element[1]["lines_read"] + ","
                    + element[1]["chars_read"] + ","
                    + readtime_hours + ","
                    + element[1]["chars_read"] / readtime_hours + "\r\n"
            })

            resolve(csv_string)
        })
    })

    chrome.runtime.sendMessage({
        "csv": [await csv_string],
        "blob_options": { "type": "text/csv" },
        "filename": game_name + "_daily_stats.csv"
    })
}
