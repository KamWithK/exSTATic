<script lang="ts">
    import { line, curveMonotoneX } from "d3-shape"

    export let data
    export let x_get, y_get

    let line_path
    $: if (x_get && y_get) line_path = line()
        .curve(curveMonotoneX)
        .x(x_get).y(y_get)
        (data)
</script>

<path d={line_path} class="fill-transparent" style="stroke: grey;"/>
