import { dateNowString } from "../calculations"

import {Mutex} from 'async-mutex';
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
//     "immersion_dates": ["date"],
//     "date": ["uuid"]
// }

export class InstanceStorage {
    constructor (uuid) {
        this.uuid = uuid
        this.mutex = new Mutex()
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

    async addStats(date_stat_adds, multiple=1) {
        return this.mutex.runExclusive(async () => this.#addStats(date_stat_adds, multiple))
    }

    async #addStats(date_stat_adds, multiple=1) {
        let date_keys = Object.keys(date_stat_adds).map(date => JSON.stringify([this.uuid, date]))
        let date_stats = await browser.storage.local.get(date_keys)

        date_keys.forEach(key => {
            let date = JSON.parse(key)[1]

            if (!date_stats.hasOwnProperty(key)) {
                date_stats[key] = {}
            }

            Object.entries(date_stat_adds[date]).forEach(([stat, value]) => {
                if (!date_stats[key].hasOwnProperty(stat)) {
                    date_stats[key][stat] = 0
                }

                date_stats[key][stat] += value * multiple
            })

            if (date == dateNowString()) {
                this.today_stats = date_stats[key]
            }
        })

        await browser.storage.local.set(date_stats)
    }

    async addDailyStats(date, values, multiple=1) {
        let date_stat_adds = {}
        date_stat_adds[date] = values
        await this.addStats(date_stat_adds, multiple)
    }

    async subStats(date_stat_adds, multiple=1) {
        await this.addStats(date_stat_adds, -1 * multiple)
    }

    async subDailyStats(date, values, multiple=1) {
        await this.addDailyStats(date, values, -1 * multiple)
    }

    async insertLine(line, time) {
        let line_key = JSON.stringify([this.uuid, this.details["last_line_added"] + 1])
        let line_entry = {}
        line_entry[line_key] = [line, time]

        await this.updateDetails({
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

    async deleteLines(line_ids) {
        await browser.storage.local.remove(
            line_ids.map(line_id => JSON.stringify([this.uuid, line_id]))
        )
    }

    async getLines(max_lines=undefined) {
        if (!this.details.hasOwnProperty("last_line_added")) {
            return
        }

        // NOTE: This doesn't account for deleted lines
        let max_line_id = this.details["last_line_added"]
        let min_line_id = max_lines <= 0 | max_lines === undefined | isNaN(max_lines) ? 0 : Math.max(0, this.details["last_line_added"] - max_lines + 1)
    
        let id_queries = [...Array(max_line_id - min_line_id + 1).keys()].map(
            index => JSON.stringify([this.uuid, min_line_id + index])
        )
        let lines = await browser.storage.local.get(id_queries)

        return Object.entries(lines).map(
            ([key, line_data]) => {
                let line = typeof(line_data) === "string" ? line_data : line_data[0]
                let time = typeof(line_data) === "string" ? undefined : line_data[1]
                let [uuid, id] = JSON.parse(key)

                return [uuid, id, line, time]
            }
        )
    }

    async addToDates(date) {
        let day_entries = await browser.storage.local.get("immersion_dates")

        if (!day_entries.hasOwnProperty("immersion_dates")) {
            day_entries["immersion_dates"] = []
        }

        if (!day_entries["immersion_dates"].includes(date)) {
            day_entries["immersion_dates"].push(date)
            await browser.storage.local.set(day_entries)
        }
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
