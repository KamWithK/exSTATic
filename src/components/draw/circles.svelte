<script lang="ts">
    import type { ScaleBand } from "d3";
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    export let data: DataEntry[]
    export let xGet: (d: DataEntry) => number | undefined, yGet: (d: DataEntry) => number | undefined, rGet: (d: DataEntry) => number | undefined, cGet: (d: DataEntry) => string
    export let x_scale: ScaleBand<string>, y_scale: ScaleBand<string>

    export let mouse_move: (event: MouseEvent) => void, mouse_out: () => void

    let ready: boolean = false
    $: ready = x_scale !== undefined && y_scale !== undefined
        && rGet !== undefined && cGet !== undefined

    // Forced refreshes on resize
    $: data = data, x_scale, y_scale
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#if ready}
    {#each data as d, i }
        <circle data-index={i}
            cx={xGet(d)} cy={yGet(d)} r={rGet(d)}
            fill={cGet(d)} fill-opacity=0.8 class="z-10"
            on:mousemove={mouse_move} on:mouseout={mouse_out}
        />
    {/each}
{/if}
