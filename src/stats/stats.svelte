<script lang="ts">
    import {group, rollup, sum} from "d3-array"

    const SECS_TO_HRS = 60 * 60

    export let data

    const uuid_groups = group(data, d => d.uuid)

    const time_read_per = rollup(data, v => sum(v, d => d.time_read / SECS_TO_HRS), d => d.uuid)
    const chars_read_per = rollup(data, v => sum(v, d => d.chars_read), d => d.uuid)
    const read_speed_per = rollup(data, v => sum(v, d => d.read_speed * SECS_TO_HRS), d => d.uuid)
</script>

<div class="flex h-full w-full">
</div>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

	input {
    	border-style: none;
	}

	body {
		@apply dark:bg-slate-800;
	}

	.jp-text {
		font-family: var(--default-font);
		font-size: var(--default-font-size);
	}

	#top_bar {
		@apply py-3 bg-slate-800;
	}

	#game_name {
		@apply text-4xl bg-transparent text-indigo-400;
	}
</style>
