var browser = require("webextension-polyfill")

export const addFont = async (font_name: string, relative_path: string) => {
    const absolute_path = browser.runtime.getURL(relative_path)
    const font = new FontFace(font_name,`url("${absolute_path}")`)

    await font.load()
    document.fonts.add(font)
}

addFont("Material Icons", "fonts/MaterialIcons-Regular.ttf")

// addFont("Klee One", "fonts/Klee One/KleeOne-Regular.ttf")
addFont("Klee One", "fonts/Klee One/KleeOne-SemiBold.ttf")

// addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Thin.otf")
// addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Light.otf")
addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Regular.otf")
// addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Medium.otf")
// addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Bold.otf")
// addFont("Noto Sans JP", "fonts/Noto Sans JP/NotoSansJP-Black.otf")

addFont("Shippori Mincho", "fonts/Shippori Mincho/ShipporiMincho-Regular.otf")
// addFont("Shippori Mincho", "fonts/Shippori Mincho/ShipporiMincho-Medium.otf")
// addFont("Shippori Mincho", "fonts/Shippori Mincho/ShipporiMincho-SemiBold.otf")
// addFont("Shippori Mincho", "fonts/Shippori Mincho/ShipporiMincho-Bold.otf")
// addFont("Shippori Mincho", "fonts/Shippori Mincho/ShipporiMincho-ExtraBold.otf")
