<script lang="ts">
  import { run } from "svelte/legacy";

  import type { ScaleBand, ScaleLinear } from "d3";
  import type { DataEntry } from "../../data_wrangling/data_extraction";

  interface Props {
    data: Partial<DataEntry>[];
    xGet: (d: Partial<DataEntry>) => number | undefined;
    yGet: (d: Partial<DataEntry>) => number;
    hGet: (d: Partial<DataEntry>) => number;
    cGet: (d: Partial<DataEntry>) => string | number;
    x_scale: ScaleBand<string>;
    y_scale: ScaleLinear<number, number>;
    bar_width: number;
    mouse_move: (event: MouseEvent) => void;
    mouse_out: () => void;
  }

  let {
    data = $bindable(),
    xGet,
    yGet,
    hGet,
    cGet,
    x_scale,
    y_scale,
    bar_width,
    mouse_move,
    mouse_out,
  }: Props = $props();

  let ready: boolean = $state(false);
  run(() => {
    (ready =
      xGet !== undefined &&
      yGet !== undefined &&
      hGet !== undefined &&
      cGet !== undefined),
      x_scale,
      y_scale;
  });

  // Forced refreshes on resize
  run(() => {
    (data = data), x_scale, y_scale;
  });
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
{#if ready}
  {#each data as d, i}
    <rect
      data-index={i}
      x={xGet(d)}
      y={yGet(d)}
      height={hGet(d)}
      width={bar_width}
      fill={cGet(d).toString()}
      fill-opacity="0.8"
      class="z-10"
      onmousemove={mouse_move}
      onmouseout={mouse_out}
    />
  {/each}
{/if}
