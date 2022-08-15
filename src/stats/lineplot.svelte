<script lang="ts">
    import { extent, group } from "d3-array";
    import { select } from "d3-selection"
    import { format } from "d3-format"
    import { timeFormat } from "d3-time-format"
    import { scaleLinear, scaleTime } from "d3-scale"
    import { axisLeft, axisBottom } from "d3-axis"
    import { line, curveNatural } from "d3-shape"
    import iwanthue from "iwanthue"

    export let data
    export let x_accessor
    export let y_accessor
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
    let x_scale, y_scale
    $: x_scale = scaleTime()
        .domain(extent(data, x_accessor))
        .range([margin, width - margin])
    $: y_scale = scaleLinear()
        .domain(extent(data, y_accessor))
        .range([height - margin, margin])

    let line_gen
    $: line_gen = line().curve(curveNatural)
        .x(d => x_scale(x_accessor(d)))
        .y(d => y_scale(y_accessor(d)))
        (data)

    let x_axis_creator, y_axis_creator
    $: x_axis_creator = axisBottom(x_scale)
        .tickSizeOuter(0).tickSize(0)
        .tickFormat(timeFormat("%B\n%Y"))
    $: y_axis_creator = axisLeft(y_scale)
        .tickSizeOuter(0).tickSize(0)
        .tickFormat(format(".2s"))

    let x_axis, y_axis
    $: if (x_axis) select(x_axis).call(x_axis_creator)
        .selectAll("text").attr("transform", "translate(0,3)")
    $: if (y_axis) select(y_axis).call(y_axis_creator)
        .selectAll("text").attr("transform", "translate(-3,0)")

    let mapped_data
    $: mapped_data = data.map((d, i) => ({
        "x": x_scale(x_accessor(d)),
        "y": y_scale(y_accessor(d)),
        "c": hues[groups.indexOf(c_accessor(d))],
        "i": i
    }))

    let popup_name = ""
    let popup_date = ""
    let popout_color = ""
    let [popup_x, popup_y] = [0, margin / 2]
    let show_popup = false

    let popup_tooltips = {}
    Object.keys(tooltip_accessors).forEach(key => popup_tooltips[key] = "")

    const mouse_over = event => {
        const index = event["target"].dataset.index
        
        popup_x = event.layerX
        popup_y = event.layerY

        popup_name = c_accessor(data[index])
        popup_date = timeFormat("%d %B %Y")(x_accessor(data[index]))
        popout_color = hues[groups.indexOf(c_accessor(data[index]))]

        Object.entries(tooltip_accessors).forEach(([key, value_accessor]: [string, Function]) => {
            popup_tooltips[key] = value_accessor(data[index])
        })

        show_popup = true
    }
    const mouse_out = () => {
        show_popup = false
    }
</script>

<div class="flex flex-col w-full h-full items-center p-12 bg-slate-900">
    <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

    <figure bind:clientHeight={height} bind:clientWidth={width} class="flex flex-row w-full h-full items-center">
        <p class="whitespace-nowrap -rotate-90 text-[#808080]">{y_label}</p>

        <svg height="100%" width="100%" style="resize: both;" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
            <g color="grey" bind:this={x_axis} transform="translate(0,{height - margin / 2})"/>
            <g color="grey" bind:this={y_axis} transform="translate({margin / 2},0)"/>

            <path d={line_gen} class="fill-transparent" style="stroke: grey;"/>

            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            {#each mapped_data as { x, y, c, i } }
                <circle data-index={i} cx={x} cy={y} r=5 fill={c} fill-opacity=0.8 class="z-10" on:mousemove={mouse_over} on:mouseout={mouse_out}/>
            {/each}
        </svg>
    
        <div class="flex flex-col">
            {#each groups as group, index}
                <div class="flex flex-row gap-1 items-center">
                    <div class="z-50 w-3 h-3 rounded-full" style="background-color: {hues[index]};"/>
                    <p class="text-[#808080]">{group}</p>
                </div>
            {/each}
        </div>

        <div id="popup" class="{show_popup ? "absolute" : "hidden"} p-3" style="left: {popup_x}px;top: {popup_y}px; background-color: {popout_color}">
            <p id="popup_title" class="font-semibold">{popup_name}</p>
            <p id="popup_date">{popup_date}</p>

            <br>

            {#each Object.keys(tooltip_accessors) as tooltip}
                <p>{tooltip} - {popup_tooltips[tooltip]}</p>
            {/each}
        </div>
    </figure>
    <p class="text-[#808080]">{x_label}</p>
</div>
