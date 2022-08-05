console.log("Injected")

import { VNStorage } from "./vn_storage"
import { setStorage, setupProperties } from "./ui_properties"
import { linesStressTest, testLines } from "../storage/stress_test"

var browser = require("webextension-polyfill")

var SECS_TO_HOURS = 60 * 60

var vn_storage

async function setup() {
    vn_storage = await VNStorage.build(true)

    var port = browser.runtime.connect({"name": "vn_lines"})
    port.onMessage.addListener(async (data) => {
        await vn_storage.changeInstance(undefined, data["process_path"])
        await vn_storage.addLine(data["line"], data["date"], data["time"])
    })

    setStorage(vn_storage)
    await setupProperties()

    setStats()

    // await linesStressTest(vn_storage, 100000)
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
        vn_storage.properties["inactivity_blur"] + "px"
    )

    setStats()
}
document.addEventListener("status_inactive", setInactive)

function newLineDiv(line, line_id, time) {
    let container_div = document.createElement("div")
    let new_p = document.createElement("p")
    let new_checkbox = document.createElement("input")

    new_checkbox.type = "checkbox"
    
    container_div.classList.add("sentence-entry")
    new_p.classList.add("sentence")
    new_checkbox.classList.add("line-select")

    container_div.dataset.line_id = line_id
    container_div.dataset.time = time
    new_p.innerHTML = line
    
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
    if (vn_storage.instance_storage == undefined || vn_storage.instance_storage.today_stats == undefined) {
        return
    }

    // Get stat values
    let chars_read = vn_storage.instance_storage.today_stats["chars_read"]
    let lines_read = vn_storage.instance_storage.today_stats["lines_read"]
    let time_read = vn_storage.instance_storage.today_stats["time_read"]

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
    let line_divs = event.detail["lines"]
        .map(([_, line_id, line, time]) => newLineDiv(line, line_id, time))
        .sort((first, second) => first.dataset.line_id - second.dataset.line_id)

    document.getElementById("entry_holder").replaceChildren(...line_divs)
}
document.addEventListener("media_changed", gameChanged)

function lineAdded(event) {
    document.getElementById("entry_holder").appendChild(newLineDiv(
        event.detail["line"], event.detail["line_id"], event.detail["time"]
    ))
}
document.addEventListener("new_line", lineAdded)
