<script lang="ts">
    import { select } from "d3-selection"
    import { axisTop, axisRight, axisBottom, axisLeft } from "@d3fc/d3fc-axis"

    export let scale
    
    export let height, width, margin
    export let position: "top" | "right" | "bottom" | "left"
    export let formater

    export let label = ""
    
    let axis
    let transform = "0,0"

    const positionedAxis = (scale: Function) => {
        if (position === "top") {
            return axisTop(scale)
        }
        else if (position == "right") {
            return axisRight(scale)
        }
        else if (position === "bottom") {
            return axisBottom(scale)
        }
        else if (position == "left") {
            return axisLeft(scale)
        }
    }

    const transitionAxis = () => {
        if (position === "top") {
            transform = `0,${margin}`
        }
        else if (position == "right") {
            transform = `${width - margin},0`
        }
        else if (position === "bottom") {
            transform = `0,${height - margin}`
        }
        else if (position == "left") {
            transform = `${margin},0`
        }
    }

    const enlargedScale = (): Function => {
        const axis_scale = scale.copy()
        const range = axis_scale.range()
        let excess

        // Find how much more room is physical range is available than was specified
        // NOTE: A margins worth of extra space is allowed at the start and end
        if (position === "bottom" || position === "top") {
            excess = width - margin * 2 - (range[1] - range[0])
        }
        else if (position == "left" || position == "right") {
            excess = height - margin * 2 - (range[1] - range[0])
        }

        // Find the positions in the domain these uncovered extremes would have mapped to
        const extended_range = [range[0] - excess / 2, range[1] + excess / 2]
        const extended_domain = [axis_scale.invert(extended_range[0]), axis_scale.invert(extended_range[1])]

        // Modify the domain and range to cover the full available section
        return axis_scale.domain(extended_domain).range(extended_range).nice()
    }

    const setupAxis = () => {
        const axis_creator = positionedAxis(enlargedScale())
            .tickSizeOuter(0).tickSize(0)
            .tickCenterLabel(true)
            .tickFormat(formater)

        axis_creator(select(axis))
        transitionAxis()

        select(axis).select("path").style("stroke", "grey")
    }

    $: if (scale && height && width && margin && position && formater && axis)
        setupAxis()
</script>

<g color="grey" stroke="grey" fill="grey" bind:this={axis} transform="translate({transform})"/>
{#if position === "top"}
    <text x={(width + margin) / 2} y={30} fill="grey">{label}</text>
{:else if position === "right"}
    <text x={(height + margin) * -0.5} y={width - 10} fill="grey" transform="rotate(-90)">{label}</text>
{:else if position === "bottom"}
    <text x={(width + margin) / 2} y={height - margin + 45} fill="grey">{label}</text>
{:else if position === "left"}
    <text x={(height + margin) * -0.5} y={margin - 30} fill="grey" transform="rotate(-90)">{label}</text>
{/if}
