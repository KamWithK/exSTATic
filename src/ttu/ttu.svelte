<script lang="ts">
  import type { TTUStorage } from "./ttu_storage.js"
  import StatBar from "../components/interface/stat_bar.svelte"

  export let ttu_storage: TTUStorage

  let shown = false

  // Open the bar with a small delay
  // To sync up with the default bar
  // To avoid hide bar being called straight after
  const showBar = () => {
    setTimeout(() => { shown = true }, 300)
  }

  const hideBar = () => {
    shown = false
  }

  document.querySelector("button.fixed:nth-child(1)")
    .addEventListener("click", showBar)
  document.body.addEventListener("click", hideBar)

  document.body.addEventListener(
    "dblclick",
    ttu_storage.toggleActive.bind(ttu_storage)
  )

  document.addEventListener("status_active", () => {
    document
      .querySelector<HTMLElement>(".book-content")
      .style.setProperty("filter", "")
  })

  document.addEventListener("status_inactive", () => {
    document
      .querySelector<HTMLElement>(".book-content")
      .style.setProperty("filter", "blur(2px)")
  })
</script>

{#if shown}
  <div class="h-12 w-min mx-auto flex-none top-0 items-end content-center" style="color: #afb3b9;">
    <StatBar media_storage={ttu_storage} show_lines={false}/>
  </div>
{/if}

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
