import { charsInLine, timeNowSeconds, lineSplitCount } from "../calculations"
import { MediaStorage } from "../storage/media_storage"

var browser = require("webextension-polyfill")

// EXTENDED STORAGE SPEC
// NOTE: Each volume will register with a seperate UUID but can be tied together through a series name
//     "uuid": {
//         "series": "",
//         "last_page_read": "page_id",
//         ...
//     },
//     ["uuid", "date"]: {
//         "pages_read": 0
//         ...
//     }

export class MokuroStorage extends MediaStorage {
    static async build(live_stat_update=false) {
        const [type_storage, instance_storage] = await super.build("mokuro")

        await MokuroStorage.setPages(instance_storage)

        if (!type_storage.properties.hasOwnProperty("afk_max_time"))
            await type_storage.updateProperties({"afk_max_time": 120})

        return new MokuroStorage(type_storage, instance_storage, live_stat_update)
    }

    static async setPages(instance_storage) {
        if (instance_storage === undefined) return

        let details = {}
        if (instance_storage.details["last_page_read"] === undefined) {
            details["last_page_read"] = 0
        }
        await instance_storage.updateDetails(details)
    }

    async setDetails(series, page_count) {
        if (this.details["series"] === undefined) {
            this.instance_storage.updateDetails({"series": series})
        }

        if (this.details["page_count"] !== page_count) {
            this.instance_storage.updateDetails({"page_count": page_count})
        }
    }

    async changeInstance(new_uuid, given_identifier=undefined) {
        await super.changeInstance(new_uuid, given_identifier)
        await MokuroStorage.setPages(this.instance_storage)
    }

    async processPage(page_num, lines, date) {
        let stats = {}
        stats["chars_read"] = lines.reduce((total, line) => total + charsInLine(line), 0)
        stats["lines_read"] = lines.reduce((total, line) => total + lineSplitCount(line), 0)
        stats["pages_read"] = Math.abs(page_num - this.details["last_page_read"])
        
        if (page_num > this.details["last_page_read"]) {
            await this.instance_storage.addDailyStats(date, stats)
            this.start_ticker(false)
        }
        else if (page_num < this.details["last_page_read"]) {
            await this.instance_storage.subDailyStats(date, stats)
            this.stop_ticker()
        }
        
        await this.instance_storage.updateDetails({
            "last_page_read": page_num,
            "last_active_at": timeNowSeconds()
        })
        await this.instance_storage.addToDates(date)
        await this.instance_storage.addToDate(date)
    }
}
