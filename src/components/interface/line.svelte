<script lang="ts">
    export let id: string
    export let time: string
    export let sentence: string = ""
    export let checked: boolean = false
</script>

<div class="sentence-entry w-full" data-line-id={id} data-time={time}>
    <p class="sentence w-full">{sentence}</p>
    <input type="checkbox" class="line-select" bind:checked={checked}>
</div>
