<script lang="ts">
    import { line, curveMonotoneX } from "d3-shape"

    export let data
    export let xGet, yGet
    export let x_scale, y_scale

    let line_path
    $: if (x_scale && y_scale) line_path = line()
        .curve(curveMonotoneX)
        .x(xGet).y(yGet)
        (data)
</script>

<path d={line_path} class="fill-transparent" style="stroke: grey;"/>
