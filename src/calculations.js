import { formatISO } from "date-fns"

// Source of information - https://en.wikipedia.org/wiki/List_of_Japanese_typographic_symbols
var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g
var SPLIT = /[\n。.！?？]/g

export function charsInLine(line) {
    return line.replaceAll(IGNORE, "").length
}

export function lineSplitCount(line) {
    return line.split(SPLIT).filter((value) => value != "").length
}

export function dateNowString() {
    rn = new Date()
    return formatISO(rn, {"representation": "date"})
}

export function timeNowSeconds() {
    let rn = new Date()
    return rn.getTime() / 1000
}
