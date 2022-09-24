import { TypeStorage } from "../storage/type_storage"
import { InstanceStorage } from "../storage/instance_storage"

var browser = require("webextension-polyfill")

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
        await instance_storage.addToDate(entry["date"], entry["client"])

        if (Object.keys(stats).length !== 0) {
            await instance_storage.setDailyStats(entry["date"], stats, entry["client"])
        }
    }
}

export async function importLines(data) {
    data = data.sort((first, second) => first["time"] - second["time"])

    for (const entry of data) {
        const instance_storage = new InstanceStorage(entry["uuid"])
        await instance_storage.setup()

        const next_line = instance_storage.details.hasOwnProperty("last_line_added")
            ? instance_storage.details["last_line_added"] + 1
            : 0

        const line_key = JSON.stringify([entry["uuid"], next_line])
        let line_entry = {}
        line_entry[line_key] = [entry["line"], entry["time"]]
        await instance_storage.updateDetails({
            "last_line_added": next_line
        })
        await browser.storage.local.set(line_entry)
    }
}
