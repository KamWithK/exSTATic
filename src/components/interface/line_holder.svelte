<script lang="ts">
    import Line from "./line.svelte"
    
    import { onMount } from "svelte"

    export let lines: string[][]
    let entry_holder: HTMLElement

    const observer = new MutationObserver(() => {
        window.scrollTo(0, entry_holder.scrollHeight)
    })

    onMount(() => observer.observe(entry_holder, {"childList": true, "subtree": true}))
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="entry_holder" bind:this={entry_holder} on:click on:dblclick>
    {#each lines as [_, id, line, time]}
        <Line id={id} time={time} sentence={line}/>
    {/each}
</div>

<style lang="postcss">
    #entry_holder {
        @apply flex flex-col w-full h-full gap-2;
        padding-bottom: var(--default-text-align);
    }
</style>
