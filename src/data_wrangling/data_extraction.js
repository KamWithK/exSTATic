import * as browser from "webextension-polyfill"
import { unparse } from "papaparse"
import { TypeStorage } from "../storage/type_storage"
import { InstanceStorage } from "../storage/instance_storage"

export async function getDateData(date) {
    let uuids = (await browser.storage.local.get(date))[date]
    
    let date_data = uuids.map(async (uuid, _) => {
        let details = (await browser.storage.local.get(uuid))[uuid]

        let uuid_date_key = JSON.stringify([uuid, date])
        let stats_entry = (await browser.storage.local.get(uuid_date_key))[uuid_date_key]

        // Processed stats
        if (stats_entry.hasOwnProperty("time_read")) {
            stats_entry["time_read"] = stats_entry["time_read"]

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
    let csv_string = unparse(data)

    chrome.runtime.sendMessage({
        "action": "export_csv",
        "csv": [csv_string],
        "blob_options": { "type": "text/csv" },
        "filename": "exSTATic_stats.csv"
    })
}

export function importStats(data) {
    data.forEach(async entry => {
        if (!entry.hasOwnProperty("type") || !entry.hasOwnProperty("date") || !entry.hasOwnProperty("given_identifier")) {
            return
        }

        let type_storage = new TypeStorage(entry["type"])
        await type_storage.setup()
        let uuid = await type_storage.addMedia(entry["given_identifier"], entry["uuid"])

        let stats = {}
        if (entry.hasOwnProperty("chars_read")) {
            stats["chars_read"] = entry["chars_read"]
        }
        if (entry.hasOwnProperty("lines_read")) {
            stats["lines_read"] = entry["lines_read"]
        }
        if (entry.hasOwnProperty("time_read")) {
            stats["time_read"] = entry["time_read"]
        }

        let instance_storage = new InstanceStorage(uuid)
        await instance_storage.setup()

        if (entry.hasOwnProperty("name")) {
            await instance_storage.updateDetails({
                "name": entry["name"]
            })
        }
        
        await instance_storage.addToDates(entry["date"])
        await instance_storage.addToDate(entry["date"])

        if (Object.keys(stats).length !== 0) {
            await instance_storage.setDailyStats(entry["date"], stats)
        }
    })
}
