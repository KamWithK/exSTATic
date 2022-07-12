console.log("exSTATic")

import { message_action } from "./which/messaging_action"
import { dataFetched } from "./which/socket_action"

function connectToWebSocket(_) {
    const socket = new WebSocket("ws://localhost:9001")

    socket.onmessage = dataFetched 
    socket.onopen = connectionOpened
    socket.onclose = connectToWebSocket
}

function connectionOpened(event) {
    console.log("Connected")
}

connectToWebSocket()

// Message passing is used for actions which can only be performed on the background page
chrome.runtime.onMessage.addListener(message_action)
