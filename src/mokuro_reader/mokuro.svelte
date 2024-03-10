<script lang="ts">
		import type { MokuroStorage } from "./mokuro_storage.js"
    import StatBar from "../components/interface/stat_bar.svelte"
    
    export let mokuro_storage: MokuroStorage

    document.body.addEventListener("dblclick", mokuro_storage.toggleActive.bind(mokuro_storage))

	document.addEventListener("status_active", () => {
		document.getElementById("manga-panel").style.setProperty(
			"filter",
			""
		)
	})

	document.addEventListener("status_inactive", () => {
		document.getElementById("manga-panel").style.setProperty(
			"filter",
			"blur(2px)"
		)
	})
</script>

<div class="flex flex-col-reverse items-end content-center m-[5px]">
    <StatBar media_storage={mokuro_storage}/>
</div>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
