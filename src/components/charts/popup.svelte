<script lang="ts">
    import { timeFormat } from "d3-time-format"

    let show_popup = false
    let [popup_x, popup_y] = [0, 0]
    let [popup_name, popup_date, popout_color] = ["", "", ""]
    let popup_tooltips = {}
    
    export let data, groups, hues
    export let x_accessor, group_accessor, tooltip_accessors, tooltip_formatters

    Object.keys(tooltip_accessors).forEach(key => popup_tooltips[key] = "")

    export const mouse_move = event => {
        const index = event["target"].dataset.index

        popup_x = event.layerX
        popup_y = event.layerY

        popup_name = group_accessor(data[index])
        popup_date = timeFormat("%d %B %Y")(x_accessor(data[index]))
        popout_color = hues[groups.indexOf(group_accessor(data[index]))]

        Object.entries(tooltip_accessors).forEach(([key, value_accessor]: [string, Function]) => {
            popup_tooltips[key] = tooltip_formatters[key](value_accessor(data[index]))
        })

        show_popup = true
    }

    export const mouse_out = () => {
        show_popup = false
    }
</script>

<div id="popup" class="{show_popup ? "absolute" : "hidden"} p-3" style="left: {popup_x}px;top: {popup_y}px; background-color: {popout_color}">
    <p id="popup_title" class="font-semibold">{popup_name}</p>
    <p id="popup_date">{popup_date}</p>

    <br>

    {#each Object.keys(tooltip_accessors) as tooltip}
        <p>{tooltip} - {popup_tooltips[tooltip]}</p>
    {/each}
</div>
