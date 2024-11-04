<script lang="ts">
  import { run } from "svelte/legacy";

  import BulkDataGraphs from "./bulk_data_graphs.svelte";
  import MediaGraphs from "./media_graphs.svelte";
  import CalendarHeatmap from "../components/charts/calendar_heatmap.svelte";

  import { groups, sum, min } from "d3-array";
  import { format } from "d3-format";
  import {
    parseISO,
    startOfYear,
    endOfYear,
    addYears,
    subYears,
    getYear,
  } from "date-fns";
  import type { DataEntry } from "../data_wrangling/data_extraction";
  import type { TooltipFormatters } from "../components/charts/popup.svelte";

  const SECS_TO_HRS = 60 * 60;

  interface Props {
    data: DataEntry[];
  }

  let { data = $bindable() }: Props = $props();

  let client_groups;
  client_groups = groups(data, (d) => JSON.stringify([d.uuid, d.date]));
  data = client_groups.map(([, v]) => ({
    uuid:
      v[0].type === "mokuro" ? JSON.parse(v[0].given_identifier)[0] : v[0].uuid,
    name:
      v[0].type === "mokuro" && v[0].name === v[0].given_identifier
        ? JSON.parse(v[0].given_identifier)[0]
        : v[0].name,
    given_identifier: v[0].given_identifier,
    type: v[0].type,
    date: v[0].date,
    time_read: sum(v, (d) => d.time_read),
    chars_read: sum(v, (d) => d.chars_read),
  }));

  const end_time = new Date();
  const start_time = min(data, (d) => parseISO(d.date)) ?? new Date();

  let [year_start, year_end] = $state([
    startOfYear(end_time),
    endOfYear(end_time),
  ]);
  let year: number | string = $state(getYear(year_start));
  let type = $state("all");

  const withinTimePredicate = (d: DataEntry) =>
    year_start <= parseISO(d.date) && parseISO(d.date) <= year_end;
  const typePredicate = (d: DataEntry) => type === "all" || d.type === type;

  let filtered: DataEntry[] = $state(),
    entries_exist: boolean = $derived(filtered.length >= 1);
  run(() => {
    (filtered = data.filter(withinTimePredicate).filter(typePredicate)),
      year_start,
      year_end,
      type;
  });

  const nextPeriod = () => {
    if (year_end < end_time) {
      year_start = addYears(year_start, 1);
      year_end = addYears(year_end, 1);
      year = getYear(year_start);
    } else {
      (year_start = start_time), (year_end = end_time);
      year = "All Time";
    }
  };
  const previousPeriod = () => {
    if (year === "All Time") {
      [year_start, year_end] = [startOfYear(end_time), endOfYear(end_time)];
    } else if (year_start > start_time) {
      year_start = subYears(year_start, 1);
      year_end = subYears(year_end, 1);
    }
    year = getYear(year_start);
  };

  let uuid_groups: [string, DataEntry[]][] = $derived(
      groups(filtered, (d) => d.uuid),
    ),
    uuid_summary: {
      name: string;
      time_read: number;
      chars_read: number;
    }[] = $derived(
      uuid_groups.map(([, v]) => ({
        name: v[0].name,
        time_read: sum(v, (d) => d.time_read),
        chars_read: sum(v, (d) => d.chars_read),
      })),
    );

  let date_groups: [string, DataEntry[]][] = $derived(
      groups(filtered, (d) => d.date),
    ),
    date_summary: {
      date: string;
      time_read: number;
      chars_read: number;
    }[] = $derived(
      date_groups.map(([, v]) => ({
        date: v[0].date,
        time_read: sum(v, (d) => d.time_read),
        chars_read: sum(v, (d) => d.chars_read),
      })),
    );

  const name_accessor = (d: Partial<DataEntry>) => d.name!;
  const date_accessor = (d: Partial<DataEntry>) => parseISO(d.date!);
  const chars_read_accessor = (d: Partial<DataEntry>) => d.chars_read!;
  const time_read_accessor = (d: Partial<DataEntry>) => d.time_read!;
  const read_speed_accessor = (d: Partial<DataEntry>) =>
    (d.chars_read! / d.time_read!) * SECS_TO_HRS;

  const tooltip_accessors = {
    "Chars Read": chars_read_accessor,
    "Time Read": time_read_accessor,
    "Read Speed": read_speed_accessor,
  };

  const tooltip_formatters: TooltipFormatters = {
    "Chars Read": format(",.0f"),
    "Time Read": (t) => {
      let minutes = Math.floor(t.valueOf() / 60);
      let hours = Math.floor(minutes / 60);
      return `${hours}h ${minutes % 60}m`;
    },
    "Read Speed": format(",.0f"),
  };
</script>

<div class="flex flex-col gap-10 px-20">
  <div
    id="top_bar"
    class="sticky top-0 z-50 flex h-20 items-center justify-between bg-button bg-opacity-80"
  >
    <button
      class="material-icons header-text header-icon"
      onclick={previousPeriod}>navigate_before</button
    >
    <div class="flex flex-row place-items-center gap-3">
      <p class="header-text">{year}</p>
      <select class="bg-button" bind:value={type}>
        <option value="all">All</option>
        <option value="vn">VN</option>
        <option value="mokuro">Mokuro</option>
        <option value="ttu">TTU</option>
      </select>
    </div>
    <button class="material-icons header-text header-icon" onclick={nextPeriod}
      >navigate_next</button
    >
  </div>

  {#if entries_exist}
    {#if year !== "All Time"}
      <CalendarHeatmap
        data={date_summary}
        {date_accessor}
        metric_accessor={time_read_accessor}
        graph_title="Streak"
        {tooltip_accessors}
        {tooltip_formatters}
      />
    {/if}

    <BulkDataGraphs
      data={filtered}
      {name_accessor}
      {date_accessor}
      {chars_read_accessor}
      {time_read_accessor}
      {read_speed_accessor}
      {tooltip_accessors}
      {tooltip_formatters}
    />
    <MediaGraphs
      data={uuid_summary}
      {name_accessor}
      {chars_read_accessor}
      {time_read_accessor}
      {read_speed_accessor}
      {tooltip_accessors}
      {tooltip_formatters}
    />
  {/if}
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-slate-800;
  }

  .header-text {
    @apply inline-flex items-center text-4xl;
  }

  .header-icon {
    @apply h-full hover:bg-hover hover:hover:text-icon;
  }
</style>
