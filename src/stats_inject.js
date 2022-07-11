console.log("Injected")

import { getData } from "./stats";
require("chart.js");

async function startup() {
    game_json_data = await getData()

    context = document.getElementById("average_speed_over_time").getContext("2d")
    chart = new Chart(context, {
        "type": "line",
        "data": {
            "datasets": [{
                "label": "Average Reading Speed Over Time",
                "data": game_json_data
            }]
        },
        "options": {
            "parsing": {
                "xAxisKey": "date",
                "yAxisKey": "read_speed"
            }
        }
    })
}
startup()
