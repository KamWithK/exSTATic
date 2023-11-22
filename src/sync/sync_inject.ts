console.log("Injected")

import { getData } from "../data_wrangling/data_extraction"

import { parseISO } from "date-fns"

async function upload() {
  const data = await getData()

  if (data === undefined) {
    console.log("No data")
    return
  }
  console.log(data)

  // await fetch("http://localhost:8080/api/media", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     "max_afk_time": 4
  //   })
  // })
}
upload()

export {}
