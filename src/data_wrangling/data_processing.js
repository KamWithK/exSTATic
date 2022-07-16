export function divideData(data, field) {
    let game_data = {}

    data.forEach(element => {
        if (element[field] in game_data) {
            game_data[element[field]].push(element)
        } else {
            game_data[element[field]] = [element]
        }
    })

    return Object.values(game_data)
}

export function combineData(data, field) {
    let date_data = {}

    data.forEach(element => {
        if (element[field] in date_data) {
            let old_element = date_data[element[field]]

            old_element["lines_read"] += element["lines_read"]
            old_element["chars_read"] += element["chars_read"]
            old_element["time_read"] += element["time_read"]
            old_element["read_speed"] = old_element["chars_read"] / old_element["time_read"]
        } else {
            date_data[element[field]] = structuredClone(element)
        }
    })

    return Object.values(date_data)
}

export function getSeries(data, x_field, y_field, z_field, mode, type) {
    // Check for one subarray per game or not
    return data.map((sub_array, _) => {
        return {
            "name": sub_array[0]["name"],
            "x": sub_array.map(entry => entry[x_field]),
            "y": sub_array.map(entry => entry[y_field]),
            "mode": mode,
            "type": type,
            "marker": {
                "size": sub_array.map(entry => entry[z_field] / 2000)
            }
        }
    })
}
