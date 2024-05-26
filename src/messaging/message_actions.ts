import * as browser from "webextension-polyfill"

export async function message_action(args: any) {
    if (args["action"] == "open_tab") {
        await open_tab(args)
    }
    else if (args["action"] == "download") {
        await download(args)
    }
}

async function download(args: any) {
    await browser.downloads.download({
        url: typeof(args["url"]) !== "string" ? URL.createObjectURL(args["url"]) : args["url"],
        filename: args["filename"]
    })
}

async function open_tab(args: any) {
    await browser.tabs.create({"url": args["url"]})
}
