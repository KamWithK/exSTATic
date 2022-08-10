<script lang="ts">
    import "../external/tailwindcss.js"
    import StatBar from "../components/stat_bar.svelte"

    export let mokuro_storage
</script>

<div class="flex flex-col-reverse items-end content-center m-[5px]">
    <div class="h-10 grow rounded-[3px] z-50" style="background: var(--color1); box-shadow: 0px 0px 8px 0px var(--color3a);">
        <StatBar media_storage={mokuro_storage}/>
    </div>
</div>
