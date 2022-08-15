<script lang="ts">
    import { select } from "d3-selection"
    import { axisTop, axisRight, axisBottom, axisLeft } from "d3-axis"

    export let scale
    
    export let height, width, margin
    export let position: "top" | "right" | "bottom" | "left"
    export let formater

    export let label = ""
    
    let axis
    let transform = "0,0"

    const positionedAxis = () => {
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

    const setupAxis = () => {
        const axis_creator = positionedAxis()
            .tickSizeOuter(0).tickSize(0)
            .tickFormat(formater)

        axis_creator(select(axis))
        transitionAxis()
    }

    $: if (scale && height && width && margin && position && formater && axis)
        setupAxis()
</script>

<g color="grey" bind:this={axis} transform="translate({transform})"/>
{#if position === "top"}
    <text x={(width + margin) / 2} y={30} fill="grey">{label}</text>
{:else if position === "right"}
    <text x={(height + margin) * -0.5} y={width - 10} fill="grey" transform="rotate(-90)">{label}</text>
{:else if position === "bottom"}
    <text x={(width + margin) / 2} y={height - margin + 45} fill="grey">{label}</text>
{:else if position === "left"}
    <text x={(height + margin) * -0.5} y={margin - 30} fill="grey" transform="rotate(-90)">{label}</text>
{/if}
