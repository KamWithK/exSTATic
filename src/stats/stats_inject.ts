console.log("Injected")

import { getData } from "../data_wrangling/data_extraction"
import Stats from "./stats.svelte"

const setup = async () => {
    new Stats({
		target: document.documentElement,
		props: {
			data: await getData()
		}
	})
}
setup()

export {}
