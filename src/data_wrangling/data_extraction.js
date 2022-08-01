var browser = require("webextension-polyfill")

var SECS_TO_HRS = 60 * 60

export async function getDateData(date) {
    let uuids = (await browser.storage.local.get(date))[date]
    
    let date_data = uuids.map(async (uuid, _) => {
        let details = (await browser.storage.local.get(uuid))[uuid]

        let uuid_date_key = JSON.stringify([uuid, date])
        let stats_entry = (await browser.storage.local.get(uuid_date_key))[uuid_date_key]

        // Processed stats
        if (stats_entry.hasOwnProperty("time_read")) {
            stats_entry["time_read"] = stats_entry["time_read"] / SECS_TO_HRS

            if (stats_entry.hasOwnProperty("chars_read")) {
                stats_entry["read_speed"] = stats_entry["chars_read"] / stats_entry["time_read"]
            }
        }

        return {
            "uuid": uuid,
            "name": details["name"],
            "given_identifier": details["given_identifier"],
            "type": details["type"],
            "date": date,
            ...stats_entry
        }
    })

    return Promise.all(date_data)
}

export async function getData() {
    let dates = await browser.storage.local.get("immersion_dates")
    
    if (!dates.hasOwnProperty("immersion_dates")) {
        return
    }

    let data = await Promise.all(dates["immersion_dates"].map(getDateData))
    
    return data.flat()
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
