console.log("Injected")

import { VNStorage } from "./vn_storage"

import App from "./vn.svelte"
var browser = require("webextension-polyfill")

const setup = async () => {
	const vn_storage = await VNStorage.build(true)
	const port = browser.runtime.connect({"name": "vn_lines"})
	port.onMessage.addListener(async data => {
		await vn_storage.changeInstance(undefined, data["process_path"])
		await vn_storage.addLine(data["line"], data["date"], data["time"])
	})

	new App({
		target: document.documentElement,
		props: {
			vn_storage: vn_storage
		}
	})
}
setup()
