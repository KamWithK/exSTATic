<script lang="ts">
    import { line, curveMonotoneX } from "d3-shape"
    import type { DataEntry } from "../../data_wrangling/data_extraction";
    import type { ScaleBand } from "d3";

    export let data: Partial<DataEntry>[]
    export let xGet: (d: Partial<DataEntry>) => number, yGet: (d: Partial<DataEntry>) => number
    export let x_scale: ScaleBand<string>, y_scale: ScaleBand<string>

    let line_path: string | null
    $: line_path = line<Partial<DataEntry>>()
        .curve(curveMonotoneX)
        .x(xGet).y(yGet)
        (data), x_scale, y_scale
</script>

<path d={line_path} class="fill-transparent" style="stroke: grey;"/>
