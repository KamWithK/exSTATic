console.log("Injected")

import { getData } from "./data_wrangling/data_extraction";
require("chart.js");

const CHART_COLORS = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
}

async function startup() {
    let game_json_data = await getData()

    let context = document.getElementById("average_speed_over_time").getContext("2d")
    let chart = new Chart(context, {
        "type": "line",
        "data": {
            "datasets": [{
                "label": "Overall Average",
                "borderColor": CHART_COLORS.red,
                "data": game_json_data
            }]
        },
        "options": {
            "responsive": true,
            "plugins": {
                "title": {
                    "display": true,
                    "text": "Average Reading Speed Over Time"
                }
            },
            "interaction": {
                "mode": 'index',
                "intersect": false
            },
            "scales": {
                "x": {
                    "display": true,
                    "title": {
                        "display": true,
                        "text": "Time"
                    }
                },
                "y": {
                    "display": true,
                    "title": {
                        "display": true,
                        "text": "Average Speed"
                    }
                }
            },
            "parsing": {
                "xAxisKey": "date",
                "yAxisKey": "read_speed"
            }
        }
    })
}
startup()
