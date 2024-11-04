<script module lang="ts">
  export type TooltipKey = "Chars Read" | "Time Read" | "Read Speed";
  export type TooltipAccessors = Record<
    TooltipKey,
    (d: Partial<DataEntry>) => number
  >;
  export type TooltipFormatters = Record<
    TooltipKey,
    (
      n:
        | number
        | {
            valueOf(): number;
          },
    ) => string
  >;
</script>

<script lang="ts">
  import { timeFormat } from "d3-time-format";
  import type { DataEntry } from "../../data_wrangling/data_extraction";

  let show_popup = $state(false);
  let [popup_x, popup_y] = $state([0, 0]);
  let [popup_name, popup_date, popout_color] = $state(["", "", ""]);
  let popup_tooltips: { [key: string]: string } = $state({});

  interface Props {
    data: Partial<DataEntry>[];
    groups: string[] | undefined;
    hues: string[] | undefined;
    date_accessor?: ((d: Partial<DataEntry>) => Date) | undefined;
    group_accessor: (d: Partial<DataEntry>) => string | number;
    tooltip_accessors: TooltipAccessors;
    tooltip_formatters: TooltipFormatters;
  }

  let {
    data,
    groups,
    hues,
    date_accessor = undefined,
    group_accessor,
    tooltip_accessors,
    tooltip_formatters,
  }: Props = $props();

  Object.keys(tooltip_accessors).forEach((key) => (popup_tooltips[key] = ""));

  export const mouse_move = (event: MouseEvent) => {
    const index = Number(
      (event.target as HTMLCanvasElement).getAttribute("data-index"),
    );
    const data_entry = data[index];

    popup_x = event.layerX;
    popup_y = event.layerY;

    popup_name = !!groups ? group_accessor(data_entry).toString() : "";
    popup_date = date_accessor
      ? timeFormat("%d %B %Y")(date_accessor(data_entry))
      : "";
    popout_color =
      hues === undefined
        ? group_accessor(data_entry).toString()
        : hues[groups!.indexOf(group_accessor(data_entry).toString())];

    Object.entries(tooltip_accessors).forEach(([key, value_accessor]) => {
      popup_tooltips[key] = tooltip_formatters[key as TooltipKey](
        value_accessor(data_entry),
      );
    });

    show_popup = true;
  };

  export const mouse_out = () => {
    show_popup = false;
  };
</script>

<div
  id="popup"
  class="{show_popup ? 'absolute' : 'hidden'} z-50 p-3"
  style="left: {popup_x}px;top: {popup_y}px; background-color: {popout_color}; pointer-events: none"
>
  {#if popup_name !== undefined}
    <p id="popup_title" class="font-semibold">{popup_name}</p>
  {/if}
  {#if popup_date !== undefined && popup_date !== "" && popup_date !== "NaN  0NaN"}
    <p id="popup_date">{popup_date}</p>
  {/if}

  <br />

  {#each Object.keys(tooltip_accessors) as tooltip}
    <p>{tooltip} - {popup_tooltips[tooltip]}</p>
  {/each}
</div>
