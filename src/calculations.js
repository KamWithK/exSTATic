// Source of information - https://en.wikipedia.org/wiki/List_of_Japanese_typographic_symbols
var IGNORE = /[〔〕《》〖〗〘〙〚〛【】「」［］『』｛｝\[\]()（）｟｠〈〉≪≫。、.,※＊'：！?？‥…―─ｰ〽～→♪♪ ♫ ♬ ♩\"　\t\n]/g

export function charsInLine(line) {
    return line.replaceAll(IGNORE, "").length
}

export function lineSplitCount(line) {
    return line.split("\n").split("。").length
}
