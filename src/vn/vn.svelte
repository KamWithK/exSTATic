<script lang="ts">
	import { timeNowSeconds, timeToDateString } from "../calculations"
	import { VNStorage } from "./vn_storage"
	import { exportLines, exportStats, importStats } from "../data_wrangling/data_extraction"
	import StatBar from "../components/stat_bar.svelte"
	import MenuBar from "../components/menu_bar.svelte"
	import MenuOption from "../components/menu_option.svelte"
	import LineHolder from "../components/line_holder.svelte"

	import { parse } from "papaparse"
	var browser = require("webextension-polyfill")

	const promise = VNStorage.build(true)
	let vn_storage
	let title = "Game"
	let lines = []
	let menu = false

	// Storage and connection to background setup
	const setup = async () => {
		vn_storage = await promise

		let port = browser.runtime.connect({"name": "vn_lines"})
		port.onMessage.addListener(async data => {
			await vn_storage.changeInstance(undefined, data["process_path"])
			await vn_storage.addLine(data["line"], data["date"], data["time"])
		})
	}
	setup()

	// Events for media being added/replaced
	document.addEventListener("media_changed", event => {
		// Show name and title
		title = event["detail"]["name"]
	
		// Show lines
		lines = event["detail"]["lines"]
			.sort((first, second) => first[1] - second[1])
	})

	document.addEventListener("new_line", event => {
		lines = [...lines, [
			vn_storage.uuid,
			event["detail"]["line_id"],
			event["detail"]["line"],
			event["detail"]["time"]
		]]
	})

	// UI events
	const setTitle = title => {
		if (vn_storage == undefined || vn_storage.instance_storage == undefined) return
		vn_storage.instance_storage.updateDetails({"name": title})
	}
	$: setTitle(title)

	const requestExportLines = async () => {
		const confirmed = confirm(
            "Are you sure you'd like to export lines?\nExporting large numbers of lines can take a long time, please wait and do not retry whilst the operation takes place..."
        )
    
        if (confirmed) {
            await exportLines()
        }
	}

	const requestImportLines = event => {
        const confirmed = confirm(
            "Are you sure you'd like to import previous data?\nPrevious stats in storage will be replaced with new values from this data dump (when the type, media and date all collide)...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!"
        )
    
        if (!confirmed) return

        parse(event["target"].files[0], {
            "header": true,
            "dynamicTyping": true,
            "complete": async result => {
                await importStats(result.data)
                alert("Finished importing stats successfully!\nPlease refresh all exSTATic pages now...")
            }
        })
    }

	const openStats = () => {
    	browser.runtime.sendMessage({
    	    "action": "open_tab",
    	    "url": "https://kamwithk.github.io/exSTATic/stats.html"
    	})
	}

	const userActive = async () => {
		let time = timeNowSeconds()
		if (vn_storage.instance_storage === undefined) return
		
		if (vn_storage.previous_time === undefined) {
			await vn_storage.instance_storage.updateDetails({"last_active_at": time})
			vn_storage.start_ticker()
		} else {
			vn_storage.stop_ticker()
		}
	}

	const deleteLines = async () => {
		if (vn_storage.instance_storage === undefined) return

		let checked_boxes = Array.from(document.querySelectorAll(".line-select:checked"))

		if (checked_boxes.length === 0) return

		let plural = checked_boxes.length > 1 ? "lines" : "line"

		const confirmed = confirm(
			`Are you sure you'd like to delete ${checked_boxes.length} ${plural}?\nChar and line statistics will be modified accordingly however time read won't change...`
		)

		if (!confirmed) return

		let parents = checked_boxes.map(checkbox => checkbox.parentElement)
		let details = parents.map(element_div => [
			Number.parseInt(element_div.dataset.lineId),
			element_div.textContent,
			timeToDateString(Number.parseInt(element_div.dataset.time))
		])

		await vn_storage.deleteLines(details)
		parents.forEach(element_div => element_div.remove())
	}
</script>

<body class="flex flex-col h-screen w-screen">
	<div id="top_bar" class="flex z-50 h-20 items-center justify-between">
		<input id="game_name" class="w-20 h-full shrink grow justify-self-start jp-text" type="text" bind:value={title}>
		<div class="relative">
			{#await promise then vn_storage }
				<StatBar media_storage={vn_storage}>
					<button class="material-icons rounded-full hover:bg-indigo-700" on:click={() => menu = !menu}>more_vert</button>
				</StatBar>
				<MenuBar show={menu} media_storage={vn_storage}>
					<MenuOption media_storage={vn_storage} id="font" description="Font" type="text" value="Klee One" root_css="--default-font"/>
					<MenuOption media_storage={vn_storage} id="font_size" description="Font Size" units="rem" value=2 root_css="--default-font-size"/>
					<MenuOption media_storage={vn_storage} id="bottom_line_padding" description="Bottom Pushback" units="%" value=20 root_css="--default-text-align"/>
					<MenuOption media_storage={vn_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=60/>
					<MenuOption media_storage={vn_storage} id="max_loaded_lines" description="Max Loaded Lines" units="UI" value=5000/>
					<MenuOption media_storage={vn_storage} id="inactivity_blur" description="Inactivity Blur" units="px" value=2/>
					<MenuOption media_storage={vn_storage} id="menu_blur" description="Menu Blur" units="px" value=8 root_css="--default-menu-blur"/>

					<button id="export_stats" class="menu-button" on:click={exportStats}>Export Stats</button>
					<button id="export_lines" class="menu-button" on:click={requestExportLines}>Export Lines</button>
					<button class="menu-button" on:click="{() => document.getElementById('import_stats').click()}">
						Import Stats
						<input id="import_stats" class="hidden" type="file" on:change={requestImportLines}>
					</button>
					<button id="view_stats" class="menu-button" on:click={openStats}>View Stats</button>
				</MenuBar>
			{/await}
		</div>
		<button id="delete-selection" class="material-icons delete-button" on:click={deleteLines}>delete</button>
	</div>
	
	<LineHolder bind:lines={lines} on:click={() => menu = false } on:dblclick={userActive}/>
</body>
