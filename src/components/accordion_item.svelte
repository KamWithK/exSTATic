<script lang="ts">
    export let label = ""
    export let name = "accordion"
    export let group = undefined

    let value
    let shown = false
    
    $: shown = (group === value)
    $: if (group === undefined && value !== undefined) group = value
</script>

<div class="flex flex-col">
    <label class="flex flex-row justify-between bg-slate-900 p-5 border-2 border-indigo-400">
        <input type="radio" class="hidden" bind:this={value} {name} {value} bind:group/>
        <p style="color: grey;">{label}</p>
        <span class="material-icons h-3 w-3" style="color: grey;">
            {shown ? "expand_less" : "expand_more"}
        </span>
    </label>

    {#if shown}
        <slot/>
    {/if}
</div>
