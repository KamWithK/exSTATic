<script lang="ts">
    export let mapped_data
    export let bar_width
    export let mouse_move, mouse_out
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#each mapped_data as { x, y, h, c, i } }
    <rect data-index={i} x={x} y={y} height={h} width={bar_width} fill={c} fill-opacity=0.8 class="z-10" on:mousemove={mouse_move} on:mouseout={mouse_out}/>
{/each}
