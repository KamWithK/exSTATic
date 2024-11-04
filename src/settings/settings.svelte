<script lang="ts">
	import MenuOption from "../components/interface/menu_option.svelte"
  import type { MokuroStorage } from "../mokuro/mokuro_storage";
  import type { TTUStorage } from "../ttu/ttu_storage";
  import { VNStorage } from "../vn/vn_storage";

  let type = $state("vn")

  interface Props {
    vn_storage: VNStorage;
    mokuro_storage: MokuroStorage;
    ttu_storage: TTUStorage;
  }

  let { vn_storage, mokuro_storage, ttu_storage }: Props = $props();
</script>

<div class="flex flex-col px-20 gap-10">
    <div id="top_bar" class="flex bg-button bg-opacity-80 z-50 h-20 sticky top-0 justify-center">
        <div class="flex flex-row gap-3 place-items-center">
            <p class="header-text">Settings</p>
            <select class="bg-button" bind:value={type}>
                <option value="vn">VN</option>
                <option value="mokuro">Mokuro</option>
                <option value="ttu">TTU</option>
            </select>
        </div>
    </div>
</div>

<div class="grid grid-cols-2 absolute p-5 z-50 left-0 right-0">
{#if type === "vn"}
  <MenuOption media_storage={vn_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=60/>
  <MenuOption media_storage={vn_storage} id="inactivity_blur" description="Inactivity Blur" units="px" value=2/>
  <MenuOption media_storage={vn_storage} id="menu_blur" description="Menu Blur" units="px" value=8 root_css="--default-menu-blur"/>
  <MenuOption media_storage={vn_storage} id="font" description="Font" type="text" value="Klee One" root_css="--default-font"/>
  <MenuOption media_storage={vn_storage} id="font_size" description="Font Size" units="rem" value=2 root_css="--default-font-size"/>
  <MenuOption media_storage={vn_storage} id="bottom_line_padding" description="Bottom Pushback" units="%" value=20 root_css="--default-text-align"/>
  <MenuOption media_storage={vn_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=60/>
  <MenuOption media_storage={vn_storage} id="max_loaded_lines" description="Max Loaded Lines" units="UI" value=5000/>
  <MenuOption media_storage={vn_storage} id="inactivity_blur" description="Inactivity Blur" units="px" value=2/>
  <MenuOption media_storage={vn_storage} id="menu_blur" description="Menu Blur" units="px" value=8 root_css="--default-menu-blur"/>
{:else if type === "mokuro"}
  <MenuOption media_storage={mokuro_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=120/>
{:else if type === "ttu"}
  <MenuOption media_storage={ttu_storage} id="afk_max_time" description="Max AFK Time" units="secs" value=120/>
{/if}
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

	body {
		@apply bg-slate-800;
	}

	.menu-input {
		@apply col-start-2 p-1 grow bg-menu text-menu-text;
	}

	.menu-label {
		@apply p-4 bg-block text-icon;
	}

  .header-text {
      @apply text-4xl items-center inline-flex;
  }

  .header-icon {
      @apply h-full hover:bg-hover hover:hover:text-icon;
  }
</style>
