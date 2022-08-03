import { dateNowString, timeNowSeconds } from "../calculations"
import { exportLines, exportStats, importStats } from "../data_wrangling/data_extraction"
import { showNameTitle } from "./tracker_inject"
import { parse } from "papaparse"

var browser = require("webextension-polyfill")

var media_storage

export function setStorage(media_storage_) {
    media_storage = media_storage_
}

function useProperty(element_id, global_css_property=false, units="") {
    let element = document.getElementById(element_id)

    // Update storage property
    let properties = {}
    properties[element_id] = element.value
    media_storage.type_storage.updateProperties(properties)

    // If possible set the global css property
    if (global_css_property) {
        document.documentElement.style.setProperty(global_css_property, element.value + units)
    }
}

function setupProperty(element_id, event_type, global_css_property=false, units="") {
    let element = document.getElementById(element_id)
    
    // If storage contains this property then use it
    if (media_storage.properties.hasOwnProperty(element_id)) {
        element.value = media_storage.properties[element_id]
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
    media_storage.instance_storage.updateDetails({
        "name": event["target"].value
    })
    showNameTitle(event["target"].value)
}

async function userActive() {
    let time = timeNowSeconds()
    if (media_storage.instance_storage === undefined) return
    
    if (media_storage.previous_time === undefined) {
        await media_storage.instance_storage.updateDetails({"last_active_at": time})
        media_storage.previous_time = time
    } else {
        media_storage.previous_time = undefined
    }
}

function openStats() {
    browser.runtime.sendMessage({
        "action": "open_tab",
        "url": "https://kamwithk.github.io/exSTATic/stats.html"
    })
}

async function deleteLines() {
    if (media_storage.instance_storage === undefined) return

    let checked_boxes = Array.from(document.querySelectorAll(".line-select:checked"))

    if (checked_boxes.length === 0) return

    let plural = checked_boxes.length > 1 ? "lines" : "line"

    confirmed = confirm(
        `Are you sure you'd like to delete ${checked_boxes.length} ${plural}?\nChar and line statistics will be modified accordingly (assuming read today) however time read won't change...`
    )

    if (!confirmed) return

    let parents = checked_boxes.map(checkbox => checkbox.parentElement)
    let line_ids = parents.map(element_div => Number.parseInt(element_div.dataset.line_id))
    let lines = parents.map(element_div => element_div.textContent)

    media_storage.deleteLines(line_ids, lines, dateNowString())
    parents.forEach(element_div => element_div.remove())
}

export function setupProperties() {
    setupProperty("font", "change", "--default-jp-font")
    setupProperty("font_size", "change", "--default-jp-font-size", "rem")
    setupProperty("afk_max_time", "change")
    setupProperty("max_loaded_lines", "change")
    setupProperty("inactivity_blur", "change")
    setupProperty("bottom_line_padding", "change")

    document.getElementById("game_name").addEventListener("change", gameNameModified)
    document.getElementById("entry_holder").addEventListener("dblclick", userActive)
    document.getElementById("delete-selection").addEventListener("click", deleteLines)
    document.getElementById("view_stats").addEventListener("click", openStats)
    document.getElementById("export_stats").addEventListener("click", exportStats)
    document.getElementById("export_lines").addEventListener("click", _ => {
        confirmed = confirm(
            "Are you sure you'd like to export lines?\nExporting large numbers of lines can take a long time, please wait and do not retry whilst the operation takes place..."
        )
    
        if (confirmed) {
            exportLines()
        }
    })

    document.getElementById("import_stats").addEventListener("change", event => {
        confirmed = confirm(
            "Are you sure you'd like to import previous data?\nPrevious stats in storage will be replaced with new values from this data dump (when the type, media and date all collide)...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!"
        )
    
        if (!confirmed) return

        parse(event["target"].files[0], {
            "header": true,
            "dynamicTyping": true,
            "complete": async result => {
                await importStats(result.data)
                alert("Finished importing stats successfully, refresh all pages now...")
            }
        })
    })
}
