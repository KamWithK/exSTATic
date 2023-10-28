console.log("exSTATic")

import { message_action } from "./messaging/message_actions"
import { connectionClosed, connectionOpened, dataFetched, messagingConnected } from "./messaging/socket_actions"

import ReconnectingWebSocket from "reconnecting-websocket"

var browser = require("webextension-polyfill")

const reloadTabV3 = async (tab) => {
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.location.reload()
    })
}

// Run a function with each tab that has a content script
const runOnContentScripts = async (func) => {
    for (const content_script of browser.runtime.getManifest().content_scripts) {
        for (const tab of await browser.tabs.query({url: content_script.matches}))
            func(tab)
    }
}

browser.runtime.onUpdateAvailable.addListener(() => browser.runtime.reload())
browser.runtime.onInstalled.addListener(async () => {
    if (!(await browser.storage.local.get("client"))["client"])
        await browser.storage.local.set({ "client": crypto.randomUUID() })

    console.log("Client UUID: " + (await browser.storage.local.get("client"))["client"])

    if (!(await browser.storage.local.get("schema_version"))["schema_version"])
        await browser.storage.local.set({ "schema_version": 2. })
    
    console.log("Reloading all extension tabs...")
    runOnContentScripts(reloadTabV3(tab))
})

// Message passing is used for actions which can only be performed on the background page
browser.runtime.onMessage.addListener(message_action)

browser.action.onClicked.addListener(async () => {
    const listen_status = (await browser.storage.local.get("listen_status"))["listen_status"]

    if (listen_status == true || listen_status === undefined) {
        await browser.action.setIcon({
            "path": {
                "100": "/docs/disabled_100x100.png",
                "500": "/docs/disabled.png"
            }
        })

        await browser.storage.local.set({
            "listen_status": false
        })
    } else {
        await browser.action.setIcon({
            "path": {
                "100": "/docs/favicon_100x100.png",
                "500": "/docs/favicon.png"
            }
        })

        await browser.storage.local.set({
            "listen_status": true
        })
    }
})

let socket = new ReconnectingWebSocket("ws://localhost:9001")

socket.addEventListener("open", connectionOpened)
socket.addEventListener("close", connectionClosed)
socket.addEventListener("error", connectionClosed)
socket.addEventListener("message", dataFetched)

browser.runtime.onConnect.addListener(messagingConnected)
