import { getData, getInstanceData } from "./data_extraction"

import { unparse } from "papaparse"

var browser = require("webextension-polyfill")

export async function exportStats() {
    const data = await getData()

    browser.runtime.sendMessage({
        "action": "export_csv",
        "csv": [unparse(data)],
        "blob_options": { "type": "text/csv" },
        "filename": "exSTATic_stats.csv"
    })
}

export async function exportLines() {
    const media = await browser.storage.local.get("media")
    if (!media.hasOwnProperty("media")) {
        return
    }

    const detail_entries = await browser.storage.local.get(Object.values(media["media"]))
    const data = await Promise.all(Object.entries(detail_entries).map(getInstanceData))

    browser.runtime.sendMessage({
        "action": "export_csv",
        "csv": [unparse(data.flat())],
        "blob_options": { "type": "text/csv;charset=utf-8" },
        "filename": "exSTATic_lines.csv"
    })
}
