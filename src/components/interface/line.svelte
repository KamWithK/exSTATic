<script lang="ts">
  interface Props {
    id: string;
    time: string;
    sentence?: string;
    checked?: boolean;
  }

  let { id, time, sentence = "", checked = $bindable(false) }: Props = $props();
</script>

<div class="sentence-entry w-full" data-line-id={id} data-time={time}>
  <p class="sentence w-full">{sentence}</p>
  <input type="checkbox" class="line-select" bind:checked />
</div>
