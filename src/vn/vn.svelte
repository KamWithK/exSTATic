<script lang="ts">
  import * as browser from "webextension-polyfill";
  import { timeToDateString } from "../calculations";
  import type { VNStorage } from "./vn_storage";
  import { exportLines, exportStats } from "../data_wrangling/data_export";
  import { importLines, importStats } from "../data_wrangling/data_import";
  import StatBar from "../components/interface/stat_bar.svelte";
  import MenuBar from "../components/interface/menu_bar.svelte";
  import MenuOption from "../components/interface/menu_option.svelte";
  import LineHolder from "../components/interface/line_holder.svelte";

  import { parse } from "papaparse";
  import type { DataEntry } from "../data_wrangling/data_extraction";

  interface Props {
    vn_storage: VNStorage;
  }

  let { vn_storage }: Props = $props();
  let title = $state("Game");
  let lines: string[][] = $state([]);
  let menu = $state(false);

  // Events for media being added/replaced
  document.addEventListener("media_changed", (event: CustomEvent) => {
    // Show name and title
    title = event.detail["name"];

    // Show lines
    lines = event.detail["lines"].sort(
      (
        first: [string, number, string, number],
        second: [string, number, string, number],
      ) => first[1] - second[1],
    );
  });

  document.addEventListener("new_line", (event) =>
    lines.push([
      vn_storage.uuid,
      event["detail"]["line_id"],
      event["detail"]["line"],
      event["detail"]["time"],
    ]),
  );

  // UI events
  const setTitle = (title: string) => {
    if (vn_storage == undefined || vn_storage.instance_storage == undefined)
      return;
    document.title = title + " | exSTATic";
    vn_storage.instance_storage.updateDetails({ name: title });
  };
  $effect(() => {
    setTitle(title);
  });

  const requestExportLines = async () => {
    const confirmed = confirm(
      "Are you sure you'd like to export lines?\nExporting large numbers of lines can take a long time, please wait and do not retry whilst the operation takes place...",
    );

    if (confirmed) {
      await exportLines();
    }
  };

  const requestImportStats = (event: Event) => {
    const confirmed = confirm(
      "Are you sure you'd like to import stats?\nThe imported stats will replace conflicting entries (i.e. on the same days for the same media)...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!",
    );

    if (!confirmed) return;

    parse((event.target as HTMLInputElement).files![0], {
      header: true,
      dynamicTyping: true,
      complete: async (result) => {
        await importStats(result.data as DataEntry[]);
        alert(
          "Finished importing stats successfully!\nPlease refresh all exSTATic pages now...",
        );
      },
    });
  };

  const requestImportLines = (event: Event) => {
    const confirmed = confirm(
      "Are you sure you'd like to import lines?\n Please ensure that ALL stats are up to date beforehand (import if necessary).\nThe imported lines will be inserted after the current ones in storage...\nIt is highly recommended to BACKUP (export) data regularly in case anything goes wrong (i.e. before importing)!",
    );

    if (!confirmed) return;

    parse((event.target as HTMLInputElement).files![0], {
      header: true,
      dynamicTyping: true,
      complete: async (result) => {
        await importLines(result.data as { [key: string]: string | number }[]);
        alert(
          "Finished importing lines successfully!\nPlease refresh all exSTATic pages now...",
        );
      },
    });
  };

  const openStats = () => {
    browser.runtime.sendMessage({
      action: "open_tab",
      url: "https://kamwithk.github.io/exSTATic/stats.html",
    });
  };

  document.addEventListener("status_active", () => {
    document.documentElement.style.setProperty(
      "--default-inactivity-blur",
      "0",
    );
  });

  document.addEventListener("status_inactive", () => {
    document.documentElement.style.setProperty(
      "--default-inactivity-blur",
      vn_storage.properties["inactivity_blur"] + "px",
    );
  });

  const deleteLines = async () => {
    if (vn_storage.instance_storage === undefined) return;

    const checked_boxes = Array.from(
      document.querySelectorAll(".line-select:checked"),
    );

    if (checked_boxes.length === 0) return;

    const plural = checked_boxes.length > 1 ? "lines" : "line";

    const confirmed = confirm(
      `Are you sure you'd like to delete ${checked_boxes.length} ${plural}?\nChar and line statistics will be modified accordingly however time read won't change...`,
    );

    if (!confirmed) return;

    const parents = checked_boxes.map((checkbox) => checkbox.parentElement);
    const details = parents.map((element_div) => [
      Number.parseInt(element_div?.dataset.lineId!),
      element_div?.textContent,
      timeToDateString(Number.parseInt(element_div?.dataset.time!)),
    ]);

    await vn_storage.deleteLines(details as [[number, string, string]]);
    parents.forEach((element_div) => element_div?.remove());
  };
