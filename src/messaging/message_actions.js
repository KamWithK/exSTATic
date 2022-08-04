var browser = require("webextension-polyfill")

var BOM_CODE = "\ufeff"

export async function message_action(args, sender, send_response) {
    if (args["action"] == "export_csv") {
        await export_csv(args)
    }
    else if (args["action"] == "open_tab") {
        await open_tab(args)
    }
}

async function export_csv(args) {
    // Byte Order Mark (BOM) required on Windows for displaying Japanese characters
    if (args["csv"][0].substring(0, 5) != BOM_CODE) {
        args["csv"][0] = BOM_CODE + args["csv"][0]
    }

    let blob = new Blob(args["csv"], args["blob_options"])
        
    await browser.downloads.download({
        url: URL.createObjectURL(blob),
        filename: args["filename"]
    })
}

async function open_tab(args) {
    await browser.tabs.create({"url": args["url"]})
}
