var browser = require("webextension-polyfill")

import { charsInLine, lineSplitCount } from "../calculations"

var MAX_TIME_AWAY = 60

async function setProperties() {
    property_entries = await browser.storage.local.get("afk_max_time")
    if (property_entries.hasOwnProperty("afk_max_time")) {
        MAX_TIME_AWAY = property_entries["afk_max_time"]
    }
}
setProperties()

export async function createGameEntry(process_path, line, date, time) {
    let games_list = await browser.storage.local.get("games")

    // Add to the list of games
    if ("games" in games_list) {
        games_list["games"].push(process_path)
    } else {
        games_list = {"games": [process_path]}
    }

    // Create a new entry with preset values
    let game_entry = {}
    game_entry[process_path] = {
        "name": process_path,
        "dates_read_on": [date],
        "last_line_added": 0
    }

    // Create a date entry for today
    game_entry[process_path + "_" + date] = newDateEntry(line, time)
    game_entry[JSON.stringify([process_path, 0])] = line

    // Update both the games list and this game in storage
    browser.storage.local.set({...games_list, ...game_entry})
}

function newDateEntry(line, time) {
    return {
        "lines_read": lineSplitCount(line),
        "chars_read": charsInLine(line),
        "time_read": 0,
        "last_line_recieved": time
    }
}

export async function updatedGameEntry(game_entry, process_path, line, date, time) {
    // Update the main entry
    let game_main_entry = game_entry[process_path]
    if (!game_main_entry["dates_read_on"].includes(date)) {
        game_main_entry["dates_read_on"].push(date)
    }
    game_main_entry["last_line_added"] += 1

    // Add the recieved line
    game_entry[JSON.stringify([process_path, game_main_entry["last_line_added"]])] = line

    // Update the daily statistics entry
    if ((process_path + "_" + date) in game_entry) {
        let game_date_entry = game_entry[process_path + "_" + date]
        
        // The average/estimate is calculated first even though its added afterwards
        // Ensures only previous history effects current measures
        let elapsed_time = time - game_date_entry["last_line_recieved"]

        // Don't add up excessively large readtimes
        // The time up to the max will be added by the injection script
        if (elapsed_time <= MAX_TIME_AWAY) {
            game_date_entry["time_read"] += elapsed_time
        }
        
        game_date_entry["lines_read"] += lineSplitCount(line)
        game_date_entry["chars_read"] += charsInLine(line)
        game_date_entry["last_line_recieved"] = time
    } else {
        game_entry[process_path + "_" + date] = await newDateEntry(process_path, line, time)
    }
    
    browser.storage.local.set(game_entry)
}

export async function safeDeleteLine(process_path, line_id, line) {
    let line_key = JSON.stringify([process_path, line_id])
    browser.storage.local.remove(line_key)

    let game_entry = await browser.storage.local.get(process_path)
    let last_read_date = game_entry[process_path]["dates_read_on"].at(-1)
    let game_date_key = process_path + "_" + last_read_date

    game_entry = await browser.storage.local.get(game_date_key)
    game_entry[game_date_key]["lines_read"] -= lineSplitCount(line)
    game_entry[game_date_key]["chars_read"] -= charsInLine(line)

    browser.storage.local.set(game_entry)
}
