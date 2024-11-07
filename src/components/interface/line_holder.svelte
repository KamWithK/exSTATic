<script lang="ts">
  import Line from "./line.svelte";

  import { onMount } from "svelte";

  interface Props {
    lines: string[][];
    onclick: () => void;
    ondblclick: ((this: Window, ev: MouseEvent) => any) | null;
  }

  let { lines = $bindable(), onclick, ondblclick }: Props = $props();
  let entry_holder: HTMLElement | undefined = $state();

  const observer = new MutationObserver(() => {
    if (!entry_holder) return;
    window.scrollTo(0, entry_holder.scrollHeight);
  });

  onMount(() => {
    if (!entry_holder) return;
    observer.observe(entry_holder, { childList: true, subtree: true });
  });
</script>

<div
  id="entry_holder"
  bind:this={entry_holder}
  role="presentation"
  {onclick}
  {ondblclick}
>
  {#each lines as [_, id, line, time]}
    <Line {id} {time} sentence={line} />
  {/each}
</div>

<style lang="postcss">
  #entry_holder {
    @apply flex h-full w-full flex-col gap-2;
    padding-bottom: var(--default-text-align);
  }
</style>
