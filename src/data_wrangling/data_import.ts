import { TypeStorage } from "../storage/type_storage"
import { InstanceStorage, type Stat } from "../storage/instance_storage"

import * as browser from "webextension-polyfill"
import type { DataEntry } from "./data_extraction"

export async function importStats(data: DataEntry[]) {
    for (const entry of data) {
        if (!entry.hasOwnProperty("type") || !entry.hasOwnProperty("date") || !entry.hasOwnProperty("given_identifier")) {
            return
        }

        const type_storage = await TypeStorage.buildTypeStorage(entry["type"] as string)
        const uuid = await type_storage.addMedia(entry["given_identifier"] as string, entry["uuid"] as string | undefined)

        let stats: Stat = {chars_read: 0, time_read: 0}
        if (entry.hasOwnProperty("chars_read")) {
            stats.chars_read = entry["chars_read"] as number
        }
        if (entry.hasOwnProperty("lines_read")) {
            stats.lines_read = entry["lines_read"] as number
        }
        if (entry.hasOwnProperty("time_read")) {
            stats.time_read = entry["time_read"] as number
        }

        const instance_storage = await InstanceStorage.buildInstance(uuid)

        if (entry.hasOwnProperty("name")) {
            await instance_storage.updateDetails({
                "name": entry["name"] as string | undefined
            })
        }

        await instance_storage.addToDates(entry["date"] as string)
        await instance_storage.addToDate(entry["date"] as string, entry["client"] as string)

        if (Object.keys(stats).length !== 0) {
            await instance_storage.setDailyStats(entry["date"] as string, stats, entry["client"] as string)
        }
    }
}

export async function importLines(data: {[key: string]: string | number}[]) {
    data = data.sort((first, second) => (first["time"] as number) - (second["time"] as number))

    for (const entry of data) {
        const instance_storage = await InstanceStorage.buildInstance(entry["uuid"] as string)

        const next_line = instance_storage.details.hasOwnProperty("last_line_added")
            ? instance_storage.details["last_line_added"] + 1
            : 0

        const line_key = JSON.stringify([entry["uuid"], next_line])
        const line_entry = {[line_key]: [entry["line"], entry["time"]]}
        await instance_storage.updateDetails({
            "last_line_added": next_line
        })
        await browser.storage.local.set(line_entry)
    }
}
