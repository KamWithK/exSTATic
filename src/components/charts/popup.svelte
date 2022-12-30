<script lang="ts">
    import { timeFormat } from "d3-time-format"

    let show_popup = false
    let [popup_x, popup_y] = [0, 0]
    let [popup_name, popup_date, popout_color] = ["", "", ""]
    let popup_tooltips = {}
    
    export let data, groups, hues
    export let date_accessor, group_accessor, tooltip_accessors, tooltip_formatters

    Object.keys(tooltip_accessors).forEach(key => popup_tooltips[key] = "")

    export const mouse_move = event => {
        const index = event["target"].dataset.index

        popup_x = event.layerX
        popup_y = event.layerY
        
        popup_name = !!groups ? group_accessor(data[index]) : undefined
        popup_date = timeFormat("%d %B %Y")(date_accessor(data[index]))
        popout_color = hues === undefined
            ? group_accessor(data[index])
            : hues[groups.indexOf(group_accessor(data[index]))]

        Object.entries(tooltip_accessors).forEach(([key, value_accessor]: [string, Function]) => {
            popup_tooltips[key] = tooltip_formatters[key](value_accessor(data[index]))
        })

        show_popup = true
    }

    export const mouse_out = () => {
        if (window["chrome"] === undefined) show_popup = false
    }
</script>

<div id="popup" class="{show_popup ? "absolute" : "hidden"} p-3 z-50 pointer-events-none" style="left: {popup_x}px;top: {popup_y}px; background-color: {popout_color}">
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
