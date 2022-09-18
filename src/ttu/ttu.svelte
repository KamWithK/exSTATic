<script lang="ts">
  import type { TtuStorage } from "./ttu_storage.js";
  import StatBar from "../components/interface/stat_bar.svelte";

  export let ttu_storage: TtuStorage;

  document.body.addEventListener(
    "dblclick",
    ttu_storage.toggleActive.bind(ttu_storage)
  );

  document.addEventListener("status_active", () => {
    document
      .querySelector<HTMLElement>(".book-content")
      .style.setProperty("filter", "");
  });

  document.addEventListener("status_inactive", () => {
    document
      .querySelector<HTMLElement>(".book-content")
      .style.setProperty("filter", "blur(2px)");
  });
</script>

<div class="flex flex-col-reverse items-end content-center m-[5px]">
  <div
    class="h-10 grow rounded-[3px] z-50"
    style="background: var(--color1); box-shadow: 0px 0px 8px 0px var(--color3a);"
  >
    <StatBar media_storage={ttu_storage} />
  </div>
</div>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
