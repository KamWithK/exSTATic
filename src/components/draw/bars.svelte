<script lang="ts">
    import type { ScaleBand } from "d3";
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    export let data: Partial<DataEntry>[]

    export let xGet: (d: Partial<DataEntry>) => number
    export let yGet: (d: Partial<DataEntry>) => number
    export let hGet: (d: Partial<DataEntry>) => number, cGet: (d: Partial<DataEntry>) => number
    export let x_scale: ScaleBand<string>, y_scale: ScaleBand<string>
    export let bar_width: number

    export let mouse_move: any, mouse_out: any

    let ready: boolean = false
    $: ready = xGet !== undefined && yGet !== undefined
        && hGet !== undefined && cGet !== undefined,
        x_scale, y_scale

    // Forced refreshes on resize
    $: data = data, x_scale, y_scale
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#if ready}
    {#each data as d, i }
        <rect data-index={i}
            x={xGet(d)} y={yGet(d)} height={hGet(d)} width={bar_width}
            fill={cGet(d).toString()} fill-opacity=0.8 class="z-10"
            on:mousemove={mouse_move} on:mouseout={mouse_out}
        />
    {/each}
{/if}
