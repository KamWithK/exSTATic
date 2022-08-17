
<script lang="ts">
    import Scatterplot from "../components/charts/scatterplot.svelte"

    export let data

    export let name_accessor
    export let date_accessor
    export let chars_read_accessor
    export let time_read_accessor
    export let read_speed_accessor

    export let tooltip_accessors

    const MAX_CIRCLE_RADIUS = 7
</script>

<div class="flex flex-col h-full w-full p-20 gap-20">
    <Scatterplot
        data={data}
        x_accessor={date_accessor} y_accessor={chars_read_accessor}
        c_accessor={name_accessor} radius={MAX_CIRCLE_RADIUS} draw_line={true}
        tooltip_accessors={tooltip_accessors}
        graph_title="Reading Chars Quantity" x_label="Date" y_label="Chars Read"
    />
    <Scatterplot
        data={data}
        x_accessor={date_accessor} y_accessor={time_read_accessor}
        c_accessor={name_accessor} radius={MAX_CIRCLE_RADIUS} draw_line={true}
        tooltip_accessors={tooltip_accessors}
        graph_title="Reading Time Quantity" x_label="Date" y_label="Time Read"
    />
    <Scatterplot
        data={data}
        x_accessor={date_accessor} y_accessor={read_speed_accessor}
        c_accessor={name_accessor} radius={MAX_CIRCLE_RADIUS} draw_line={true}
        tooltip_accessors={tooltip_accessors}
        graph_title="Reading Speed Gains" x_label="Date" y_label="Reading Speed"
    />
</div>
