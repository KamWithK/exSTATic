var browser = require("webextension-polyfill")

// Insert Google Material Icons CDN
const material_cdn = document.createElement("link")
material_cdn.href = browser.extension.getURL("build/external/material_icons.css")
material_cdn.rel="stylesheet"
document.head.appendChild(material_cdn)

import { dateNowString } from "../calculations"
import { MokuroStorage } from "./mokuro_storage"
import { SPLIT_PATH } from "../messaging/socket_actions"

import App from "./mokuro.svelte"

console.log("Injected")

var mokuro_storage

function getVolumeSeries() {
    const paths = decodeURI(window.location.href).split(SPLIT_PATH)

    const volume = paths[paths.length - 1].replace(/\.html.*$/, "")
    const series = paths[paths.length - 2]

    return [volume, series]
}

function getPage() {
    const [current_page, total_pages] = document.getElementById("pageIdxDisplay").innerText.split("/")

    return [Number.parseInt(current_page) - 1, Number.parseInt(total_pages)]
}

const getGivenID = (series, volume) => JSON.stringify([series, volume])


async function setup() {
    mokuro_storage = await MokuroStorage.build(true)

    // Process first page
    const [volume, series] = getVolumeSeries()
    const [current_page, total_pages] = getPage()

    await mokuro_storage.changeInstance(undefined, getGivenID(series, volume))
    await mokuro_storage.setDetails(series, total_pages)

    // Ensure starting partially through doesn't cause everything so far to log in todays stats
    await mokuro_storage.instance_storage.updateDetails({"last_page_read": current_page})

    // Load Svelte for the inserted UI
    const svelte_div = document.createElement("div")
    document.body.insertBefore(svelte_div, document.getElementById("showMenuA"))
    new App({
        target: svelte_div,
        props: {
            name: "vn",
            mokuro_storage: mokuro_storage
        }
    })
}
setup()


const observer = new MutationObserver(async _ => {
    const [volume, series] = getVolumeSeries()
    const [current_page, total_pages] = getPage()

    // When going to the next page, process the previouslly read page's lines
    // When going back to the last page, process this page's lines
    const get_page = current_page > mokuro_storage.details["last_page_read"] ? current_page - 1 : current_page
    const lines = Array.from(document.getElementById(`page${get_page}`).firstChild.childNodes)
        .map(element => Array.from(element.childNodes).reduce((so_far, node) => `${so_far}${node.textContent}`, ""))

    await mokuro_storage.changeInstance(undefined, getGivenID(series, volume))
    await mokuro_storage.setDetails(series, total_pages)
    await mokuro_storage.processPage(current_page, lines, dateNowString())
})
observer.observe(document.getElementById("pageIdxDisplay"), {"childList": true, "subtree": true})
