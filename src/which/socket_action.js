var browser = require("webextension-polyfill")

import { dateNowString, timeNowSeconds } from "../calculations"
import { createGameEntry, updatedGameEntry } from "../storage/update_storage"

var SPLIT_PATH = /\\|\//g

export function dataFetched(event) {
    // Parse provided data
    data = JSON.parse(event.data)
    console.log("Recieved Socket Data: ", data)
    
    // Lines will have a valid process path and sentence
    if ("process_path" in data && "sentence" in data) {
        processLine(data["process_path"], data["sentence"])
    }
}

async function processLine(process_path, line) {
    // Start by getting a timestamp for accuracy
    let time = timeNowSeconds()
    let date = dateNowString()
    
    // Only consider at max the last three sections of the path
    var path_segments = process_path.split(SPLIT_PATH)
    var process_path = path_segments.slice(Math.max(0, path_segments.length - 3)).join("\/")
    
    // Set this as last hooked game
    browser.storage.local.set({"previously_hooked": process_path})
    
    // Update or create a game entry
    // Each game is stored as numerous small chunks of data
    game_entry = await browser.storage.local.get([process_path, process_path + "_" + date])
    if (Object.keys(game_entry).length === 0) {
        createGameEntry(process_path, line, date, time)
    } else {
        updatedGameEntry(game_entry, process_path, line, date, time)
    }
}