
<script lang="ts">
    import Scatterplot from "../components/charts/scatterplot.svelte"

    export let data

    export let name_accessor
    export let date_accessor
    export let chars_read_accessor
    export let time_read_accessor
    export let read_speed_accessor

    export let tooltip_accessors, tooltip_formatters
</script>

<div class="flex flex-col items-center h-full w-full p-20 gap-20">
    <Scatterplot
        data={data}
        x_accessor={date_accessor} y_accessor={read_speed_accessor}
        r_accessor={chars_read_accessor} c_accessor={name_accessor}
        {tooltip_accessors} {tooltip_formatters}
        graph_title="Immersion Gains" x_label="Date" y_label="Reading Speed"
    />
    <Scatterplot
        data={data}
        x_accessor={date_accessor} y_accessor={time_read_accessor}
        r_accessor={chars_read_accessor} c_accessor={name_accessor}
        {tooltip_accessors} {tooltip_formatters}
        graph_title="Immersion Quantity" x_label="Date" y_label="Time Read"
    />
</div>
