<script lang="ts">
  interface Props {
    groups: string[];
    hues: string[];
  }

  let { groups, hues }: Props = $props();
</script>

<div class="flex flex-col">
  {#each groups as group, index}
    <div class="flex flex-row items-center gap-1">
      <div
        class="z-50 h-3 w-3 shrink-0 grow-0 rounded-full"
        style="background-color: {hues[index]};"
      ></div>
      <p class="text-[#808080]">{group}</p>
    </div>
  {/each}
</div>
