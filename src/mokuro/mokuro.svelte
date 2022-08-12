<script lang="ts">
    import { timeNowSeconds } from "../calculations.js"
    import StatBar from "../components/stat_bar.svelte"
    
    import "../external/tailwindcss.js"

    export let mokuro_storage

    const userActive = async () => {
		const time = timeNowSeconds()
		if (mokuro_storage.instance_storage === undefined) return
		
		if (mokuro_storage.previous_time === undefined) {
			await mokuro_storage.instance_storage.updateDetails({"last_active_at": time})
			mokuro_storage.start_ticker()
		} else {
			mokuro_storage.stop_ticker()
		}
	}

    document.getElementById("pagesContainer").addEventListener("dblclick", userActive)
</script>

<div class="flex flex-col-reverse items-end content-center m-[5px]">
    <div class="h-10 grow rounded-[3px] z-50" style="background: var(--color1); box-shadow: 0px 0px 8px 0px var(--color3a);">
        <StatBar media_storage={mokuro_storage}/>
    </div>
</div>
