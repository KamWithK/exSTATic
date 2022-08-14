console.log("Injected")

import { getData } from "../data_wrangling/data_extraction"
import {group, rollup, sum} from "d3-array"

const SECS_TO_HRS = 60 * 60

let data

let uuid_groups

let time_read_per
let chars_read_per
let read_speed_per

const setup = async () => {
    data = await getData()

    uuid_groups = group(data, d => d.uuid)

    time_read_per = rollup(data, v => sum(v, d => d.time_read / SECS_TO_HRS), d => d.uuid)
    chars_read_per = rollup(data, v => sum(v, d => d.chars_read), d => d.uuid)
    read_speed_per = rollup(data, v => sum(v, d => d.read_speed * SECS_TO_HRS), d => d.uuid)
}
setup()

export {}
