import { dateNowString } from "../calculations"

var browser = require("webextension-polyfill")

// STORAGE SPEC
// {
//     "uuid": {
//         "name": "",
//         ...
//     },
//     ["uuid", "date"]: {
//         "lines_read": 0,
//         "chars_read": 0,
//         "time_read": 0,
//         ...
//     },
//     ["uuid", "line_id"]: "line",
//     "immersion_date": ["uuid"]
// }

export class InstanceStorage {
    constructor (uuid) {
        this.uuid = uuid
    }

    async setup() {
        this.details = (await browser.storage.local.get(this.uuid))[this.uuid]

        let uuid_date_key = JSON.stringify([this.uuid, dateNowString()])
        this.today_stats = (await browser.storage.local.get(uuid_date_key))[uuid_date_key]
    }

    async updateDetails(details) {
        Object.assign(this.details, details)

        let detail_entries = {}
        detail_entries[this.uuid] = this.details
        
        await browser.storage.local.set(detail_entries)
    }

    async setDailyStats(date, values) {
        let uuid_date_key = JSON.stringify([this.uuid, date])
        let daily_stats_entry = await browser.storage.local.get(uuid_date_key)
    
        daily_stats_entry[uuid_date_key] = values
        if (date == dateNowString()) {
            this.today_stats = daily_stats_entry[uuid_date_key]
        }

        await browser.storage.local.set(daily_stats_entry)
    }

    async addDailyStats(date, values, multiple=1) {
        let uuid_date_key = JSON.stringify([this.uuid, date])
        let daily_stats_entry = await browser.storage.local.get(uuid_date_key)

        if (!daily_stats_entry.hasOwnProperty(uuid_date_key)) {
            daily_stats_entry[uuid_date_key] = {}
        }
        
        Object.entries(values).forEach(([stat_key, stat_value]) => {
            if (!daily_stats_entry[uuid_date_key].hasOwnProperty(stat_key)) {
                daily_stats_entry[uuid_date_key][stat_key] = 0
            }
    
            daily_stats_entry[uuid_date_key][stat_key] += stat_value * multiple
        })

        if (date == dateNowString()) {
            this.today_stats = daily_stats_entry[uuid_date_key]
        }

        await browser.storage.local.set(daily_stats_entry)
    }

    async subDailyStats(date, values, multiple=1) {
        await this.addDailyStats(date, values, -1 * multiple)
    }

    async insertLine(line, time) {
        let line_key = JSON.stringify([this.uuid, this.details["last_line_added"] + 1])
        let line_entry = {}
        line_entry[line_key] = line

        this.updateDetails({
            "last_line_added": this.details["last_line_added"] + 1,
            "last_active_at": time
        })

        await browser.storage.local.set(line_entry)
    }

    async deleteLine(line_id) {
        await browser.storage.local.remove(
            JSON.stringify([this.uuid, line_id])
        )
    }

    async getLines() {
        if (!this.details.hasOwnProperty("last_line_added")) {
            return
        }
    
        let max_line_id = this.details["last_line_added"]
        let min_line_id = 0
    
        let id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map(
            index => JSON.stringify([this.uuid, min_line_id + index])
        )
        return browser.storage.local.get(id_queries)
    }

    async addToDate(date) {
        let day_entries = await browser.storage.local.get(date)

        if (!day_entries.hasOwnProperty(date)) {
            day_entries[date] = []
        }

        if (!day_entries[date].includes(this.uuid)) {
            day_entries[date].push(this.uuid)
            await browser.storage.local.set(day_entries)
        }
    }
}
