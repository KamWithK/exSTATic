<script lang="ts">
    interface Props {
        groups: string[];
        hues: string[];
    }

    let { groups, hues }: Props = $props();
</script>

<div class="flex flex-col">
    {#each groups as group, index}
        <div class="flex flex-row gap-1 items-center">
            <div class="z-50 w-3 h-3 rounded-full shrink-0 grow-0" style="background-color: {hues[index]};"></div>
            <p class="text-[#808080]">{group}</p>
        </div>
    {/each}
</div>
