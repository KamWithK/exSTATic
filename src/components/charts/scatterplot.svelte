<!-- @migration-task Error while migrating Svelte code: Encountered an export declaration pattern that is not supported for automigration. -->
<script lang="ts">
    import LineAxis from "../draw/oriented_axis.svelte"
    import Circles from "../draw/circles.svelte"
    import Popup, { type TooltipAccessors, type TooltipFormatters } from "./popup.svelte"
    import Legend from "../draw/legend.svelte"

    import { extent, group } from "d3-array"
    import { format } from "d3-format"
    import { timeFormat } from "d3-time-format"
    import { scaleLinear, scaleTime } from "d3-scale"
    import iwanthue from "iwanthue"
    import type { DataEntry } from "../../data_wrangling/data_extraction";
    import type { ScaleLinear, ScaleTime } from "d3";

    export let data: DataEntry[]
    export let radius = 60

    export let [xScaleType, yScaleType, rScaleType] = [scaleTime, scaleLinear, scaleLinear]
    export let x_accessor: (d: Partial<DataEntry>) => Date, y_accessor: (d: DataEntry) => number
    export let r_accessor: ((d: Partial<DataEntry>) => number) | undefined, c_accessor: (d: Partial<DataEntry>) => string

    export let tooltip_accessors: TooltipAccessors
    export let tooltip_formatters: TooltipFormatters

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

    let x_scale: ScaleTime<number, number, never>
    let y_scale: ScaleLinear<number, number, never>
    let r_scale: ScaleLinear<number, number, never> | undefined

    // Map data (domains) onto physical scales (ranges)
    // Several of these functions can return undefined
    // Lift those up
    $: {
        const scale_extent = x_accessor && extent(data, x_accessor)
        if (scale_extent && scale_extent[0] !== undefined && scale_extent[1] !== undefined) {
            x_scale = scaleTime().domain(scale_extent).range(x_range).nice()
        }
    }
    $: {
        const scale_extent = y_accessor && extent(data, y_accessor)
        if (scale_extent && scale_extent[0] !== undefined && scale_extent[1] !== undefined) {
            y_scale = scaleLinear().domain(scale_extent).range(y_range).nice()
        }
    }
    $: {
        const scale_extent = r_accessor && extent(data, r_accessor)
        if (scale_extent && scale_extent[0] !== undefined && scale_extent[1] !== undefined) {
            r_scale = rScaleType().domain(scale_extent).range([0, radius])
        }
    }

    const xGet = (d: Partial<DataEntry>) => x_scale(x_accessor(d))
    const yGet = (d: DataEntry) => y_scale(y_accessor(d))
    const rGet = (d: DataEntry) => r_accessor && r_scale && r_scale(r_accessor(d))
    const cGet = (d: DataEntry) => hues[groups.indexOf(c_accessor(d))]

    const [x_formatter, y_formatter] = [timeFormat("%B\n%Y"), format(".2s")]

    let mouse_move: (event: MouseEvent) => void, mouse_out: () => void
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row items-center w-full">
        <svg height="100%" width="100%" class="max-h-[80vh]" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <LineAxis
                bind:scale={x_scale} bind:height bind:width {margin}
                position="bottom" formatter={x_formatter} label={x_label}
            />
            <LineAxis
                bind:scale={y_scale} bind:height bind:width {margin}
                position="left" formatter={y_formatter} label={y_label}
            />

            <Circles {data} {xGet} {yGet} {rGet} {cGet} {x_scale} {y_scale} {mouse_move} {mouse_out}/>
        </svg>

        <Legend {groups} {hues}/>

        <Popup {data} {groups} {hues} date_accessor={x_accessor} group_accessor={c_accessor} {tooltip_accessors} {tooltip_formatters} bind:mouse_move bind:mouse_out/>
    </figure>
</div>
