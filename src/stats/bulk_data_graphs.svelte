
<script lang="ts">
    import Scatterplot from "../components/charts/scatterplot.svelte"
    import type { DataEntry } from "../data_wrangling/data_extraction";

    export let data: DataEntry[]

    export let name_accessor: (d: DataEntry) => string
    export let date_accessor: (d: DataEntry) => Date
    export let chars_read_accessor: (d: DataEntry) => number
    export let time_read_accessor: (d: DataEntry) => number
    export let read_speed_accessor: (d: DataEntry) => number

    export let tooltip_accessors: {
        "Chars Read": (d: DataEntry) => number;
        "Time Read": (d: DataEntry) => number;
        "Read Speed": (d: DataEntry) => number;
    }
    export let tooltip_formatters: {
        "Chars Read": (n: number | {
            valueOf(): number;
        }) => string;
        "Time Read": (t: number) => string;
        "Read Speed": (n: number | {
            valueOf(): number;
        }) => string;
    }
</script>

<div class="flex flex-col items-center h-full w-full gap-20">
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
