<script lang="ts">
    import { line, curveMonotoneX } from "d3-shape"
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    export let data: Partial<DataEntry>[]
    export let xGet: any, yGet: any
    export let x_scale: any, y_scale: any

    let line_path: any
    $: if (x_scale && y_scale) line_path = line()
        .curve(curveMonotoneX)
        .x(xGet).y(yGet)
        (data)
</script>

<path d={line_path} class="fill-transparent" style="stroke: grey;"/>