</script>

<div
  id="top_bar"
  class="sticky top-0 z-50 flex h-20 items-center justify-between px-12"
>
  <input
    id="game_name"
    class="jp-text h-full w-20 shrink grow justify-self-start"
    type="text"
    bind:value={title}
  />
  <div class="relative">
    <StatBar media_storage={vn_storage}>
      <button
        class="material-icons rounded-full hover:bg-hover"
        onclick={() => (menu = !menu)}>more_vert</button
      >
    </StatBar>
    <MenuBar show={menu} media_storage={vn_storage}>
      <MenuOption
        media_storage={vn_storage}
        id="font"
        description="Font"
        type="text"
        value="Klee One"
        root_css="--default-font"
      />
      <MenuOption
        media_storage={vn_storage}
        id="font_size"
        description="Font Size"
        units="rem"
        value="2"
        root_css="--default-font-size"
      />
      <MenuOption
        media_storage={vn_storage}
        id="bottom_line_padding"
        description="Bottom Pushback"
        units="%"
        value="20"
        root_css="--default-text-align"
      />
      <MenuOption
        media_storage={vn_storage}
        id="afk_max_time"
        description="Max AFK Time"
        units="secs"
        value="60"
      />
      <MenuOption
        media_storage={vn_storage}
        id="max_loaded_lines"
        description="Max Loaded Lines"
        units="UI"
        value="5000"
      />
      <MenuOption
        media_storage={vn_storage}
        id="inactivity_blur"
        description="Inactivity Blur"
        units="px"
        value="2"
      />
      <MenuOption
        media_storage={vn_storage}
        id="menu_blur"
        description="Menu Blur"
        units="px"
        value="8"
        root_css="--default-menu-blur"
      />

      <button
        id="settings_page"
        class="menu-button"
        onclick={() =>
          window.open("https://kamwithk.github.io/exSTATic/settings.html")}
      >
        Settings
      </button>
      <button id="export_stats" class="menu-button" onclick={exportStats}
        >Export Stats</button
      >
      <button id="export_lines" class="menu-button" onclick={requestExportLines}
        >Export Lines</button
      >
      <button
        class="menu-button"
        onclick={() => document.getElementById("import_stats")?.click()}
      >
        Import Stats
        <input
          id="import_stats"
          class="hidden"
          type="file"
          onchange={requestImportStats}
        />
      </button>
      <button
        class="menu-button"
        onclick={() => document.getElementById("import_lines")?.click()}
      >
        Import Lines
        <input
          id="import_lines"
          class="hidden"
          type="file"
          onchange={requestImportLines}
        />
      </button>
      <button id="view_stats" class="menu-button" onclick={openStats}
        >View Stats</button
      >
    </MenuBar>
  </div>
  <button
    id="delete-selection"
    class="material-icons delete-button"
    onclick={deleteLines}>delete</button
  >
</div>

<div
  class="px-12"
  role="feed"
  ondblclick={vn_storage.toggleActive.bind(vn_storage)}
>
  <LineHolder
    bind:lines
    onclick={() => (menu = false)}
    on:dblclick
    {ondblclick}
  />
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  input {
    border-style: none;
  }

  body {
    @apply bg-backdrop;
  }

  .jp-text {
    font-family: var(--default-font);
    font-size: var(--default-font-size);
  }

  #top_bar {
    @apply bg-backdrop py-3;
  }

  #game_name {
    @apply bg-transparent text-4xl text-title;
  }

  .entry_holder {
    @apply bg-backdrop;
  }

  .sentence-entry {
    @apply jp-text flex items-center gap-4 bg-block p-4;
    filter: blur(var(--default-inactivity-blur));
  }

  .sentence {
    @apply jp-text inline-block grow text-left text-text;
  }

  .delete-button {
    @apply inline-flex self-center rounded-full border-indigo-500 p-2 text-button-text hover:bg-hover hover:text-icon;
  }

  .line-select {
    @apply h-4 w-4 shrink-0 rounded-full bg-button text-button-text;
  }

  .stat-numbers {
    @apply whitespace-nowrap font-mono text-base;
  }

  .stat-annotation {
    @apply whitespace-nowrap text-xs tracking-tighter;
  }

  .menu-bar {
    @apply flex h-full items-center gap-3 bg-button bg-opacity-70 p-3 hover:bg-opacity-80 hover:filter-none;
    filter: blur(var(--default-menu-blur));
  }

  .menu-button {
    @apply col-span-2 bg-block p-4 text-left text-icon hover:bg-hover;
  }

  .menu-input {
    @apply col-start-2 grow bg-menu p-1 text-menu-text;
  }

  .menu-label {
    @apply bg-block p-4 text-icon;
  }
</style>
