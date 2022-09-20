import { dateNowString, timeNowSeconds } from "../calculations"
import { InstanceStorage } from "./instance_storage"
import { TypeStorage } from "./type_storage"

var REFRESH_STATS_INTERVAL = 1000 // in milliseconds

var browser = require("webextension-polyfill")

// EXTENDED STORAGE SPEC
// {
//     "type": {
//         "previous_uuid",
//         ...
//     },
//     "uuid": {
//         "last_active_at": "secs",
//         ...
//     }
// }

export class MediaStorage {
    constructor(type_storage, instance_storage, live_stat_update=false) {
        this.type_storage = type_storage
        this.instance_storage = instance_storage

        this.properties = this.type_storage.properties

        if (this.instance_storage !== undefined) {
            this.details = this.instance_storage.details
            this.uuid = this.properties["previous_uuid"]
        }

        if (live_stat_update) {
            this.stop_ticker(false)
            setInterval(this.#ticker.bind(this), REFRESH_STATS_INTERVAL)
        }
    }

    static async build(type) {
        const type_storage = new TypeStorage(type)
        await type_storage.setup()
        
        let instance_storage
        if (type_storage.properties.hasOwnProperty("previous_uuid")) {
            instance_storage = new InstanceStorage(type_storage.properties["previous_uuid"])
            await instance_storage.setup()
        } else {
            instance_storage = undefined
        }

        return [type_storage, instance_storage]
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
        await this.logLines()
    }

    async logLines() {
        const event = new CustomEvent("media_changed", {
            "detail": {
                "uuid": this.uuid,
                "name": this.details["name"]
            }
        })
        document.dispatchEvent(event)
    }

    start_ticker(event=true) {
        if (this.previous_time == undefined) {
            this.previous_time = timeNowSeconds()
        }

        if (event) {
            const event = new Event("status_active")
            document.dispatchEvent(event)
        }
    }

    stop_ticker(event=true) {
        this.previous_time = undefined

        if (event) {
            const event = new Event("status_inactive")
            document.dispatchEvent(event)
        }
    }

    async #ticker() {
        const time_now = timeNowSeconds()
        
        if (this.instance_storage == undefined || this.previous_time == undefined) {
            return
        }
        
        const time_between_lines = this.details["last_active_at"] !== undefined ? time_now - this.details["last_active_at"] : 0
        const time_between_ticks = time_now - this.previous_time
        
        this.previous_time = time_now
        
        // Keep incrementing the time read counter whilst the max afk time isn't exceeded
        if (time_between_lines <= this.properties["afk_max_time"]) {
            await this.instance_storage.addDailyStats(dateNowString(), {
                "time_read": time_between_ticks
            })
            this.start_ticker()
        } else {
            this.stop_ticker()
        }
    }

    async extensionActivated() {
        const listen_status = (await browser.storage.local.get("listen_status"))["listen_status"]
        return (listen_status == true || listen_status === undefined)
    }

    async toggleActive() {
        const listen_status = await this.extensionActivated()
        if (!listen_status) {
            this.stop_ticker()
            return
        }

        const time = timeNowSeconds()
		if (this.instance_storage === undefined) return
		
		if (this.previous_time === undefined) {
			await this.instance_storage.updateDetails({"last_active_at": time})
			this.start_ticker()
		} else {
			this.stop_ticker()
		}
    }
}
