<script lang="ts">
    import AccordionItem from "../components/interface/accordion_item.svelte"
    import BulkDataGraphs from "./bulk_data_graphs.svelte"
    import MinDataGraphs from "./min_data_graphs.svelte"
    import MediaGraphs from "./media_graphs.svelte"

    import { groups, sum } from "d3-array"
    import { parseISO } from "date-fns"
    import { subWeeks, subMonths, subYears } from "date-fns"

    const SECS_TO_HRS = 60 * 60

    export let data

    let display_group = undefined

    let time_now = new Date()

    const afterTimePredicate = earliest => d => parseISO(d.date) >= earliest

    const one_week_data = data.filter(afterTimePredicate(subWeeks(time_now, 1)))
    const one_month_data = data.filter(afterTimePredicate(subMonths(time_now, 1)))
    const three_months_data = data.filter(afterTimePredicate(subMonths(time_now, 3)))
    const six_months_data = data.filter(afterTimePredicate(subMonths(time_now, 6)))
    const one_year_data = data.filter(afterTimePredicate(subYears(time_now, 1)))

    const uuid_groups = groups(data, d => d.uuid)
    const uuid_summary = uuid_groups.map(([, v]) => ({
        "name": v[0].name,
        "time_read": sum(v, d => d.time_read / SECS_TO_HRS),
        "chars_read": sum(v, d => d.chars_read),
        "read_speed": sum(v, d => d.read_speed * SECS_TO_HRS)
    }))

    const name_accessor = d => d.name
    const date_accessor = d => parseISO(d.date)
    const chars_read_accessor = d => d.chars_read
    const time_read_accessor = d => d.time_read / SECS_TO_HRS
    const read_speed_accessor = d => d.read_speed * SECS_TO_HRS

    const tooltip_accessors = {
        "Chars Read": chars_read_accessor,
        "Time Read": time_read_accessor,
        "Read Speed": read_speed_accessor,
    }
</script>

<div>
    <AccordionItem label="1 Week" bind:group={display_group}>
        <MinDataGraphs data={one_week_data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>

    <AccordionItem label="1 Month" bind:group={display_group}>
        <BulkDataGraphs data={one_month_data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>

    <AccordionItem label="3 Months" bind:group={display_group}>
        <BulkDataGraphs data={three_months_data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>

    <AccordionItem label="6 Months" bind:group={display_group}>
        <BulkDataGraphs data={six_months_data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>

    <AccordionItem label="1 Year" bind:group={display_group}>
        <BulkDataGraphs data={one_year_data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>

    <AccordionItem label="All Time" bind:group={display_group}>
        <BulkDataGraphs {data} {name_accessor} {date_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
        <MediaGraphs data={uuid_summary} {name_accessor} {chars_read_accessor} {time_read_accessor} {read_speed_accessor} {tooltip_accessors}/>
    </AccordionItem>
</div>


<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

	body {
		@apply dark:bg-slate-800;
	}
</style>
