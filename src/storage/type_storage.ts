import * as browser from "webextension-polyfill"

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

export interface TypeProperties {
    afk_max_time: number;
    bottom_line_padding: string;
    font: string;
    font_size: string;
    inactivity_blur: string;
    max_loaded_lines: string;
    menu_blur: string;
    previous_uuid?: string;
}

export class TypeStorage {
    type: string
    properties: TypeProperties

    constructor (type: string, properties: TypeProperties) {
        this.type = type
        this.properties = properties
    }

    static async buildTypeStorage(type: string) {
        let types_list = await browser.storage.local.get("types")
        if (!types_list.hasOwnProperty("types")) {
            types_list["types"] = []
        }
        
        if (!types_list["types"].includes(type)) {
            types_list["types"].push(type)
        }

        await browser.storage.local.set(types_list)

        let type_dict = await browser.storage.local.get(type)
        if (!type_dict.hasOwnProperty(type)) {
            type_dict[type] = {}
        }

        const properties = type_dict[type]
        await browser.storage.local.set(type_dict)

        return new TypeStorage(type, properties)
    }

    async updateProperties(properties: Partial<TypeProperties>) {
        Object.assign(this.properties, properties)
        await browser.storage.local.set({[this.type]: this.properties})
    }

    async getMedia(given_identifier: string): Promise<string> {
        const media_entries = await browser.storage.local.get("media")
        const media_key = JSON.stringify([given_identifier, this.type])

        if (media_entries.hasOwnProperty("media") && media_entries["media"].hasOwnProperty(media_key)) {
            return media_entries["media"][media_key]
        } else {
            return this.addMedia(given_identifier)
        }
    }

    async addMedia(given_identifier: string, uuid?: string) {
        let media_entries = await browser.storage.local.get("media")

        if (!media_entries.hasOwnProperty("media")) {
            media_entries["media"] = {}
        }

        const media_key = JSON.stringify([given_identifier, this.type])
    
        if (!media_entries["media"].hasOwnProperty(media_key)) {
            let new_uuid = uuid !== undefined ? uuid : crypto.randomUUID()
            media_entries["media"][media_key] = new_uuid

            // Add in UUID field if it doesn't exist
            const details_entry = await browser.storage.local.get(new_uuid)
            if (!details_entry.hasOwnProperty(new_uuid)) {
                media_entries[new_uuid] = {
                    "name": given_identifier,
                    "given_identifier": given_identifier,
                    "type": this.type,
                    "last_line_added": -1
                }
            }
    
            await browser.storage.local.set(media_entries)
        }

        return media_entries["media"][media_key]
    }
}
