<script lang="ts">
  import { run } from "svelte/legacy";

  import type { ScaleLinear, ScaleTime } from "d3";
  import type { DataEntry } from "../../data_wrangling/data_extraction";

  interface Props {
    data: DataEntry[];
    xGet: (d: DataEntry) => number | undefined;
    yGet: (d: DataEntry) => number | undefined;
    rGet: (d: DataEntry) => number | undefined;
    cGet: (d: DataEntry) => string;
    x_scale: ScaleTime<number, number, never>;
    y_scale: ScaleLinear<number, number>;
    mouse_move: (event: MouseEvent) => void;
    mouse_out: () => void;
  }

  let {
    data = $bindable(),
    xGet,
    yGet,
    rGet,
    cGet,
    x_scale,
    y_scale,
    mouse_move,
    mouse_out,
  }: Props = $props();

  let ready: boolean = $state(false);
  run(() => {
    ready =
      x_scale !== undefined &&
      y_scale !== undefined &&
      rGet !== undefined &&
      cGet !== undefined;
  });

  // Forced refreshes on resize
  run(() => {
    (data = data), x_scale, y_scale;
  });
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
{#if ready}
  {#each data as d, i}
    <circle
      data-index={i}
      cx={xGet(d)}
      cy={yGet(d)}
      r={rGet(d)}
      fill={cGet(d)}
      fill-opacity="0.8"
      class="z-10"
      onmousemove={mouse_move}
      onmouseout={mouse_out}
    />
  {/each}
{/if}
