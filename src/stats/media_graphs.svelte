<script lang="ts">
    import BarGraph from "../components/charts/bargraph.svelte"

    export let data

    export let name_accessor
    export let chars_read_accessor
    export let time_read_accessor
    export let read_speed_accessor

    export let tooltip_accessors, tooltip_formatters
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
