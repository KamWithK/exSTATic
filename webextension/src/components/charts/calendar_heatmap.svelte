<script lang="ts">
  import { range, extent } from "d3-array";
  import { scaleLinear, scaleBand } from "d3-scale";

  import { getDay, getWeek } from "date-fns";
  import Bars from "../draw/bars.svelte";
  import Popup, {
    type TooltipAccessors,
    type TooltipFormatters,
  } from "./popup.svelte";
  import type { DataEntry } from "../../data_wrangling/data_extraction";
  import type { ScaleBand } from "d3";

  interface Props {
    data: Partial<DataEntry>[];
    date_accessor: (d: Partial<DataEntry>) => Date;
    metric_accessor: (d: Partial<DataEntry>) => number;
    tooltip_accessors: TooltipAccessors;
    tooltip_formatters: TooltipFormatters;
    graph_title: string;
  }

  let {
    data,
    date_accessor,
    metric_accessor,
    tooltip_accessors,
    tooltip_formatters,
    graph_title,
  }: Props = $props();

  let [height, width, margin] = $state([1000, 1200, 10]);
  let safeHeight = $derived.by(() => {
    const minHeight = Math.max(height, 500);
    return minHeight > width ? width : minHeight;
  });
  let safeWidth = $derived(Math.max(width, 500));

  let square_width = $derived((safeWidth - 2 * margin) / 53);
  let square_height = $derived((safeHeight - 2 * margin) / 7);
  let min_square = $derived(Math.min(square_width, square_height));

  let new_width = $derived(min_square * 53);
  let new_height = $derived(min_square * 7);

  // Physical ranges shrink in proport to the maximal circle radius and padding
  let x_range = $derived([margin, new_width - margin]);
  let y_range = $derived([margin, new_height - margin]);

  const xAccessor = (d: Partial<DataEntry>) => {
    return getWeek(date_accessor(d));
  };
  const yAccessor = (d: Partial<DataEntry>) => getDay(date_accessor(d));

  let x_scale: ScaleBand<string> = $derived(
    scaleBand()
      .domain(range(53).map(String))
      .padding(0.01 * (53 / 7))
      .range(x_range),
  );
  let y_scale: ScaleBand<string> = $derived(
    scaleBand().domain(range(7).map(String)).padding(0.1).range(y_range),
  );

  let colorScale = $derived.by(() => {
    const color_extent = extent(data, metric_accessor);
    return color_extent[0] !== undefined && color_extent[1] !== undefined
      ? scaleLinear<string>().domain(color_extent).range(["#818cf8", "#4338ca"])
      : undefined;
  });

  const [xGet, yGet] = [
    (d: Partial<DataEntry>) => x_scale(xAccessor(d).toString()),
    (d: Partial<DataEntry>) => y_scale(yAccessor(d).toString()),
  ];
  const cGet = (d: Partial<DataEntry>) =>
    colorScale && colorScale(metric_accessor(d));

  const dayCode = (day_num: number) => {
    if (day_num === 0) return "S";
    if (day_num === 1) return "M";
    if (day_num === 2) return "T";
    if (day_num === 3) return "W";
    if (day_num === 4) return "T";
    if (day_num === 5) return "F";
    if (day_num === 6) return "S";
  };

  let mouse_move: (event: MouseEvent) => void = $state(() => {});
  let mouse_out: () => void = $state(() => {});
</script>

<div class="flex h-full w-full flex-col items-center bg-slate-900 p-12">
  <h1 class="text-4xl font-semibold text-indigo-400">{graph_title}</h1>

  <figure
    bind:clientHeight={height}
    bind:clientWidth={width}
    class="flex h-full w-full flex-row items-center justify-center"
  >
    <svg
      height={new_height}
      width={new_width}
      class="max-h-[80vh]"
      style="resize: both;"
      viewBox="0 0 {new_width} {new_height}"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      {#each range(53) as week_num}
        {#each range(7) as day_num}
          <rect
            x={x_scale(week_num.toString())}
            y={y_scale(day_num.toString())}
            height={y_scale.bandwidth()}
            width={x_scale.bandwidth()}
            fill="silver"
            fill-opacity="0.1"
            stroke-width="3"
          />
        {/each}
      {/each}

      {#each range(7) as day_num}
        <text
          y={y_scale(day_num?.toString()) ?? "" + y_scale.bandwidth() / 2}
          height={y_scale.bandwidth()}
          width={x_scale.bandwidth()}
          fill="white"
          class="text-[0.6rem]"
          dominant-baseline="middle"
        >
          {dayCode(day_num)}
        </text>
      {/each}

      <Bars
        {data}
        {xGet}
        {yGet}
        hGet={() => y_scale.bandwidth()}
        {cGet}
        bar_width={x_scale.bandwidth()}
        {mouse_move}
        {mouse_out}
      />
    </svg>

    <Popup
      {data}
      groups={undefined}
      hues={undefined}
      {date_accessor}
      group_accessor={cGet}
      {tooltip_accessors}
      {tooltip_formatters}
      bind:mouse_move
      bind:mouse_out
    />
  </figure>
</div>
