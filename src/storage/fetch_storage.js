var browser = require("webextension-polyfill")

import { dateNowString } from "../calculations"

// STORAGE SPEC
// {
//     "games": [
//         "game_path"
// ],
//     "game_path": {
//         "name": "",
//         "dates_read_on": [],
//         "last_line_added": "id"
//     },
//     "game_path_date": {
//         "lines_read": 0,
//         "chars_read": 0,
//         "time_read": 0,
//         "last_line_recieved": ...
//     },
//     ["game_path", 0]: "line",
//     "previously_hooked": "game_path"
// }

export async function previousGameEntry() {
    let game_entry = await browser.storage.local.get("previously_hooked")

    if ("previously_hooked" in game_entry) {
        return browser.storage.local.get(game_entry["previously_hooked"])
    }
}

export async function todayGameEntry() {
    let game_entry = await browser.storage.local.get("previously_hooked")

    if ("previously_hooked" in game_entry) {
        return browser.storage.local.get(game_entry["previously_hooked"] + "_" + dateNowString())
    }
}
