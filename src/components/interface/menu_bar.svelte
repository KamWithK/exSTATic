<script lang="ts">
    import type { MediaStorage } from "../../storage/media_storage"
    import MenuOption from "./menu_option.svelte"

  interface Props {
    show?: boolean;
    media_storage: MediaStorage;
    children?: import('svelte').Snippet;
  }

  let { show = false, media_storage, children }: Props = $props();
</script>

<div class="{show ? "grid" : "hidden"} grid-rows-2 absolute z-50 left-0 right-0">
  {#if children}{@render children()}{:else}
    <MenuOption media_storage={media_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=60/>
    <MenuOption media_storage={media_storage} id="inactivity_blur" description="Inactivity Blur" units="px" value=2/>
    <MenuOption media_storage={media_storage} id="menu_blur" description="Menu Blur" units="px" value=8 root_css="--default-menu-blur"/>
  {/if}
</div>
