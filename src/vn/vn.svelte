<script lang="ts">
	import { timeToDateString } from "../calculations"
	import type { VNStorage } from "./vn_storage"
	import { exportLines, exportStats } from "../data_wrangling/data_export"
	import { importLines, importStats } from "../data_wrangling/data_import"
	import StatBar from "../components/interface/stat_bar.svelte"
	import MenuBar from "../components/interface/menu_bar.svelte"
	import MenuOption from "../components/interface/menu_option.svelte"
	import LineHolder from "../components/interface/line_holder.svelte"

	import { parse } from "papaparse"
	var browser = require("webextension-polyfill")

	export let vn_storage: VNStorage
	let title = "Game"
	let lines = []
	let menu = false

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
		document.title = title + " | exSTATic"
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

	const requestImportStats = event => {
        const confirmed = confirm(
            "Are you sure you'd like to import stats?\nThe imported stats will replace conflicting entries (i.e. on the same days for the same media)...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!"
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

	const requestImportLines = event => {
        const confirmed = confirm(
            "Are you sure you'd like to import lines?\n Please ensure that ALL stats are up to date beforehand (import if necessary).\nThe imported lines will be inserted after the current ones in storage...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!"
        )
    
        if (!confirmed) return

        parse(event["target"].files[0], {
            "header": true,
            "dynamicTyping": true,
            "complete": async result => {
                await importLines(result.data)
                alert("Finished importing lines successfully!\nPlease refresh all exSTATic pages now...")
            }
        })
    }

	const openStats = () => {
    	browser.runtime.sendMessage({
    	    "action": "open_tab",
    	    "url": "https://kamwithk.github.io/exSTATic/stats.html"
    	})
	}

	document.addEventListener("status_active", () => {
		document.documentElement.style.setProperty(
			"--default-inactivity-blur",
			"0"
		)
	})

	document.addEventListener("status_inactive", () => {
		document.documentElement.style.setProperty(
			"--default-inactivity-blur",
			vn_storage.properties["inactivity_blur"] + "px"
		)
	})

	const deleteLines = async () => {
		if (vn_storage.instance_storage === undefined) return

		const checked_boxes = Array.from(document.querySelectorAll(".line-select:checked"))

		if (checked_boxes.length === 0) return

		const plural = checked_boxes.length > 1 ? "lines" : "line"

		const confirmed = confirm(
			`Are you sure you'd like to delete ${checked_boxes.length} ${plural}?\nChar and line statistics will be modified accordingly however time read won't change...`
		)

		if (!confirmed) return

		const parents = checked_boxes.map(checkbox => checkbox.parentElement)
		const details = parents.map(element_div => [
			Number.parseInt(element_div.dataset.lineId),
			element_div.textContent,
			timeToDateString(Number.parseInt(element_div.dataset.time))
		])

		await vn_storage.deleteLines(details)
		parents.forEach(element_div => element_div.remove())
	}
</script>

<body class="flex flex-col h-full w-full">
	<div id="top_bar" class="flex z-50 h-20 px-12 sticky top-0 items-center justify-between">
		<input id="game_name" class="w-20 h-full shrink grow justify-self-start jp-text" type="text" bind:value={title}>
		<div class="relative">
			<StatBar media_storage={vn_storage}>
				<button class="material-icons rounded-full hover:bg-hover" on:click={() => menu = !menu}>more_vert</button>
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
					<input id="import_stats" class="hidden" type="file" on:change={requestImportStats}>
				</button>
				<button class="menu-button" on:click="{() => document.getElementById('import_lines').click()}">
					Import Lines
					<input id="import_lines" class="hidden" type="file" on:change={requestImportLines}>
				</button>
				<button id="view_stats" class="menu-button" on:click={openStats}>View Stats</button>
			</MenuBar>
		</div>
		<button id="delete-selection" class="material-icons delete-button" on:click={deleteLines}>delete</button>
	</div>

	<div class="px-12" on:dblclick={vn_storage.toggleActive.bind(vn_storage)}>
		<LineHolder bind:lines={lines} on:click={() => menu = false }/>
	</div>
</body>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

	input {
    	border-style: none;
	}

	body {
		@apply bg-backdrop;
	}

	.jp-text {
		font-family: var(--default-font);
		font-size: var(--default-font-size);
	}

	#top_bar {
		@apply py-3 bg-backdrop;
	}

	#game_name {
		@apply text-4xl bg-transparent text-title;
	}

	.entry_holder {
		@apply bg-backdrop;
	}

	.sentence-entry {
		@apply flex items-center bg-block jp-text p-4 gap-4;
		filter: blur(var(--default-inactivity-blur));
	}

	.sentence {
		@apply grow inline-block text-left text-text jp-text;
	}

	.delete-button {
		@apply self-center rounded-full inline-flex text-button-text border-indigo-500 p-2 hover:bg-hover hover:text-icon;
	}

	.line-select {
		@apply w-4 h-4 shrink-0 rounded-full text-button-text bg-button;
	}

	.stat-numbers {
		@apply font-mono text-base whitespace-nowrap;
	}

	.stat-annotation {
		@apply text-xs tracking-tighter whitespace-nowrap;
	}

	.menu-bar {
		@apply flex items-center h-full p-3 gap-3 bg-button bg-opacity-70 hover:filter-none hover:bg-opacity-80;
		filter: blur(var(--default-menu-blur));
	}

	.menu-button {
		@apply text-left col-span-2 p-4 bg-block text-icon hover:bg-hover;
	}

	.menu-input {
		@apply col-start-2 p-1 grow bg-menu text-menu-text;
	}

	.menu-label {
		@apply p-4 bg-block text-icon;
	}
</style>
