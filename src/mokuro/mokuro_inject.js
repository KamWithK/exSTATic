import { MokuroStorage } from "./mokuro_storage"

console.log("Injected")

var SPLIT_PATH = /\\|\//g

var mokuro_storage

function getVolumeSeries() {
    let paths = decodeURI(window.location.href).split(SPLIT_PATH)

    let volume = paths[paths.length - 1].replace(/\.html.*$/, "")
    let series = paths[paths.length - 2]

    return [volume, series]
}

function getPage() {
    let [current_page, total_pages] = document.getElementById("pageIdxDisplay").innerText.split("/")
    current_page = Number.parseInt(current_page) - 1
    total_pages = Number.parseInt(total_pages)

    return [current_page, total_pages]
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
    await mokuro_storage.processPage(current_page, lines)
})
observer.observe(document.getElementById("pageIdxDisplay"), {"childList": true, "subtree": true})
