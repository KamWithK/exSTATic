import { charsInLine, dateNowString, lineSplitCount } from "../calculations"
import { MediaStorage } from "../storage/media_storage"

var browser = require("webextension-polyfill")

// EXTENDED STORAGE SPEC
//     "uuid": {
//         "last_line_added": "line_id",
//         ...
//     }

export class VNStorage extends MediaStorage {
    constructor(type_storage, instance_storage, live_stat_update=false) {
        super(type_storage, instance_storage, live_stat_update)
        this.max_lines = Number.parseInt(type_storage.properties["max_loaded_lines"])
    }

    static async build(live_stat_update=false) {
        const [type_storage, instance_storage] = await super.build("vn")
        return new VNStorage(type_storage, instance_storage, live_stat_update)
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
        const previous_line_key = JSON.stringify([this.uuid, this.details["last_line_added"]])
        const previous_line = (await browser.storage.local.get(previous_line_key))[previous_line_key]
        
        if (previous_line == undefined || line != previous_line[0]) {
            const chars_in_line = charsInLine(line)
            if (chars_in_line === 0) return
            
            this.start_ticker(false)

            await this.instance_storage.insertLine(line, time)
            
            await this.instance_storage.addToDates(date)
            await this.instance_storage.addToDate(date)
            await this.instance_storage.addDailyStats(date, {
                "lines_read": lineSplitCount(line),
                "chars_read": chars_in_line,
            })

            const event = new CustomEvent("new_line", {
                "detail": {
                    "line_id": this.details["last_line_added"],
                    "line": line,
                    "time": time
                }
            })
            document.dispatchEvent(event)
        }
    }

    async deleteLines(details) {
        let date_stats = {}
        
        details.forEach(([_, line, date]) => {
            if (date === undefined) {
                date = dateNowString()
            }

            if (!date_stats.hasOwnProperty(date)) {
                date_stats[date] = {}
                date_stats[date]["lines_read"] = 0
                date_stats[date]["chars_read"] = 0
            }

            date_stats[date]["lines_read"] += lineSplitCount(line)
            date_stats[date]["chars_read"] += charsInLine(line)
        })

        await this.instance_storage.deleteLines(details.map(([line_id, _, time]) => line_id))
        await this.instance_storage.subStats(date_stats)
    }

    async deleteLine(line_id, line, date) {
        await this.instance_storage.deleteLine(line_id)
        await this.instance_storage.subDailyStats(date, {
            "lines_read": lineSplitCount(line),
            "chars_read": charsInLine(line)
        })
    }
}