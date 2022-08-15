<script lang="ts">
    import { line, curveMonotoneX } from "d3-shape"

    export let data
    export let x_accessor, y_accessor
    export let x_scale, y_scale

    const make_line = (x_accessor, y_accessor, x_scale, y_scale, data) => line()
        .curve(curveMonotoneX)
        .x(d => x_scale(x_accessor(d)))
        .y(d => y_scale(y_accessor(d)))
        (data)

    let line_path
    $: line_path = make_line(x_accessor, y_accessor, x_scale, y_scale, data)
</script>

<path d={line_path} class="fill-transparent" style="stroke: grey;"/>
