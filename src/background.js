console.log("exSTATic")

import { message_action } from "./messaging/message_actions"
import { connectionClosed, connectionOpened, dataFetched, messagingConnected } from "./messaging/socket_actions"

import ReconnectingWebSocket from "reconnecting-websocket"

var browser = require("webextension-polyfill")

// NOTE: Chrome only supports Manifest V3 whilst Firefox Manifest V2
// TODO: Declutter once Firefox supports Manifest V3
const manifest_version = browser.runtime.getManifest().manifest_version

// Reloaders have to be made for Manifest V2 and V3 separately
const reloadTab = async (tab) => {
    manifest_version === 2 ? reloadTabV2(tab) : reloadTabV3(tab)
}

const reloadTabV2 = async (tab) => {
    browser.tabs.executeScript(
        tab.id,
        { code: "window.location.reload()" }
    )
}

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
    runOnContentScripts(reloadTab)
})

// Message passing is used for actions which can only be performed on the background page
browser.runtime.onMessage.addListener(message_action)

// API names can change between Manifest versions
const browser_action = manifest_version === 2 ? browser.browserAction : browser.action

browser_action.onClicked.addListener(async () => {
    const listen_status = (await browser.storage.local.get("listen_status"))["listen_status"]

    if (listen_status == true || listen_status === undefined) {
        await browser_action.setIcon({
            "path": {
                "100": "/docs/disabled_100x100.png",
                "500": "/docs/disabled.png"
            }
        })

        await browser.storage.local.set({
            "listen_status": false
        })
    } else {
        await browser_action.setIcon({
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
