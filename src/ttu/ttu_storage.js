import { timeNowSeconds } from "../calculations"
import { MediaStorage } from "../storage/media_storage"

// EXTENDED STORAGE SPEC
// NOTE: Each volume will register with a seperate UUID but can be tied together through a series name
//     "uuid": {
//         "series": "",
//         "last_char_count": "page_id",
//         ...
//     },
//     ["uuid", "date"]: {
//         "pages_read": 0
//         ...
//     }

export class TTUStorage extends MediaStorage {
    static async build(live_stat_update=false) {
        const [type_storage, instance_storage] = await super.build("ttu")

        await this.setPages(instance_storage)

        if (!type_storage.properties.hasOwnProperty("afk_max_time"))
            await type_storage.updateProperties({"afk_max_time": 120})

        return new TTUStorage(type_storage, instance_storage, live_stat_update)
    }

    static async setPages(instance_storage) {
        if (instance_storage === undefined) return

        let details = {}
        if (instance_storage.details["last_char_count"] === undefined) {
            details["last_char_count"] = 0
        }
        await instance_storage.updateDetails(details)
    }

    async changeInstance(new_uuid, given_identifier=undefined) {
        await super.changeInstance(new_uuid, given_identifier)
        await TTUStorage.setPages(this.instance_storage)
    }

    async pauseChange(last_char_count) {
        await this.instance_storage.updateDetails({"last_char_count": last_char_count})
        this.stop_ticker()
    }

    async processText(chars_read, date) {
        const stats = { "chars_read": chars_read - this.details["last_char_count"] }

        await this.instance_storage.addDailyStats(date, stats)

        if (chars_read > this.details["last_char_count"])
            this.start_ticker(false)
        else if (chars_read < this.details["last_char_count"])
            this.stop_ticker()

        await this.instance_storage.updateDetails({
            "last_char_count": chars_read,
            "last_active_at": timeNowSeconds()
        })

        await this.instance_storage.addToDates(date)
        await this.instance_storage.addToDate(date)
    }
}