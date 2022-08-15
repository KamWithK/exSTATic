<script lang="ts">
    import { select } from "d3-selection"
    import { axisTop, axisRight, axisBottom, axisLeft } from "d3-axis"

    export let scale
    
    export let height, width, margin
    export let position: "top" | "right" | "bottom" | "left"
    export let formater
    
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
            transform = `0,${margin / 2}`
        }
        else if (position == "right") {
            transform = `${width - margin / 2},0`
        }
        else if (position === "bottom") {
            transform = `0,${height - margin / 2}`
        }
        else if (position == "left") {
            transform = `${margin / 2},0`
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
