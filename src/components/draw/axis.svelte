<script lang="ts">
    import LineAxis from "../draw/oriented_axis.svelte"

    import { extent } from "d3-array"
    import { scaleBand } from "d3-scale"
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    export let scaleType: any

    export let data: Partial<DataEntry>[]
    export let accessor: any
    export let formatter: (date: any) => string

    export let range: [number, number]

    export let label: string

    export let height: number, width: number, margin: number
    export let position: "top" | "right" | "bottom" | "left"

    // Map data (domains) onto physical scales (ranges)
    export let scale: any
    $: scale = scaleType()
        .domain(scaleType === scaleBand ? data.map(accessor) : extent(data, accessor))
        .range(range)
    $: if (scale.nice !== undefined) scale = scale.nice()

    export const get = (d: Partial<DataEntry>) => scale(accessor(d))
</script>

<LineAxis
    bind:scale={scale} bind:height bind:width {margin}
    {position} {formatter} {label}
/>
