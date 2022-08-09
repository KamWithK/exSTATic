import { dateNowString, timeNowSeconds } from "../calculations"

var browser = require("webextension-polyfill")

export const SPLIT_PATH = /\\|\//g
var socket

export class SocketManager {
    constructor(url) {
        this.url = url

        this.port = undefined
        browser.runtime.onConnect.addListener(this.messagingConnected.bind(this))

        this.connectToWebSocket()
    }

    messagingConnected(port) {
        console.log("Messaging Connected: ", port)
        this.port = port

        this.port.onDisconnect.addListener(this.messagingDisconnected.bind(this))
    }

    messagingDisconnected(port) {
        console.log("Messaging Disconnected: ", port)
        if (port == this.port) {
            this.port = undefined
        }
    }

    connectToWebSocket() {
        const socket = new WebSocket(this.url)

        socket.addEventListener("open", this.connectionOpened.bind(this))
        socket.addEventListener("close", this.connectToWebSocket.bind(this))
        socket.addEventListener("error", this.connectToWebSocket.bind(this))
        socket.addEventListener("message", this.dataFetched.bind(this))
    }
    
    connectionOpened() {
        console.log("Connected")
    }
    
    async dataFetched(event) {
        const listen_status = (await browser.storage.local.get("listen_status"))["listen_status"]
        if (listen_status === false) {
            return
        }

        // Start by getting a timestamp for accuracy
        const time = timeNowSeconds()
        const date = dateNowString()

        // Parse provided data
        const data = JSON.parse(event.data)
        console.log("Recieved Socket Data: ", data)
        
        // Lines will have a valid process path and sentence
        if (!data.hasOwnProperty("process_path") || !data.hasOwnProperty("sentence")) {
            return
        }

        let process_path = data["process_path"]
        const line = data["sentence"]

        // Only consider at max the last three sections of the path
        const path_segments = process_path.split(SPLIT_PATH)
        process_path = path_segments.slice(Math.max(0, path_segments.length - 3)).join("\/")

        await this.port.postMessage({
            "line": line,
            "process_path": process_path,
            "date": date,
            "time": time
        })
    }
}
