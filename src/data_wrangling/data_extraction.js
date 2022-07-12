var browser = require("webextension-polyfill")

var SECS_TO_HRS = 60 * 60

export async function getGameData(process_path) {
    let game_entry = (await browser.storage.local.get(process_path))[process_path]
    let game_date_keys = game_entry["dates_read_on"].map(date => process_path + "_" + date)
    let game_date_entries = await browser.storage.local.get(game_date_keys)

    return Object.values(game_date_entries).map((game_date_entry, index) => {
        delete game_date_entry["last_line_recieved"]
        game_date_entry["time_read"] = game_date_entry["time_read"] / SECS_TO_HRS
        game_date_entry["read_speed"] = game_date_entry["chars_read"] / game_date_entry["time_read"]
        game_date_entry["date"] = game_entry["dates_read_on"][index]
        game_date_entry["process_path"] = process_path
        game_date_entry["name"] = game_entry["name"]
        
        return game_date_entry
    })
}

export async function getData() {
    let games = (await browser.storage.local.get("games"))["games"]
    let game_data = games.map(game => getGameData(game))
    
    return (await Promise.all(game_data)).flat()
}

export async function exportStats() {
    let data = await getData()
    let csv_string = Object.keys(data[0]).join(",") + "\r\n"
        + data.map(entry => Object.values(entry).join(",")).join("\r\n")

    chrome.runtime.sendMessage({
        "action": "export_csv",
        "csv": [csv_string],
        "blob_options": { "type": "text/csv" },
        "filename": "exSTATic_stats.csv"
    })
}
