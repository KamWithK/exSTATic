<script lang="ts">
    import BarGraph from "../components/charts/bargraph.svelte"
    import type { TooltipAccessors, TooltipFormatters } from "../components/charts/popup.svelte";
    import type { DataEntry } from "../data_wrangling/data_extraction";

    export let data: {
        name: string;
        time_read: number;
        chars_read: number;
    }[]

    export let name_accessor: (d: Partial<DataEntry>) => string
    export let chars_read_accessor: (d: Partial<DataEntry>) => number
    export let time_read_accessor: (d: Partial<DataEntry>) => number
    export let read_speed_accessor: (d: Partial<DataEntry>) => number

    export let tooltip_accessors: TooltipAccessors
    export let tooltip_formatters: TooltipFormatters
</script>

<div class="flex flex-col items-center h-full w-full gap-20">
    <BarGraph
        {data}
        x_accessor={name_accessor} y_accessor={chars_read_accessor}
        c_accessor={name_accessor}
        {tooltip_accessors} {tooltip_formatters}
        graph_title="Reading Chars Quantity" x_label="Name" y_label="Chars Read"
    />
    
    <BarGraph
        {data}
        x_accessor={name_accessor} y_accessor={time_read_accessor}
        c_accessor={name_accessor}
        {tooltip_accessors} {tooltip_formatters}
        graph_title="Reading Time Quantity" x_label="Name" y_label="Time Read"
    />
    
    <BarGraph
        {data}
        x_accessor={name_accessor} y_accessor={read_speed_accessor}
        c_accessor={name_accessor}
        {tooltip_accessors} {tooltip_formatters}
        graph_title="Reading Speed Improvement" x_label="Name" y_label="Read Pace"
    />
</div>
