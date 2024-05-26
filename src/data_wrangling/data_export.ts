import { getData, getInstanceData } from "./data_extraction"

import * as browser from "webextension-polyfill"
import { unparse } from "papaparse"

var BOM_CODE = "\ufeff"

var isChrome = !!(window as any).chrome && (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime);

function csv_blob(csv: string, options: {[key: string]: string}) {
    // Byte Order Mark (BOM) required on Windows for displaying Japanese characters
    if (csv.substring(0, 5) != BOM_CODE) {
        csv = BOM_CODE + csv
    }

    return new Blob([csv], options)
}

async function blob_download(blob: Blob, filename: string) {
    await browser.runtime.sendMessage({
        "action": "download",
        "url": !isChrome ? blob : URL.createObjectURL(blob),
        "filename": filename
    })
}


export async function exportStats() {
    const data = await getData()

    const blob = csv_blob(
        unparse(data!),
        { "type": "text/csv" }
    )
    await blob_download(blob, "exSTATic_stats.csv")
}

export async function exportLines() {
    const media = await browser.storage.local.get("media")
    if (!media.hasOwnProperty("media")) {
        return
    }

    const detail_entries = await browser.storage.local.get(Object.values(media["media"]))
    const data = await Promise.all(Object.entries(detail_entries).map(getInstanceData))

    const blob = csv_blob(unparse(data.flat()), { "type": "text/csv;charset=utf-8" })
    await blob_download(blob, "exSTATic_lines.csv")
}
