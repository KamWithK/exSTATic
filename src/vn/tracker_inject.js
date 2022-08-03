console.log("Injected")

import { dateNowString } from "../calculations"
import { MediaStorage } from "../storage/media_storage"
import { setStorage, setupProperties } from "./ui_properties"
import { linesStressTest } from "../storage/stress_test"

var browser = require("webextension-polyfill")

var SECS_TO_HOURS = 60 * 60

var media_storage

async function setup() {
    media_storage = await MediaStorage.build("vn", true)

    var port = browser.runtime.connect({"name": "vn_lines"})
    port.onMessage.addListener(async (data) => {
        await media_storage.changeInstance(undefined, data["process_path"])
        await media_storage.addLine(data["line"], data["date"], data["time"])
    })

    setStorage(media_storage)
    setupProperties()

    setStats()

    // linesStressTest(media_storage, 100000)
}
setup()

function setActive() {
    document.getElementById("activity_symbol").innerHTML = "hourglass_bottom"
    document.documentElement.style.setProperty(
        "--default-inactivity-blur",
        0
    )

    setStats()
}
document.addEventListener("status_active", setActive)

async function setInactive() {
    document.getElementById("activity_symbol").innerHTML = "bedtime"
    document.documentElement.style.setProperty(
        "--default-inactivity-blur",
        media_storage.properties["inactivity_blur"] + "px"
    )

    setStats()
}
document.addEventListener("status_inactive", setInactive)

function newLineDiv(line, line_id) {
    let container_div = document.createElement("div")
    let new_svg = document.createElement("svg")
    let new_p = document.createElement("p")
    let new_checkbox = document.createElement("input")

    new_checkbox.type = "checkbox"
    
    container_div.classList.add("sentence-entry")
    new_svg.classList.add("circle-bullet-point")
    new_p.classList.add("sentence")
    new_checkbox.classList.add("line-select")

    container_div.dataset.line_id = line_id    
    new_p.innerHTML = line
    
    container_div.appendChild(new_svg)
    container_div.appendChild(new_p)
    container_div.appendChild(new_checkbox)

    return container_div
}

export function showNameTitle(name) {
    let game_name_heading = document.getElementById("game_name")

    // Disable editing of name until the previous value has been set
    game_name_heading.disabled = true
    game_name_heading.value = name
    game_name_heading.disabled = false

    // Set the document title
    document.title = "exSTATic | " + name
}

export function setStats() {
    if (media_storage.instance_storage == undefined || media_storage.instance_storage.today_stats == undefined) {
        return
    }

    // Get stat values
    let chars_read = media_storage.instance_storage.today_stats["chars_read"]
    let lines_read = media_storage.instance_storage.today_stats["lines_read"]
    let time_read = media_storage.instance_storage.today_stats["time_read"]

    // Set char counter
    if (chars_read !== undefined) {
        document.getElementById("chars_read").innerHTML = chars_read.toLocaleString()
    }

    // Set lines counter
    if (lines_read !== undefined) {
        document.getElementById("lines_read").innerHTML = lines_read.toLocaleString()
    }

    // Set speed
    if (chars_read !== undefined && time_read !== undefined) {
        let average = Math.round(chars_read / (time_read / SECS_TO_HOURS))
        document.getElementById("chars_per_hour").innerHTML = average.toLocaleString()
    }

    // Set elapsed time
    if (time_read !== undefined) {
        let date = new Date(0)
        date.setSeconds(Math.round(time_read))
        document.getElementById("elapsed_time").innerHTML = date.toISOString().substring(11, 19)
    }
}

function gameChanged(event) {
    // Show name and title
    showNameTitle(event.detail["name"])

    // Show lines
    let line_divs = Object.entries(event.detail["lines"]).map(
        ([key, line]) => newLineDiv(line, JSON.parse(key)[1])
    ).sort((first, second) => first.dataset.line_id - second.dataset.line_id)

    document.getElementById("entry_holder").replaceChildren(...line_divs)
}
document.addEventListener("media_changed", gameChanged)

function lineAdded(event) {
    document.getElementById("entry_holder").appendChild(newLineDiv(
        event.detail["line"], event.detail["line_id"]
    ))
}
document.addEventListener("new_line", lineAdded)
