console.log("Injected")

import { getData } from "./data_wrangling/data_extraction"
import { divideData, combineData, getSeries } from "./data_wrangling/data_processing"
import { subMonths } from "date-fns"
import Plotly from "plotly.js-dist-min"

let bg_color = window.getComputedStyle(document.getElementsByClassName("graph")[0])["background-color"]

function createCategoryGraph(element, data, title, y_title) {
    let layout = {
        "title": title,
        "xaxis": {
            "title": "Game",
        },
        "yaxis": {
            "title": y_title,
        },
        "barmode": "stack",
        "paper_bgcolor": bg_color,
        "plot_bgcolor": bg_color
    }

    return Plotly.newPlot(element, data, layout, {responsive: true})
}

function createDateGraph(element, data, title, x_min, y_title) {
    let rn = new Date()

    let layout = {
        "title": title,
        "xaxis": {
            "title": "Date",
            "range": [x_min, rn]
        },
        "yaxis": {
            "title": y_title,
        },
        "barmode": "stack",
        "paper_bgcolor": bg_color,
        "plot_bgcolor": bg_color
    }

    return Plotly.newPlot(element, data, layout, {responsive: true})
}

async function startup() {
    let game_json_data = await getData()
    let rn = new Date()

    let game_divided_data = divideData(game_json_data, "process_path")
    let game_combined_data = combineData(game_json_data, "process_path")

    let speed_improvement_bubble = getSeries(game_divided_data, "date", "read_speed", "chars_read", "markers", undefined)
    let quantity_improvement_bubble = getSeries(game_divided_data, "date", "time_read", "chars_read", "markers", undefined)
    let speed_improvement_bar = getSeries(game_divided_data, "date", "read_speed", undefined, undefined, "bar")
    let quantity_improvement_bar = getSeries(game_divided_data, "date", "time_read", undefined, undefined, "bar")
    let speed_improvement_line = getSeries(game_divided_data, "date", "read_speed", undefined, "lines", undefined)
    let quantity_improvement_line = getSeries(game_divided_data, "date", "time_read", undefined, "lines", undefined)

    let speed_per_game = getSeries([game_combined_data], "name", "read_speed", undefined, undefined, "bar")
    let time_per_game = getSeries([game_combined_data], "name", "time_read", undefined, undefined, "bar")
    let chars_per_game = getSeries([game_combined_data], "name", "chars_read", undefined, undefined, "bar")

    // One Month Progress Graphs
    createDateGraph(
        "speed_one_month",
        speed_improvement_bar,
        "Speed Improvement",
        subMonths(rn, 1),
        "Reading Speed (Chars per Hour)"
    )

    createDateGraph(
        "quantity_one_month",
        quantity_improvement_bar,
        "Immersion Quantity",
        subMonths(rn, 1),
        "Reading Time (Hours)"
    )

    // Six Month Progress Graphs
    createDateGraph(
        "speed_six_months",
        speed_improvement_line,
        "Speed Improvement",
        subMonths(rn, 6),
        "Reading Speed (Chars per Hour)"
    )

    createDateGraph(
        "quantity_six_months",
        quantity_improvement_line,
        "Immersion Quantity",
        subMonths(rn, 6),
        "Reading Time (Hours)"
    )

    // One Year Progress Graphs
    createDateGraph(
        "speed_twelve_months",
        speed_improvement_bubble,
        "Speed Improvement",
        subMonths(rn, 12),
        "Reading Speed (Chars per Hour)"
    )

    createDateGraph(
        "quantity_twelve_months",
        quantity_improvement_bubble,
        "Immersion Quantity",
        subMonths(rn, 12),
        "Reading Time (Hours)"
    )

    // All Time Progress Graphs
    createDateGraph(
        "speed_all_time",
        speed_improvement_bubble,
        "Speed Improvement",
        undefined,
        "Reading Speed (Chars per Hour)"
    )

    createDateGraph(
        "quantity_all_time",
        quantity_improvement_bubble,
        "Immersion Quantity",
        undefined,
        "Reading Time (Hours)"
    )

    createCategoryGraph(
        "average_speed_per_game",
        speed_per_game,
        "Speed per Game",
        "Speed (Chars per Hours)"
    )

    createCategoryGraph(
        "average_time_per_game",
        time_per_game,
        "Time per Game",
        "Reading Time (Hours)"
    )

    createCategoryGraph(
        "average_chars_per_game",
        chars_per_game,
        "Chars per Game",
        "Chars"
    )
}
startup()
