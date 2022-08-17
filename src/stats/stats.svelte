<script lang="ts">
    import AccordionItem from "../components/accordion_item.svelte"
    import Scatterplot from "./scatterplot.svelte"

    import { group, rollup, sum } from "d3-array"
    import { parseISO } from "date-fns"

    const SECS_TO_HRS = 60 * 60

    export let data

    let display_group = undefined

    const uuid_groups = group(data, d => d.uuid)

    const time_read_per = rollup(data, v => sum(v, d => d.time_read / SECS_TO_HRS), d => d.uuid)
    const chars_read_per = rollup(data, v => sum(v, d => d.chars_read), d => d.uuid)
    const read_speed_per = rollup(data, v => sum(v, d => d.read_speed * SECS_TO_HRS), d => d.uuid)

    const tooltip_accessors = {
        "Chars Read": d => d.chars_read,
        "Time Read": d => d.time_read / SECS_TO_HRS,
        "Read Speed": d => Math.round(d.read_speed * SECS_TO_HRS),
    }

    const name_accessor = d => d.name
    const date_accessor = d => parseISO(d.date)
    const chars_read_accessor = d => d.chars_read
    const time_read_accessor = d => d.time_read / SECS_TO_HRS
    const read_speed_accessor = d => d.read_speed * SECS_TO_HRS
</script>

<div>
    <AccordionItem label="1 Week" bind:group={display_group}></AccordionItem>
    <AccordionItem label="1 Month" bind:group={display_group}></AccordionItem>
    <AccordionItem label="3 Months" bind:group={display_group}></AccordionItem>
    <AccordionItem label="6 Months" bind:group={display_group}></AccordionItem>
    <AccordionItem label="1 Year" bind:group={display_group}></AccordionItem>
    <AccordionItem label="All Time" bind:group={display_group}>
        <div class="flex flex-col h-full w-full absolute p-20 gap-20">
            <Scatterplot
                data={data}
                x_accessor={date_accessor} y_accessor={read_speed_accessor}
                r_accessor={chars_read_accessor} c_accessor={name_accessor}
                tooltip_accessors={tooltip_accessors}
                graph_title="Immersion Gains" x_label="Date" y_label="Reading Speed"
            />
            <Scatterplot
                data={data}
                x_accessor={date_accessor} y_accessor={time_read_accessor}
                r_accessor={chars_read_accessor} c_accessor={name_accessor}
                tooltip_accessors={tooltip_accessors}
                graph_title="Immersion Quantity" x_label="Date" y_label="Time Read"
            />
        
            <Scatterplot
                data={data}
                x_accessor={date_accessor} y_accessor={read_speed_accessor}
                c_accessor={name_accessor} radius={7} draw_line={true}
                tooltip_accessors={tooltip_accessors}
                graph_title="Immersion Gains" x_label="Date" y_label="Reading Speed"
            />
            <Scatterplot
                data={data}
                x_accessor={date_accessor} y_accessor={time_read_accessor}
                c_accessor={name_accessor} radius={7} draw_line={true}
                tooltip_accessors={tooltip_accessors}
                graph_title="Immersion Quantity" x_label="Date" y_label="Time Read"
            />
        </div>
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
