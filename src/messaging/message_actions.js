var browser = require("webextension-polyfill")

const manifest_version = browser.runtime.getManifest().manifest_version

export async function message_action(args, sender, send_response) {
    if (args["action"] == "open_tab") {
        await open_tab(args)
    }
    else if (args["action"] == "download") {
        await download(args)
    }
}

async function download(args) {
    await browser.downloads.download({
        url: manifest_version == 2 ? URL.createObjectURL(args["url"]) : args["url"],
        filename: args["filename"]
    })
}

async function open_tab(args) {
    await browser.tabs.create({"url": args["url"]})
}
