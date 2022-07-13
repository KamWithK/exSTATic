console.log("Injected")

import { getData } from "./data_wrangling/data_extraction"
import { divideData, combineData } from "./data_wrangling/data_processing"
require("chart.js")
import { subMonths } from "date-fns"
import "chartjs-adapter-date-fns"

function configureDividedDataset(data, field) {
    return divideData(data, field).map((entry, _) => {
        let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)"

        return {
            "label": entry[0]["name"],
            "data": entry,
            "barPercentage": 0.1,
            "backgroundColor": color,
            "borderColor": color
        }
    })
}

function configureCombinedDataset(data, field) {
    let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)"

    return [{
        "label": "Data",
        "data": combineData(data, field),
        "backgroundColor": color,
        "borderColor": color
    }]
}

function parseDates(date_string) {
    return new Date(date_string)
}

function createChartConfig(element_id, dataset, index_axis, x_min, x_max, type, title, x_key, x_label, y_key, y_label) {
    return {
        "type": type,
        "data": {
            "datasets": dataset
        },
        "options": {
            "indexAxis": index_axis,
            "responsive": true,
            "plugins": {
                "title": {
                    "display": true,
                    "text": title
                }
            },
            "scales": {
                "x": {
                    "display": true,
                    "title": {
                        "display": true,
                        "text": x_label
                    },
                    "min": x_min,
                    "max": x_max
                },
                "y": {
                    "display": true,
                    "title": {
                        "display": true,
                        "text": y_label
                    }
                }
            },
            "parsing": {
                "xAxisKey": x_key,
                "yAxisKey": y_key
            }
        }
    }
}

function createChart(element_id, dataset, min_date, max_date, type, title, x_key, x_label, y_key, y_label) {
    let config = createChartConfig(element_id, dataset, min_date, max_date, type, title, x_key, x_label, y_key, y_label)
    return new Chart(document.getElementById(element_id).getContext("2d"), config)
}

function createDateChart(element_id, dataset, min_date, max_date, type, title, x_key, x_label, y_key, y_label) {
    let config = createChartConfig(element_id, dataset, min_date, max_date, type, title, x_key, x_label, y_key, y_label)
    config["options"]["scales"]["x"]["type"] = "time"
    config["options"]["scales"]["x"]["time"] = {
        "unit": "day",
        "parser": parseDates
    }
    return new Chart(document.getElementById(element_id).getContext("2d"), config)
}

async function startup() {
    let game_json_data = await getData()
    rn = new Date()

    // One Month Progress Graphs
    createDateChart(
        "average_speed_one_month",
        configureDividedDataset(game_json_data, "process_path"),
        "x",
        subMonths(rn, 1),
        undefined,
        "line",
        "Average Reading Speed",
        "date", "Time", "read_speed", "Reading Speed (Chars per Hour)"
    )

    createDateChart(
        "chars_read_one_month",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 1),
        undefined,
        "bar",
        "Chars Read",
        "date", "Time", "chars_read", "Chars Read"
    )

    createDateChart(
        "hours_read_one_month",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 1),
        undefined,
        "bar",
        "Read Time",
        "date", "Time", "time_read", "Read Time (Hours)"
    )

    // Six Month Progress Graphs
    createDateChart(
        "average_speed_six_months",
        configureDividedDataset(game_json_data, "process_path"),
        "x",
        subMonths(rn, 6),
        undefined,
        "line",
        "Average Reading Speed",
        "date", "Time", "read_speed", "Reading Speed (Chars per Hour)"
    )

    createDateChart(
        "chars_read_six_months",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 6),
        undefined,
        "bar",
        "Chars Read",
        "date", "Time", "chars_read", "Chars Read"
    )

    createDateChart(
        "hours_read_six_months",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 6),
        undefined,
        "bar",
        "Read Time",
        "date", "Time", "time_read", "Read Time (Hours)"
    )

    // One Year Progress Graphs
    createDateChart(
        "average_speed_twelve_months",
        configureDividedDataset(game_json_data, "process_path"),
        "x",
        subMonths(rn, 12),
        undefined,
        "line",
        "Average Reading Speed",
        "date", "Time", "read_speed", "Reading Speed (Chars per Hour)"
    )

    createDateChart(
        "chars_read_twelve_months",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 12),
        undefined,
        "bar",
        "Chars Read",
        "date", "Time", "chars_read", "Chars Read"
    )

    createDateChart(
        "hours_read_twelve_months",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        subMonths(rn, 12),
        undefined,
        "bar",
        "Read Time",
        "date", "Time", "time_read", "Read Time (Hours)"
    )

    // All Time Progress Graphs
    createDateChart(
        "average_speed_all_time",
        configureDividedDataset(game_json_data, "process_path"),
        "x",
        undefined,
        undefined,
        "line",
        "Average Reading Speed",
        "date", "Time", "read_speed", "Reading Speed (Chars per Hour)"
    )

    createDateChart(
        "chars_read_all_time",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        undefined,
        undefined,
        "bar",
        "Chars Read",
        "date", "Time", "chars_read", "Chars Read"
    )

    createDateChart(
        "hours_read_all_time",
        configureCombinedDataset(game_json_data, "date"),
        "x",
        undefined,
        undefined,
        "bar",
        "Read Time",
        "date", "Time", "time_read", "Read Time (Hours)"
    )

    createChart(
        "chars_read_per_game",
        configureCombinedDataset(game_json_data, "process_path"),
        "x",
        undefined,
        undefined,
        "bar",
        "Chars Read",
        "name", "Game", "chars_read", "Chars Read"
    )

    createChart(
        "hours_read_per_game",
        configureCombinedDataset(game_json_data, "process_path"),
        "x",
        undefined,
        undefined,
        "bar",
        "Read Time",
        "name", "Game", "time_read", "Read Time (Hours)"
    )

    createChart(
        "average_speed_per_game",
        configureCombinedDataset(game_json_data, "process_path"),
        "y",
        undefined,
        undefined,
        "bar",
        "Average Speed",
        "read_speed", "Reading Pace (Chars per Hour)", "name", "Game"
    )
}
startup()
