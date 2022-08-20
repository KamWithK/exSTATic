<script lang="ts">
    import LineAxis from "../draw/oriented_axis.svelte"

    import { extent } from "d3-array"
    import { scaleBand } from "d3-scale"

    export let scaleType

    export let data
    export let accessor: Function
    export let formatter

    export let range: [number, number]

    export let label: string

    export let height: number, width: number, margin: number
    export let position: "top" | "right" | "bottom" | "left"

    // Map data (domains) onto physical scales (ranges)
    export let scale
    $: scale = scaleType()
        .domain(scaleType === scaleBand ? data.map(accessor) : extent(data, accessor))
        .range(range)

    export const get = (d: any) => scale(accessor(d))
</script>

<LineAxis
    bind:scale={scale} bind:height bind:width bind:margin
    bind:position bind:formatter bind:label
/>
