import { timeNowSeconds } from "../calculations"
import { exportStats } from "../data_wrangling/data_extraction"
import { showNameTitle } from "./tracker_inject"

var browser = require("webextension-polyfill")

var media_storage
var type_storage
var instance_storage

export function setStorage(media_storage_) {
    media_storage = media_storage_
    type_storage = media_storage_.type_storage
    instance_storage = media_storage_.instance_storage
}

function useProperty(element_id, global_css_property=false, units="") {
    let element = document.getElementById(element_id)

    // Update storage property
    let properties = {}
    properties[element_id] = element.value
    type_storage.updateProperties(properties)

    // If possible set the global css property
    if (global_css_property) {
        document.documentElement.style.setProperty(global_css_property, element.value + units)
    }
}

function setupProperty(element_id, event_type, global_css_property=false, units="") {
    let element = document.getElementById(element_id)
    
    // If storage contains this property then use it
    if (type_storage.properties.hasOwnProperty(element_id)) {
        element.value = type_storage.properties[element_id]
    }
    
    // Set the storage value andd global css property
    useProperty(element_id, global_css_property, units)

    // Set an event listener if it can be set
    if (event_type) {
        element.addEventListener(
            event_type,
            (event) => {
                useProperty(event["target"].id, global_css_property, units)
            }
        )
    }
}

function gameNameModified(event) {
    instance_storage.updateDetails({
        "name": event["target"].value
    })
    showNameTitle(event["target"].value)
}

async function userActive() {
    let time = timeNowSeconds()
    await instance_storage.updateDetails({"last_active_at": time})
    media_storage.previous_time = time
}

function openStats() {
    browser.runtime.sendMessage({
        "action": "open_tab",
        "url": "https://kamwithk.github.io/exSTATic/stats.html"
    })
}

export function setupProperties() {
    setupProperty("font", "change", "--default-jp-font")
    setupProperty("font_size", "change", "--default-jp-font-size", "rem")
    setupProperty("afk_max_time", "change")
    setupProperty("inactivity_blur", "change")
    setupProperty("bottom_line_padding", "change")

    document.getElementById("game_name").addEventListener("change", gameNameModified)
    document.getElementById("entry_holder").addEventListener("click", userActive)
    document.getElementById("view_stats").addEventListener("click", openStats)
    document.getElementById("export_stats").addEventListener("click", exportStats)
}
