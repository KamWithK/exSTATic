<script lang="ts">
    import LineAxis from "./line_axis.svelte"
    import Circles from "./circles.svelte"
    import Popup from "./popup.svelte"

    import { extent, group } from "d3-array"
    import { format } from "d3-format"
    import { timeFormat } from "d3-time-format"
    import { scaleLinear, scaleTime } from "d3-scale"
    import iwanthue from "iwanthue"

    export let data
    export let x_accessor
    export let y_accessor
    export let r_accessor
    export let c_accessor

    export let tooltip_accessors

    export let graph_title
    export let x_label
    export let y_label

    let groups, hues
    $: groups = Array.from(group(data, c_accessor).keys())
    $: hues = iwanthue(groups.length, {
        "colorSpace": [0, 360, 0, 100, 50, 100],
        "clustering": "force-vector",
        "seed": "exSTATic!"
    })

    let [height, width, radius] = [50, 100, 60]
    let margin = 2 * (radius + 10)

    // Map data (domains) onto physical scales (ranges)
    let x_scale, y_scale, r_scale
    $: x_scale = scaleTime()
        .domain(extent(data, x_accessor))
        .range([margin, width - margin])
    $: y_scale = scaleLinear()
        .domain(extent(data, y_accessor))
        .range([height - margin, margin])
    $: r_scale = scaleLinear()
        .domain(extent(data, r_accessor))
        .range([0, radius])

    const [x_formatter, y_formatter] = [timeFormat("%B\n%Y"), format(".2s")]

    let mapped_data
    $: mapped_data = data.map((d, i) => ({
        "x": x_scale(x_accessor(d)),
        "y": y_scale(y_accessor(d)),
        "r": r_scale(r_accessor(d)),
        "c": hues[groups.indexOf(c_accessor(d))],
        "i": i
    }))

    let mouse_move, mouse_out
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row w-full h-full items-center">
        <p class="whitespace-nowrap -rotate-90 text-[#808080]">{y_label}</p>

        <svg height="100%" width="100%" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <LineAxis bind:scale={x_scale} bind:height bind:width bind:margin position="bottom" formater={x_formatter}/>
            <LineAxis bind:scale={y_scale} bind:height bind:width bind:margin position="left" formater={y_formatter}/>

            <Circles {mapped_data} {mouse_move} {mouse_out}/>
        </svg>

        <div class="flex flex-col">
            {#each groups as group, index}
                <div class="flex flex-row gap-1 items-center">
                    <div class="z-50 w-3 h-3 rounded-full" style="background-color: {hues[index]};"/>
                    <p class="text-[#808080]">{group}</p>
                </div>
            {/each}
        </div>

        <Popup {data} {groups} {hues} {x_accessor} group_accessor={c_accessor} {tooltip_accessors} bind:mouse_move bind:mouse_out/>
    </figure>
    <p class="text-[#808080]">{x_label}</p>
</div>
