<script lang="ts">
  import type { DataEntry } from "../../data_wrangling/data_extraction";

  interface Props {
    data: Partial<DataEntry>[];
    xGet: (d: Partial<DataEntry>) => number | undefined;
    yGet: (d: Partial<DataEntry>) => number | undefined;
    hGet: (d: Partial<DataEntry>) => number | undefined;
    cGet: (d: Partial<DataEntry>) => string | number | undefined;
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
    bar_width,
    mouse_move,
    mouse_out,
  }: Props = $props();

  let ready: boolean = $derived(
    xGet !== undefined &&
      yGet !== undefined &&
      hGet !== undefined &&
      cGet !== undefined,
  );
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
      fill={cGet(d)?.toString()}
      fill-opacity="0.8"
      class="z-10"
      role="graphics-symbol"
      aria-roledescription="bar"
      onmousemove={mouse_move}
      onmouseout={mouse_out}
    />
  {/each}
{/if}
