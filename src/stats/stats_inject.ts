console.log("Injected")

import { getData } from "../data_wrangling/data_extraction"
import * as d3 from "d3"

const SECS_TO_HRS = 60 * 60

let data

let uuid_groups

let time_read_per
let chars_read_per
let read_speed_per

const setup = async () => {
    data = await getData()

    uuid_groups = d3.group(data, d => d.uuid)

    time_read_per = d3.rollup(data, v => d3.sum(v, d => d.time_read / SECS_TO_HRS), d => d.uuid)
    chars_read_per = d3.rollup(data, v => d3.sum(v, d => d.chars_read), d => d.uuid)
    read_speed_per = d3.rollup(data, v => d3.sum(v, d => d.read_speed * SECS_TO_HRS), d => d.uuid)
}
setup()

export {}
