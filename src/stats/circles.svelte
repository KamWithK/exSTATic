<script lang="ts">
    export let mapped_data
    export let mouse_move, mouse_out
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#each mapped_data as { x, y, r, c, i } }
    <circle data-index={i} cx={x} cy={y} r={r} fill={c} fill-opacity=0.8 class="z-10" on:mousemove={mouse_move} on:mouseout={mouse_out}/>
{/each}
