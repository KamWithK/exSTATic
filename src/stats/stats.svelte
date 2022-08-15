<script lang="ts">
    import Scatterplot from "./scatterplot.svelte"
    import Lineplot from "./lineplot.svelte"

    import { group, rollup, sum } from "d3-array"
    import { parseISO } from "date-fns"

    const SECS_TO_HRS = 60 * 60

    export let data

    const uuid_groups = group(data, d => d.uuid)

    const time_read_per = rollup(data, v => sum(v, d => d.time_read / SECS_TO_HRS), d => d.uuid)
    const chars_read_per = rollup(data, v => sum(v, d => d.chars_read), d => d.uuid)
    const read_speed_per = rollup(data, v => sum(v, d => d.read_speed * SECS_TO_HRS), d => d.uuid)

    const tooltip_accessors = {
        "Chars Read": d => d.chars_read,
        "Time Read": d => d.time_read / SECS_TO_HRS,
        "Read Speed": d => Math.round(d.read_speed * SECS_TO_HRS),
    }
</script>

<div class="flex flex-col h-full w-full absolute p-20 gap-20">
    <Scatterplot
        data={data}
        x_accessor={d => parseISO(d.date)} y_accessor={d => d.read_speed * SECS_TO_HRS}
        r_accessor={d => d.chars_read} c_accessor={ d => d.name }
        tooltip_accessors={tooltip_accessors}
        graph_title="Immersion Gains" x_label="Date" y_label="Reading Speed"
    />
    <Scatterplot
        data={data}
        x_accessor={d => parseISO(d.date)} y_accessor={d => d.time_read / SECS_TO_HRS}
        r_accessor={d => d.chars_read} c_accessor={ d => d.name }
        tooltip_accessors={tooltip_accessors}
        graph_title="Immersion Quantity" x_label="Date" y_label="Time Read"
    />

    <Lineplot
        data={data}
        x_accessor={d => parseISO(d.date)} y_accessor={d => d.read_speed * SECS_TO_HRS}
        c_accessor={ d => d.name }
        tooltip_accessors={tooltip_accessors}
        graph_title="Immersion Gains" x_label="Date" y_label="Reading Speed"
    />
    <Lineplot
        data={data}
        x_accessor={d => parseISO(d.date)} y_accessor={d => d.time_read / SECS_TO_HRS}
        c_accessor={ d => d.name }
        tooltip_accessors={tooltip_accessors}
        graph_title="Immersion Quantity" x_label="Date" y_label="Time Read"
    />
</div>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

	body {
		@apply dark:bg-slate-800;
	}
</style>
