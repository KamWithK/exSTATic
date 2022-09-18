<script lang="ts">
    export let data
    export let xGet, yGet, rGet, cGet
    export let x_scale, y_scale

    export let mouse_move, mouse_out

    let ready: boolean = false
    $: ready = x_scale !== undefined && y_scale !== undefined
        && rGet !== undefined && cGet !== undefined

    // Forced refreshes on resize
    $: if (x_scale && y_scale) data = data
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
