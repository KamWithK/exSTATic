<script lang="ts">
    import Line from "./line.svelte"
    
    import { onMount } from "svelte"

    export let lines
    let entry_holder

    const observer = new MutationObserver(() => {
        entry_holder.scrollTo(0, entry_holder.scrollHeight)
    })

    onMount(() => observer.observe(entry_holder, {"childList": true, "subtree": true}))
</script>

<div id="entry_holder" bind:this={entry_holder} class="flex flex-col w-full -h-full flex-grow overflow-auto gap-2" style="padding-bottom: var(--default-text-align)" on:click on:dblclick>
    {#each lines as [_, id, line, time]}
        <Line id={id} time={time} sentence={line}/>
    {/each}
</div>
