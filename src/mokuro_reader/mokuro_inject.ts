import { dateNowString } from "../calculations"
import { MokuroStorage } from "../mokuro/mokuro_storage"
import { SPLIT_PATH } from "../messaging/socket_actions"

import App from "./mokuro.svelte"

console.log("Injected")

let mokuro_storage: MokuroStorage
let promise_chain = Promise.resolve()

async function closeReader() {
    const injected_div = document.getElementById("exSTATic")
    if (!!injected_div) injected_div.remove()
}
document.addEventListener('mokuro-reader:reader.closed', () => promise_chain.then(closeReader))

async function createReader() {
    // Ensure mokuro storage exists
    if (!mokuro_storage)
        mokuro_storage = await MokuroStorage.build(true)

    // Load Svelte for the inserted UI
    if (!document.getElementById("exSTATic")) {
        const svelte_div = document.createElement("div")
        svelte_div.id = "exSTATic"
        document.body.insertBefore(svelte_div, document.getElementById("pageContainer"))
        new App({
            target: svelte_div,
            props: {
                mokuro_storage: mokuro_storage
            }
        })
    }
}

const onUpdate = async (event: CustomEvent) => {
    await createReader()

    const [series, volume] = [event.detail.title, event.detail.volumeName]
    const currentPage = event.detail.currentPageNum

    await mokuro_storage.changeInstance(undefined, JSON.stringify([series, volume]))
    await mokuro_storage.setDetails(series, event.detail.totalPages)

    const getPage = currentPage > mokuro_storage.details["last_page_read"] ? currentPage - 1 : currentPage

    await mokuro_storage.processPageStats(currentPage, event.detail.currentCharCount, event.detail.currentLineCount, dateNowString())
}

// Execute update
// Updates must be forced to run synchronously by running one after another
document.addEventListener(
  'mokuro-reader:page.change',
  (event: CustomEvent) => promise_chain = promise_chain.then(() => onUpdate(event))
)
