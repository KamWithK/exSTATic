<script lang="ts">
    export let groups, hues
</script>

<div class="flex flex-col">
    {#each groups as group, index}
        <div class="flex flex-row gap-1 items-center">
            <div class="z-50 w-3 h-3 rounded-full" style="background-color: {hues[index]};"/>
            <p class="text-[#808080]">{group}</p>
        </div>
    {/each}
</div>
