<script lang="ts">
    import { range, extent } from "d3-array"
    import { scaleLinear, scaleBand } from "d3-scale"

    import { getDay, getWeek } from "date-fns"
    import Bars from "../draw/bars.svelte"
    import Popup from "./popup.svelte"

    export let data

    export let date_accessor, metric_accessor
    export let tooltip_accessors, tooltip_formatters

    export let graph_title

    let [height, width, margin] = [1000, 1200, 10]
    $: if (height < 500) height = 500
    $: if (width < 500) width = 500
    $: if (height > width) height = width

    let square_width, square_height, min_square
    $: square_width = (width - 2 * margin) / 53
    $: square_height = (height - 2 * margin) / 7
    $: min_square = Math.min(square_width, square_height)

    let new_width, new_height
    $: new_width = min_square * 53
    $: new_height = min_square * 7

    // Physical ranges shrink in proport to the maximal circle radius and padding
    let [x_range, y_range]: [[number, number], [number, number]] = [[0, 0], [0, 0]]
    $: x_range = [margin, new_width - margin]
    $: y_range = [margin, new_height - margin]

    const xAccessor = d => {
        return getWeek(date_accessor(d))
    }
    const yAccessor = d => getDay(date_accessor(d))

    let x_scale, y_scale, colorScale
    $: x_scale = scaleBand()
        .domain(range(53))
        .padding(0.01 * (53 / 7))
        .range(x_range)
    $: y_scale = scaleBand()
        .domain(range(7))
        .padding(0.1)
        .range(y_range)
    $: colorScale = scaleLinear()
        .domain(extent(data, metric_accessor))
        .range(["#818cf8", "#4338ca"])

    const [xGet, yGet] = [d => x_scale(xAccessor(d)), d => y_scale(yAccessor(d))]
    const cGet = d => colorScale(metric_accessor(d))

    const dayCode = day_num => {
        if (day_num === 0) return "S"
        if (day_num === 1) return "M"
        if (day_num === 2) return "T"
        if (day_num === 3) return "W"
        if (day_num === 4) return "T"
        if (day_num === 5) return "F"
        if (day_num === 6) return "S"
    }

    let mouse_move, mouse_out
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row w-full h-full items-center justify-center">
        <svg height={new_height} width={new_width} class="max-h-[80vh]" style="resize: both;" viewBox="0 0 {new_width} {new_height}" preserveAspectRatio="xMidYMid meet">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            {#each range(53) as week_num}
                {#each range(7) as day_num}
                    <rect
                        x={x_scale(week_num)} y={y_scale(day_num)} height={y_scale.bandwidth()} width={x_scale.bandwidth()}
                        fill="silver" fill-opacity=0.1
                        stroke-width=3
                    />
                {/each}
            {/each}

            {#each range(7) as day_num}
                <text
                    y={y_scale(day_num) + y_scale.bandwidth() / 2}
                    height={y_scale.bandwidth()} width={x_scale.bandwidth()}
                    fill="white" class="text-[0.6rem]" dominant-baseline="middle"
                >
                    {dayCode(day_num)}
                </text>
            {/each}

            <Bars
                {data}
                {xGet} {yGet}
                hGet={() => y_scale.bandwidth()} {cGet}
                {x_scale} {y_scale} bar_width={x_scale.bandwidth()}
                {mouse_move} {mouse_out}
                border_width={3}
            />
        </svg>

        <Popup {data} groups={undefined} hues={undefined} {date_accessor} group_accessor={cGet} {tooltip_accessors} {tooltip_formatters} bind:mouse_move bind:mouse_out/>
    </figure>
</div>
