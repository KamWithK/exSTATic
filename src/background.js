console.log("CharTracker")

import { createGameEntry, updatedGameEntry } from "./storage"

function connectToWebSocket(_) {
    const socket = new WebSocket("ws://localhost:9001")

    socket.onmessage = lineFetched
    socket.onopen = connectionOpened
    socket.onclose = connectToWebSocket
}

function connectionOpened(event) {
    console.log("Connected")
}

function lineFetched(event) {
    // Start by getting a timestamp for accuracy
    rn = new Date()
    date = rn.getFullYear() + "/" + rn.getMonth() + "/" + rn.getDate()
    time = rn.getTime()

    // Parse provided data
    // Should contain sentence and executable (process) path
    data = JSON.parse(event.data)
    console.log("Raw Data: ", data)

    process_path = data["process_path"]
    line = data["sentence"]

    // Set this as last hooked game
    chrome.storage.local.set({"previously_hooked": process_path})

    // Update or create a game entry
    // Each game is stored as numerous small chunks of data
    chrome.storage.local.get(
        [process_path, process_path + "_" + date],
        function(game_entry) {
            if (Object.keys(game_entry).length === 0) {
                createGameEntry(process_path, line, date, time)
            } else {
                updatedGameEntry(game_entry, process_path, line, date, time)
            }
        }
    )
}

connectToWebSocket()

// Downloads have to be redirected here
chrome.runtime.onMessage.addListener(function(arg, sender, send_response) {
    blob = new Blob(arg["csv"], arg["blob_options"])
    
    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: arg["filename"]
    })
})
