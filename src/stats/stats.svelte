<script lang="ts">
    import BulkDataGraphs from "./bulk_data_graphs.svelte"
    import MediaGraphs from "./media_graphs.svelte"
    import CalendarHeatmap from "../components/charts/calendar_heatmap.svelte"

    import { groups, sum, mean, min } from "d3-array"
    import { format } from "d3-format"
    import { parseISO, startOfYear, endOfYear, addYears, subYears, getYear } from "date-fns"

    const SECS_TO_HRS = 60 * 60

    export let data

    const end_time = new Date()
    const start_time = min(data, d => parseISO(d.date))

    let [year_start, year_end] = [startOfYear(end_time), endOfYear(end_time)]
    let year
    year = getYear(year_start)

    const withinTimePredicate = (d) =>
        year_start <= parseISO(d.date) && parseISO(d.date) <= year_end

    let filtered, entries_exist
    $: filtered = data.filter(withinTimePredicate), year_start, year_end
    $: entries_exist = filtered.length >= 1

    const nextPeriod = () => {
        if (year_end < end_time) {
            year_start = addYears(year_start, 1)
            year_end = addYears(year_end, 1)
            year = getYear(year_start)
        } else {
            year_start = start_time,
            year_end = end_time
            year = "All Time"
        }
    }
    const previousPeriod = () => {
        if (year === "All Time") {
            [year_start, year_end] = [startOfYear(end_time), endOfYear(end_time)]
        }
        else if (year_start > start_time) {
            year_start = subYears(year_start, 1)
            year_end = subYears(year_end, 1)
        }
        year = getYear(year_start)
    }

    let uuid_groups, uuid_summary
    $: uuid_groups = groups(filtered, d => d.uuid)
    $: uuid_summary = uuid_groups.map(([, v]) => ({
        "name": v[0].name,
        "time_read": sum(v, d => d.time_read),
        "chars_read": sum(v, d => d.chars_read),
        "read_speed": mean(v, d => d.read_speed)
    }))

    let date_groups, date_summary
    $: date_groups = groups(filtered, d => d.date)
    $: date_summary = date_groups.map(([, v]) => ({
        "date": v[0].date,
        "time_read": sum(v, d => d.time_read),
        "chars_read": sum(v, d => d.chars_read),
        "read_speed": mean(v, d => d.read_speed)
    }))

    const name_accessor = d => d.name
    const date_accessor = d => parseISO(d.date)
    const chars_read_accessor = d => d.chars_read
    const time_read_accessor = d => d.time_read
    const read_speed_accessor = d => d.read_speed * SECS_TO_HRS

    const tooltip_accessors = {
        "Chars Read": chars_read_accessor,
        "Time Read": time_read_accessor,
        "Read Speed": read_speed_accessor,
    }

    const tooltip_formatters = {
        "Chars Read": format(",.0f"),
        "Time Read": (t) => {
            let minutes = Math.floor(t / 60)
            let hours = Math.floor(minutes / 60)
            return `${hours}h ${minutes % 60}m`
        },
        "Read Speed": format(",.0f")
    }
</script>

<div class="flex flex-col px-20 gap-10">
    <div id="top_bar" class="flex bg-button bg-opacity-80 z-50 h-20 sticky top-0 items-center justify-between">
        <button class="material-icons header-text header-icon" on:click={previousPeriod}>navigate_before</button>
        <p class="header-text">{year}</p>
        <button class="material-icons header-text header-icon" on:click={nextPeriod}>navigate_next</button>
    </div>

    {#if entries_exist}
        {#if year !== "All Time"}
            <CalendarHeatmap data={date_summary} {date_accessor} metric_accessor={time_read_accessor} graph_title="Streak" {tooltip_accessors} {tooltip_formatters}/>
        {/if}

        <BulkDataGraphs data={filtered} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors} {tooltip_formatters}/>
        <MediaGraphs data={uuid_summary} {name_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors} {tooltip_formatters}/>
    {/if}
</div>


<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

	body {
		@apply bg-slate-800;
	}

    .header-text {
        @apply text-4xl items-center inline-flex;
    }

    .header-icon {
        @apply h-full hover:bg-hover hover:hover:text-icon;
    }
</style>
