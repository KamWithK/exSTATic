export function message_action(args, sender, send_response) {
    if (args["action"] == "export_csv") {
        export_csv(args)
    }
    else if (args["action"] == "open_tab") {
        open_tab(args)
    }
}

function export_csv(args) {
    let blob = new Blob(args["csv"], args["blob_options"])
        
    chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: args["filename"]
    })
}

function open_tab(args) {
    chrome.tabs.create({"url": args["url"]})
}
