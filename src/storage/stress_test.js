import { dateNowString, timeNowSeconds } from "../calculations"

var browser = require("webextension-polyfill")

export async function linesStressTest(media_storage, add_lines) {
    let uuid = await media_storage.type_storage.addMedia(undefined, "0000000000")
    await media_storage.changeInstance(uuid)

    console.log(`Requested to insert ${add_lines} new lines, please wait until a success message is logged`)
    if (add_lines >= 100000) {
        console.log(`WARNING: inserting 100k+ lines, expect a significant insert and load delay\nCrashes may occur...`)
    }

    let changes = {}
    let _ = [...Array(add_lines).keys()].forEach(index => {
        let line_key = JSON.stringify([uuid, media_storage.details["last_line_added"] + index + 1])
        changes[line_key] = [crypto.randomUUID(), timeNowSeconds()]
    })

    await browser.storage.local.set(changes)
    
    await media_storage.instance_storage.updateDetails({
        "last_line_added": media_storage.details["last_line_added"] + add_lines,
        "last_active_at": timeNowSeconds()
    })

    console.log(`There are ${media_storage.details["last_line_added"] + 1} lines in test ${uuid}\nRefresh the page to see the new lines`)
}

export async function testLines(media_storage, lines)  {
    let uuid = await media_storage.type_storage.addMedia(undefined, "0000000000")
    await media_storage.changeInstance(uuid)

    await Promise.all(lines.map(async line => await media_storage.addLine(line, dateNowString(), timeNowSeconds())))
}
