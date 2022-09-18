console.log("Injected")

import { getData } from "../data_wrangling/data_extraction"
import Stats from "./stats.svelte"

import { parseISO } from "date-fns"

const setup = async () => {
    new Stats({
		target: document.documentElement,
		props: {
			data: (await getData()).sort((first, second) => parseISO(first["date"]).valueOf() - parseISO(second["date"]).valueOf())
		}
	})
}
setup()

export {}
