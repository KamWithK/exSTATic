console.log("exSTATic")

import { message_action } from "./messaging/message_actions"
import { SocketManager } from "./messaging/socket_actions"

var browser = require("webextension-polyfill")

// Message passing is used for actions which can only be performed on the background page
browser.runtime.onMessage.addListener(message_action)

browser.browserAction.onClicked.addListener(async _ => {
    const listen_status = (await browser.storage.local.get("listen_status"))["listen_status"]

    if (listen_status == true || listen_status === undefined) {
        await browser.browserAction.setIcon({
            "path": {
                "100": "docs/disabled_100x100.png",
                "500": "docs/disabled.png"
            }
        })

        await browser.storage.local.set({
            "listen_status": false
        })
    } else {
        await browser.browserAction.setIcon({
            "path": {
                "100": "docs/favicon_100x100.png",
                "500": "docs/favicon.png"
            }
        })

        await browser.storage.local.set({
            "listen_status": true
        })
    }
})

new SocketManager("ws://localhost:9001")
