<script lang="ts">
  import LineAxis from "../draw/oriented_axis.svelte";
  import Bars from "../draw/bars.svelte";
  import Popup, {
    type TooltipAccessors,
    type TooltipFormatters,
  } from "./popup.svelte";
  import Legend from "../draw/legend.svelte";

  import { extent, group } from "d3-array";
  import { format } from "d3-format";
  import { scaleLinear, scaleBand } from "d3-scale";
  import iwanthue from "iwanthue";
  import type { DataEntry } from "../../data_wrangling/data_extraction";

  interface Props {
    data: Partial<DataEntry>[];
    x_accessor: (d: Partial<DataEntry>) => string;
    y_accessor: (d: Partial<DataEntry>) => number;
    c_accessor: (d: Partial<DataEntry>) => string;
    tooltip_accessors: TooltipAccessors;
    tooltip_formatters: TooltipFormatters;
    graph_title: string;
    x_label: string;
    y_label: string;
  }

  let {
    data,
    x_accessor,
    y_accessor,
    c_accessor,
    tooltip_accessors,
    tooltip_formatters,
    graph_title,
    x_label,
    y_label,
  }: Props = $props();

  let groups = $derived(Array.from(group(data, c_accessor).keys()));
  let hues = $derived(
    iwanthue(groups.length, {
      colorSpace: [0, 360, 0, 100, 50, 100],
      clustering: "force-vector",
      seed: "exSTATic!",
    }),
  );

  let [height, width, margin] = $state([1000, 1200, 50]);
  let safeHeight = $derived.by(() => {
    const minHeight = Math.max(height, 500);
    return minHeight > width ? width : minHeight;
  });
  let safeWidth = $derived(Math.max(width, 500));

  // Physical ranges shrink in proport to the maximal circle radius and padding
  let x_range = $derived([margin, safeWidth - margin]);
  let y_range = $derived([safeHeight - margin, margin]);

  // Map data (domains) onto physical scales (ranges)
  let x_scale = $derived(
    scaleBand().domain(data.map(x_accessor)).range(x_range),
  );
  let y_scale = $derived.by(() => {
    const scale_extent = y_accessor && extent(data, y_accessor);
    if (
      scale_extent &&
      scale_extent[0] !== undefined &&
      scale_extent[1] !== undefined
    ) {
      return scaleLinear().domain(scale_extent).range(y_range).nice();
    }
  });

  const xGet = (d: Partial<DataEntry>) => x_scale(x_accessor(d));
  const yGet = (d: Partial<DataEntry>) => y_scale && y_scale(y_accessor(d));
  const cGet = (d: Partial<DataEntry>) => hues[groups.indexOf(c_accessor(d))];
  const hGet = (d: Partial<DataEntry>) => {
    const yValue = yGet(d);
    if (!yValue) return;
    return Math.max(0, safeHeight - margin - yValue);
  };

  let bar_width = $derived(x_scale.bandwidth());

  const [x_formatter, y_formatter] = [
    (x_value: string) => x_value,
    format(".2s"),
  ];

  let mouse_move: (event: MouseEvent) => void = $state(() => {});
  let mouse_out: () => void = $state(() => {});
</script>

<div class="flex h-full w-full flex-col items-center bg-slate-900 p-12">
  <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

  <figure
    bind:clientHeight={height}
    bind:clientWidth={width}
    class="flex h-full w-full flex-row items-center"
  >
    <svg
      height="100%"
      width="100%"
      class="max-h-[80vh]"
      style="resize: both;"
      viewBox="0 0 {safeWidth} {safeHeight}"
      preserveAspectRatio="xMidYMid meet"
    >
      <LineAxis
        scale={x_scale}
        height={safeHeight}
        width={safeWidth}
        {margin}
        position="bottom"
        formatter={x_formatter}
        label={x_label}
      />
      <LineAxis
        scale={y_scale}
        height={safeHeight}
        width={safeWidth}
        {margin}
        position="left"
        formatter={y_formatter}
        label={y_label}
      />

      <Bars
        {data}
        {xGet}
        {yGet}
        {hGet}
        {cGet}
        {bar_width}
        {mouse_move}
        {mouse_out}
      />
    </svg>

    <Legend {groups} {hues} />

    <Popup
      {data}
      {groups}
      {hues}
      group_accessor={c_accessor}
      {tooltip_accessors}
      {tooltip_formatters}
      bind:mouse_move
      bind:mouse_out
    />
  </figure>
</div>
