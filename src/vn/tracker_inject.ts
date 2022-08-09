console.log("Injected")

import App from "./vn.svelte"

new App({
	target: document.documentElement,
	props: {
		name: "vn"
	}
})
