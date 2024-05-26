<script lang="ts">
    import Axis from "../draw/axis.svelte"
    import Circles from "../draw/circles.svelte"
    import Line from "../draw/line.svelte"
    import Popup from "./popup.svelte"
    import Legend from "../draw/legend.svelte"

    import { extent, group } from "d3-array"
    import { format } from "d3-format"
    import { timeFormat } from "d3-time-format"
    import { scaleLinear, scaleTime } from "d3-scale"
    import iwanthue from "iwanthue"
    import type { DataEntry } from "../../data_wrangling/data_extraction";
    import type { ScaleBand, ScaleLinear } from "d3";

    export let data: DataEntry[]
    export let radius = 60

    export let [xScaleType, yScaleType, rScaleType] = [scaleTime, scaleLinear, scaleLinear]
    export let x_accessor: (d: Partial<DataEntry>) => Date, y_accessor: (d: DataEntry) => number
    export let r_accessor: ((d: Partial<DataEntry>) => number) | undefined, c_accessor: (d: DataEntry) => string

    export let draw_line = false

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

    export let graph_title: string
    export let x_label: string, y_label: string

    let groups: string[], hues: string[]
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
    $: x_range = [radius + margin, width - radius - margin]
    $: y_range = [height - radius - margin, radius + margin]

    let r_scale: number[] & ScaleLinear<number, number, never>
    $: r_scale = rScaleType()
        .domain(extent(data, r_accessor))
        .range([0, radius])

    let x_scale: ScaleBand<string>, xGet: (d: DataEntry) => number | undefined
    let y_scale: ScaleBand<string>, yGet: (d: DataEntry) => number | undefined

    const rGet = (d: DataEntry) => r_accessor !== undefined ? r_scale(r_accessor(d)) : radius
    const cGet = (d: DataEntry) => hues[groups.indexOf(c_accessor(d))]

    const [x_formatter, y_formatter] = [timeFormat("%B\n%Y"), format(".2s")]

    let mouse_move: any, mouse_out: any
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row items-center w-full">
        <svg height="100%" width="100%" class="max-h-[80vh]" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <Axis bind:get={xGet} bind:scale={x_scale} scaleType={xScaleType} {data} accessor={x_accessor} formatter={x_formatter} bind:range={x_range} label={x_label} bind:height bind:width {margin} position="bottom"/>
            <Axis bind:get={yGet} bind:scale={y_scale} scaleType={yScaleType} {data} accessor={y_accessor} formatter={y_formatter} bind:range={y_range} label={y_label} bind:height bind:width {margin} position="left"/>

            <Circles {data} {xGet} {yGet} {rGet} {cGet} {x_scale} {y_scale} {mouse_move} {mouse_out}/>

            {#if draw_line}
                <Line {data} {xGet} {yGet} {x_scale} {y_scale}/>
            {/if}
        </svg>

        <Legend {groups} {hues}/>

        <Popup {data} {groups} {hues} date_accessor={x_accessor} group_accessor={c_accessor} {tooltip_accessors} {tooltip_formatters} bind:mouse_move bind:mouse_out/>
    </figure>
</div>
