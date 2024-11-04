<script lang="ts">
    import BarGraph from "../components/charts/bargraph.svelte"
    import type { TooltipAccessors, TooltipFormatters } from "../components/charts/popup.svelte";
    import type { DataEntry } from "../data_wrangling/data_extraction";



    interface Props {
        data: {
        name: string;
        time_read: number;
        chars_read: number;
    }[];
        name_accessor: (d: Partial<DataEntry>) => string;
        chars_read_accessor: (d: Partial<DataEntry>) => number;
        time_read_accessor: (d: Partial<DataEntry>) => number;
        read_speed_accessor: (d: Partial<DataEntry>) => number;
        tooltip_accessors: TooltipAccessors;
        tooltip_formatters: TooltipFormatters;
    }

    let {
        data,
        name_accessor,
        chars_read_accessor,
        time_read_accessor,
        read_speed_accessor,
        tooltip_accessors,
        tooltip_formatters
    }: Props = $props();
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
