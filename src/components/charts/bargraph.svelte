<script lang="ts">
    import Axis from "../draw/axis.svelte"
    import Bars from "../draw/bars.svelte"
    import Popup from "./popup.svelte"
    import Legend from "../draw/legend.svelte"

    import { group } from "d3-array"
    import { format } from "d3-format"
    import { scaleLinear, scaleBand } from "d3-scale"
    import iwanthue from "iwanthue"

    export let data

    export let [xScaleType, yScaleType] = [scaleBand, scaleLinear]
    export let x_accessor, y_accessor
    export let c_accessor

    export let tooltip_accessors, tooltip_formatters

    export let graph_title
    export let x_label, y_label

    let groups, hues
    $: groups = Array.from(group(data, c_accessor).keys())
    $: hues = iwanthue(groups.length, {
        "colorSpace": [0, 360, 0, 100, 50, 100],
        "clustering": "force-vector",
        "seed": "exSTATic!"
    })

    let [height, width, margin] = [1000, 1200, 50]
    $: if (height < 500) height = 500
    $: if (width < 500) width = 500
    $: if (height > width) height = width

    // Physical ranges shrink in proport to the maximal circle radius and padding
    let [x_range, y_range]: [[number, number], [number, number]] = [[0, 0], [0, 0]]
    $: x_range = [margin, width - margin]
    $: y_range = [height - margin, margin]

    let x_scale, x_get
    let y_scale, y_get

    let bar_width = 0
    $: if (x_scale) bar_width = x_scale.bandwidth()

    let mapped_data
    $: mapped_data = data.map((d, i) => ({
        "x": x_scale === undefined ? 0 : x_get(d),
        "y": y_scale === undefined ? 0 : y_get(d),
        "h": y_scale === undefined ? 0 : Math.max(0, height - margin - y_get(d)),
        "c": hues[groups.indexOf(c_accessor(d))],
        "i": i
    }))

    const [x_formatter, y_formatter] = [x_value => x_value, format(".2s")]

    let mouse_move, mouse_out
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row w-full h-full items-center">
        <svg height="100%" width="100%" class="max-h-[80vh]" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <Axis bind:get={x_get} bind:scale={x_scale} scaleType={xScaleType} {data} accessor={x_accessor} formatter={x_formatter} bind:range={x_range} label={x_label} bind:height bind:width {margin} position="bottom"/>
            <Axis bind:get={y_get} bind:scale={y_scale} scaleType={yScaleType} {data} accessor={y_accessor} formatter={y_formatter} bind:range={y_range} label={y_label} bind:height bind:width {margin} position="left"/>

            <Bars {mapped_data} {bar_width} {mouse_move} {mouse_out}/>
        </svg>

        <Legend {groups} {hues}/>

        <Popup {data} {groups} {hues} {x_accessor} group_accessor={c_accessor} {tooltip_accessors} {tooltip_formatters} bind:mouse_move bind:mouse_out/>
    </figure>
</div>
