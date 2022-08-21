<script lang="ts">
    export let data
    export let xGet, yGet, hGet, cGet
    export let bar_width

    export let mouse_move, mouse_out

    let ready: boolean = false
    $: ready = xGet !== undefined && yGet !== undefined
        && hGet !== undefined && cGet !== undefined
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#if ready}
    {#each data as d, i }
        <rect data-index={i}
            x={xGet(d)} y={yGet(d)} height={hGet(d)} width={bar_width}
            fill={cGet(d)} fill-opacity=0.8 class="z-10"
            on:mousemove={mouse_move} on:mouseout={mouse_out}
        />
    {/each}
{/if}
