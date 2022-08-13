<script lang="ts">
    import { timeNowSeconds } from "../calculations.js"
	import type { MokuroStorage } from "./mokuro_storage.js"
    import StatBar from "../components/stat_bar.svelte"
    
    export let mokuro_storage: MokuroStorage

    document.body.addEventListener("dblclick", mokuro_storage.toggleActive.bind(mokuro_storage))

	document.addEventListener("status_active", () => {
		document.getElementById("pagesContainer").style.setProperty(
			"filter",
			""
		)
	})

	document.addEventListener("status_inactive", () => {
		document.getElementById("pagesContainer").style.setProperty(
			"filter",
			"blur(2px)"
		)
	})
</script>

<div class="flex flex-col-reverse items-end content-center m-[5px]">
    <div class="h-10 grow rounded-[3px] z-50" style="background: var(--color1); box-shadow: 0px 0px 8px 0px var(--color3a);">
        <StatBar media_storage={mokuro_storage}/>
    </div>
</div>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
