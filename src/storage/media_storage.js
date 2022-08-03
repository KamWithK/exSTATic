import { charsInLine, dateNowString, lineSplitCount, timeNowSeconds } from "../calculations"
import { InstanceStorage } from "./instance_storage"
import { TypeStorage } from "./type_storage"

var browser = require("webextension-polyfill")

var REFRESH_STATS_INTERVAL = 100 // in milliseconds

// EXTENDED STORAGE SPEC
// {
//     "type": {
//         "previous_uuid",
//         ...
//     },
//     "uuid": {
//         "last_line_added": "line_id",
//         "last_active_at": "secs",
//         ...
//     }
// }

export class MediaStorage {
    constructor(type_storage, instance_storage, live_stat_update=false) {
        this.type_storage = type_storage
        this.instance_storage = instance_storage

        this.properties = this.type_storage.properties

        this.max_lines = Number.parseInt(this.properties["max_loaded_lines"])

        if (this.instance_storage !== undefined) {
            this.details = this.instance_storage.details
            this.uuid = this.properties["previous_uuid"]

            // Dispatch an event
            this.logLines()
        }

        if (live_stat_update) {
            this.previous_time = undefined
            setInterval(this.#ticker.bind(this), REFRESH_STATS_INTERVAL)
        }
    }

    static async build(type, live_stat_update=false) {
        let type_storage = new TypeStorage(type)
        await type_storage.setup()
        
        let instance_storage
        if (type_storage.properties.hasOwnProperty("previous_uuid")) {
            instance_storage = new InstanceStorage(type_storage.properties["previous_uuid"])
            await instance_storage.setup()
        } else {
            instance_storage = undefined
        }

        return new MediaStorage(type_storage, instance_storage, live_stat_update)
    }

    async changeInstance(new_uuid, given_identifier=undefined) {
        // Get a UUID if it hasn't been suplied
        // When both are supplied use the UUID
        if (new_uuid == undefined && given_identifier !== undefined) {
            new_uuid = await this.type_storage.getMedia(given_identifier)
        }

        // Nothing required if they're both the same
        if (this.uuid == new_uuid) {
            return
        }
        
        // Ensure the previous UUID is correctly set
        if (this.properties["previous_uuid"] != new_uuid) {
            this.type_storage.updateProperties({"previous_uuid": new_uuid})
        }

        // Replace the storage entry
        this.instance_storage = new InstanceStorage(new_uuid)
        await this.instance_storage.setup()

        // Set the easy-access properties
        this.uuid = this.instance_storage.uuid
        this.details = this.instance_storage.details

        // Dispatch an event
        this.logLines()
    }

    async logLines() {
        const event = new CustomEvent("media_changed", {
            "detail": {
                "uuid": this.uuid,
                "name": this.details["name"],
                "lines": await this.instance_storage.getLines(this.max_lines)
            }
        })
        document.dispatchEvent(event)
    }

    async addLine(line, date, time) {
        let previous_line_key = JSON.stringify([this.uuid, this.details["last_line_added"]])
        let previous_line = (await browser.storage.local.get(previous_line_key))[previous_line_key]
        
        if (line != previous_line) {
            if (this.previous_time == undefined) {
                this.previous_time = timeNowSeconds()
            }

            await this.instance_storage.insertLine(line, time)
            
            await this.instance_storage.addDailyStats(date, {
                "lines_read": lineSplitCount(line),
                "chars_read": charsInLine(line)
            })
            await this.instance_storage.addToDates(date)
            await this.instance_storage.addToDate(date)

            const event = new CustomEvent("new_line", {
                "detail": {
                    "line": line,
                    "line_id": this.details["last_line_added"],
                }
            })
            document.dispatchEvent(event)
        }
    }

    async deleteLine(line_id, line, date) {
        await this.instance_storage.deleteLine(line_id)
        await this.instance_storage.subDailyStats(date, {
            "lines_read": lineSplitCount(line),
            "chars_read": charsInLine(line)
        })
    }

    async deleteLines(line_ids, lines, date) {
        await this.instance_storage.deleteLines(line_ids)

        let lines_read = lines.reduce((total, line) => total + lineSplitCount(line), 0)
        let chars_read = lines.reduce((total, line) => total + charsInLine(line), 0)

        await this.instance_storage.subDailyStats(date, {
            "lines_read": lines_read,
            "chars_read": chars_read
        })
    }

    async #ticker() {
        let time_now = timeNowSeconds()

        if (this.instance_storage == undefined || this.previous_time == undefined) {
            return
        }
        
        let time_between_lines = this.details["last_active_at"] !== undefined ? time_now - this.details["last_active_at"] : 0
        let time_between_ticks = time_now - this.previous_time
        
        this.previous_time = time_now
        
        // Keep incrementing the time time read counter whilst the max afk time isn't exceeded
        let event
        if (time_between_lines <= this.properties["afk_max_time"]) {
            await this.instance_storage.addDailyStats(dateNowString(), {
                "time_read": time_between_ticks
            })
            event = new Event("status_active")
        } else {
            this.previous_time = undefined
            event = new Event("status_inactive")
        }
        document.dispatchEvent(event)
    }
}
