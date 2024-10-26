<script lang="ts">
    import Axis from "../draw/axis.svelte"
    import Bars from "../draw/bars.svelte"
    import Popup, { type TooltipAccessors, type TooltipFormatters } from "./popup.svelte"
    import Legend from "../draw/legend.svelte"

    import { group } from "d3-array"
    import { format } from "d3-format"
    import { scaleLinear, scaleBand } from "d3-scale"
    import iwanthue from "iwanthue"
    import type { ScaleBand, ScaleLinear } from "d3-scale";
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    export let data: Partial<DataEntry>[]

    export let [xScaleType, yScaleType] = [scaleBand, scaleLinear]
    export let x_accessor: (d: Partial<DataEntry>) => string, y_accessor: (d: Partial<DataEntry>) => number
    export let c_accessor: (d: Partial<DataEntry>) => string

    export let tooltip_accessors: TooltipAccessors
    export let tooltip_formatters: TooltipFormatters

    export let graph_title: string
    export let x_label: string, y_label: string

    let groups: string[], hues: string[]
    $: groups = Array.from(group(data, c_accessor).keys()) as string[]
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

    let x_scale: ScaleBand<string>, xGet: (d: Partial<DataEntry>) => number
    let y_scale: ScaleLinear<number, number>, yGet: (d: Partial<DataEntry>) => number

    const cGet = (d: Partial<DataEntry>) => hues[groups.indexOf(c_accessor(d))]
    const hGet = (d: Partial<DataEntry>) => y_scale === undefined ? 0 : Math.max(0, height - margin - yGet(d)!)

    let bar_width = 0
    $: if (x_scale) bar_width = x_scale.bandwidth()

    const [x_formatter, y_formatter] = [(x_value: string) => x_value, format(".2s")]

    let mouse_move: (event: MouseEvent) => void, mouse_out: () => void
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row w-full h-full items-center">
        <svg height="100%" width="100%" class="max-h-[80vh]" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <Axis bind:get={xGet} bind:scale={x_scale} scaleType={xScaleType} {data} accessor={x_accessor} formatter={x_formatter} bind:range={x_range} label={x_label} bind:height bind:width {margin} position="bottom"/>
            <Axis bind:get={yGet} bind:scale={y_scale} scaleType={yScaleType} {data} accessor={y_accessor} formatter={y_formatter} bind:range={y_range} label={y_label} bind:height bind:width {margin} position="left"/>

            <Bars {data} {xGet} {yGet} {hGet} {cGet} {x_scale} {y_scale} {bar_width} {mouse_move} {mouse_out}/>
        </svg>

        <Legend {groups} {hues}/>

        <Popup {data} {groups} {hues} group_accessor={c_accessor} {tooltip_accessors} {tooltip_formatters} bind:mouse_move bind:mouse_out/>
    </figure>
</div>
