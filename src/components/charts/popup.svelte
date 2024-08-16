<script lang="ts">
    import { timeFormat } from "d3-time-format"
    import type { DataEntry } from "../../data_wrangling/data_extraction";

    let show_popup = false
    let [popup_x, popup_y] = [0, 0]
    let [popup_name, popup_date, popout_color] = ["", "", ""]
    let popup_tooltips: {[key: string]: string} = {}
    
    export let data: Partial<DataEntry>[], groups: string[] | undefined, hues: string[] | undefined
    export let date_accessor: ((d: Partial<DataEntry>) => Date) | undefined = undefined
    export let group_accessor: (d: Partial<DataEntry>) => string | number
    export let tooltip_accessors: {
        "Chars Read": (d: DataEntry) => number;
        "Time Read": (d: DataEntry) => number;
        "Read Speed": (d: DataEntry) => number;
    }
    export let tooltip_formatters: {
        "Chars Read": (n: number | {
            valueOf(): number;
        }) => string;
        "Time Read": (t: number) => string;
        "Read Speed": (n: number | {
            valueOf(): number;
        }) => string;
    }

    Object.keys(tooltip_accessors).forEach(key => popup_tooltips[key] = "")

    export const mouse_move = (event: Event) => {
        const index = event.target?.dataset.index

        popup_x = event.layerX
        popup_y = event.layerY
        
        popup_name = !!groups ? group_accessor(data[index]).toString() : ""
        popup_date = date_accessor ? timeFormat("%d %B %Y")(date_accessor(data[index])) : ""
        popout_color = hues === undefined
            ? group_accessor(data[index]).toString()
            : hues[groups!.indexOf(group_accessor(data[index]).toString())]

        Object.entries(tooltip_accessors).forEach(([key, value_accessor]: [string, Function]) => {
            popup_tooltips[key] = tooltip_formatters[key](value_accessor(data[index]))
        })

        show_popup = true
    }

    export const mouse_out = () => {
        show_popup = false
    }
</script>

<div id="popup" class="{show_popup ? "absolute" : "hidden"} p-3 z-50" style="left: {popup_x}px;top: {popup_y}px; background-color: {popout_color}; pointer-events: none">
    {#if popup_name !== undefined}
        <p id="popup_title" class="font-semibold">{popup_name}</p>
    {/if}
    {#if (popup_date !== undefined && popup_date !== "" && popup_date !== "NaN  0NaN")}
        <p id="popup_date">{popup_date}</p>
    {/if}

    <br>

    {#each Object.keys(tooltip_accessors) as tooltip}
        <p>{tooltip} - {popup_tooltips[tooltip]}</p>
    {/each}
</div>
