import { TypeStorage } from "../storage/type_storage"
import { InstanceStorage } from "../storage/instance_storage"

import { unparse } from "papaparse"
var browser = require("webextension-polyfill")

export async function getDateData(date) {
    const uuids = (await browser.storage.local.get(date))[date]
    
    const date_data = uuids.map(async (uuid, _) => {
        const details = (await browser.storage.local.get(uuid))[uuid]

        const uuid_date_key = JSON.stringify([uuid, date])
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
    const dates = await browser.storage.local.get("immersion_dates")
    
    if (!dates.hasOwnProperty("immersion_dates")) {
        return
    }

    const data = await Promise.all(dates["immersion_dates"].map(getDateData))
    
    return data.flat()
}

export async function exportStats() {
    const data = await getData()

    chrome.runtime.sendMessage({
        "action": "export_csv",
        "csv": [unparse(data)],
        "blob_options": { "type": "text/csv" },
        "filename": "exSTATic_stats.csv"
    })
}

async function getInstanceData([uuid, details]) {
    if (!details.hasOwnProperty("last_line_added")) {
        return
    }

    const id_queries = [...Array(details["last_line_added"] + 1).keys()].map(
        index => JSON.stringify([uuid, index])
    )
    const lines = await browser.storage.local.get(id_queries)

    return Object.values(lines).map(line => {
        return {
            "uuid": uuid,
            "given_identifier": details["given_identifier"],
            "name": details["name"],
            "line": typeof(line) === "string" ? line : line[0],
            "time": typeof(line) === "string" ? undefined : line[1]
        }
    })
}

export async function exportLines() {
    const media = await browser.storage.local.get("media")
    if (!media.hasOwnProperty("media")) {
        return
    }

    const detail_entries = await browser.storage.local.get(Object.values(media["media"]))
    const data = await Promise.all(Object.entries(detail_entries).map(getInstanceData))

    chrome.runtime.sendMessage({
        "action": "export_csv",
        "csv": [unparse(data.flat())],
        "blob_options": { "type": "text/csv;charset=utf-8" },
        "filename": "exSTATic_lines.csv"
    })
}

export async function importStats(data) {
    for (const entry of data) {
        if (!entry.hasOwnProperty("type") || !entry.hasOwnProperty("date") || !entry.hasOwnProperty("given_identifier")) {
            return
        }

        const type_storage = new TypeStorage(entry["type"])
        await type_storage.setup()
        const uuid = await type_storage.addMedia(entry["given_identifier"], entry["uuid"])

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

        const instance_storage = new InstanceStorage(uuid)
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
    }
}
