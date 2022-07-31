var browser = require("webextension-polyfill")

// STORAGE SPEC
// {
//     "types": [
//         ...
//     ],
//     "type": {
//         ...
//     },
//     "media": {
//         ["given_identifier", "type"]: "uuid"
//     }
// }

export class TypeStorage {
    constructor (type) {
        this.type = type
    }

    async setup() {
        let types_list = await browser.storage.local.get("types")
        if (!types_list.hasOwnProperty("types")) {
            types_list["types"] = []
        }
        
        if (!types_list["types"].includes(this.type)) {
            types_list["types"].push(this.type)
        }

        await browser.storage.local.set(types_list)

        let type_dict = await browser.storage.local.get(this.type)
        if (!type_dict.hasOwnProperty(this.type)) {
            type_dict[this.type] = {}
        }

        this.properties = type_dict[this.type]
        await browser.storage.local.set(type_dict)
    }

    async updateProperties(properties) {
        Object.assign(this.properties, properties)
        
        let properties_entry = {}
        properties_entry[this.type] = this.properties
    
        await browser.storage.local.set(properties_entry)
    }

    async getMedia(given_identifier) {
        let media_entries = await browser.storage.local.get("media")
        let media_key = JSON.stringify([given_identifier, this.type])

        if (media_entries.hasOwnProperty("media") && media_entries["media"].hasOwnProperty(media_key)) {
            return media_entries["media"][media_key]
        } else {
            return this.addMedia(given_identifier)
        }
    }

    async addMedia(given_identifier) {
        let media_entries = await browser.storage.local.get("media")

        if (!media_entries.hasOwnProperty("media")) {
            media_entries["media"] = {}
        }

        let media_key = JSON.stringify([given_identifier, this.type])
    
        if (!media_entries["media"].hasOwnProperty(media_key)) {
            let uuid = crypto.randomUUID()
            media_entries["media"][media_key] = uuid

            // Add in UUID field if it doesn't exist
            let details_entry = await browser.storage.local.get(uuid)
            if (!details_entry.hasOwnProperty(uuid)) {
                media_entries[uuid] = {
                    "name": given_identifier,
                    "last_line_added": -1
                }
            }
    
            await browser.storage.local.set(media_entries)
        }

        return media_entries["media"][media_key]
    }
}
