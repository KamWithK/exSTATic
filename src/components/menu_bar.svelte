<script lang="ts">
    import { MediaStorage } from "../storage/media_storage";
    import MenuOption from "./menu_option.svelte";

    export let show = false
    export let media_storage: MediaStorage
</script>

<div class="{show ? "grid" : "hidden"} grid-rows-2 absolute z-50 left-0 right-0">
  <slot>
    <MenuOption media_storage={media_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=60/>
    <MenuOption media_storage={media_storage} id="inactivity_blur" description="Inactivity Blur" units="px" value=2/>
    <MenuOption media_storage={media_storage} id="menu_blur" description="Menu Blur" units="px" value=8 root_css="--default-menu-blur"/>
  </slot>
</div>
