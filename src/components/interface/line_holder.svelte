<script lang="ts">
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  import Line from "./line.svelte";

  import { onMount } from "svelte";

  interface Props {
    lines: string[][];
  }

  let { lines }: Props = $props();
  let entry_holder: HTMLElement = $state();

  const observer = new MutationObserver(() => {
    window.scrollTo(0, entry_holder.scrollHeight);
  });

  onMount(() =>
    observer.observe(entry_holder, { childList: true, subtree: true }),
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  id="entry_holder"
  bind:this={entry_holder}
  onclick={bubble("click")}
  ondblclick={bubble("dblclick")}
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
