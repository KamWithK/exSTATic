<script lang="ts">
  import { run } from "svelte/legacy";

  import { select } from "d3-selection";
  import type { ScaleBand, ScaleLinear, ScaleTime } from "d3-scale";
  // @ts-ignore
  import {
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    axisLabelOffset,
  } from "@d3fc/d3fc-axis";

  interface Props {
    scale:
      | ScaleBand<string>
      | ScaleLinear<number, number>
      | ScaleTime<number, number>;
    height: number;
    width: number;
    margin: number;
    position: "top" | "right" | "bottom" | "left";
    formatter:
      | ((date: (x_value: string) => string) => string)
      | ((n: number | { valueOf(): number }) => string)
      | ((x_value: string) => string)
      | ((date: Date) => string);
    label?: string;
  }

  let {
    scale,
    height,
    width,
    margin,
    position,
    formatter,
    label = "",
  }: Props = $props();

  let axis: SVGGElement = $state();
  let transform = $state("0,0");

  const positionedAxis = (
    scale:
      | ScaleBand<string>
      | ScaleLinear<number, number>
      | ScaleTime<number, number>
      | undefined,
  ) => {
    if (position === "top") {
      return axisLabelOffset(axisTop(scale));
    } else if (position == "right") {
      return axisRight(scale);
    } else if (position === "bottom") {
      return axisLabelOffset(axisBottom(scale));
    } else if (position == "left") {
      return axisLeft(scale);
    }
  };

  const transitionAxis = () => {
    if (position === "top") {
      transform = `0,${margin}`;
    } else if (position == "right") {
      transform = `${width - margin},0`;
    } else if (position === "bottom") {
      transform = `0,${height - margin}`;
    } else if (position == "left") {
      transform = `${margin},0`;
    }
  };

  const enlargedScale = () => {
    const axis_scale = scale.copy();
    const range = axis_scale.range();
    let excess;

    if ("invert" in axis_scale === false) return;

    // Find how much more room is physical range is available than was specified
    // NOTE: A margins worth of extra space is allowed at the start and end
    if (position === "bottom" || position === "top") {
      excess = width - margin * 2 - (range[1] - range[0]);
    } else if (position == "left" || position == "right") {
      excess = height - margin * 2 - (range[1] - range[0]);
    }

    // Find the positions in the domain these uncovered extremes would have mapped to
    const extended_range = [range[0] - excess! / 2, range[1] + excess! / 2];
    const extended_domain = [
      axis_scale.invert(extended_range[0]),
      axis_scale.invert(extended_range[1]),
    ];

    const axis_extended = axis_scale.domain(extended_domain);

    if ("range" in axis_extended === false) return;

    // Modify the domain and range to cover the full available section
    return axis_extended.range(extended_range);
  };

  const setupAxis = () => {
    const axis_creator = positionedAxis(
      "invert" in scale ? enlargedScale() : scale,
    )
      .tickSizeOuter(0)
      .tickSize(0)
      .tickFormat(formatter);

    axis_creator(select(axis));
    transitionAxis();

    select(axis).select("path").style("stroke", "grey");
  };

  run(() => {
    if (height && width && margin && position && axis)
      setupAxis(), formatter, scale;
  });
</script>

<g
  color="grey"
  stroke="grey"
  fill="grey"
  bind:this={axis}
  transform="translate({transform})"
/>
{#if position === "top"}
  <text x={(width + margin) / 2} y={30} fill="grey">{label}</text>
{:else if position === "right"}
  <text
    x={(height + margin) * -0.5}
    y={width - 10}
    fill="grey"
    transform="rotate(-90)">{label}</text
  >
{:else if position === "bottom"}
  <text x={(width + margin) / 2} y={height - margin + 45} fill="grey"
    >{label}</text
  >
{:else if position === "left"}
  <text
    x={(height + margin) * -0.5}
    y={margin - 30}
    fill="grey"
    transform="rotate(-90)">{label}</text
  >
{/if}
