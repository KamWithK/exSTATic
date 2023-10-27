import { dateNowString } from "../calculations"
import { TTUStorage } from "./ttu_storage"

import App from "./ttu.svelte"

console.log("Injected")

var ttu_storage: TTUStorage

async function setup() {
  ttu_storage = await TTUStorage.build(true)

  // Load Svelte for the inserted UI
  const svelte_div = document.createElement("div")
  svelte_div.style.position = "fixed"
  svelte_div.style.height = "0px"
  svelte_div.style.width = "100%"
  svelte_div.style.writingMode = "horizontal-tb"
  svelte_div.style.zIndex = "50"
  document.body.insertBefore(svelte_div, document.querySelector("div.h-full.w-full"))

  new App({
    target: svelte_div,
    props: {
      ttu_storage: ttu_storage,
    },
  })
}
setup()

const onUpdate = async (event: CustomEvent) => {
  // Extract data
  const book_title = (event.target as Document).title.replace(/ \| ッツ Ebook Reader$/, "")

  // Ignore events pre page load, they register to these names
  // NOTE: This could change (if ttu's page titles change)
  // TODO: Only start timer once the page count reaches the previous logged (obviouslly this doesn't count the first time)
  if (book_title === "ッツ Ebook Reader") return
  if (["Settings", "Book Manager"].includes(book_title)) return

  const book_char_length = event.detail.bookCharCount
  const char_count = event.detail.exploredCharCount ?? 0

  // The book length is given on load
  // A separate even will later be sent for progress
  if (book_char_length) return

  // Wait for extention to start before we try to log
  if (!ttu_storage) return

  // Make sure the current book is loaded
  await ttu_storage.changeInstance(undefined, book_title)

  // Check whether active
  const active = await ttu_storage.extensionActivated()

  // Update stats when active
  // Update current char count when paused
  if (active)
    await ttu_storage.processText(char_count, dateNowString())
  else
    await ttu_storage.pauseChange(char_count)
}

// Execute update
// Updates must be forced to run synchronously by running one after another
let promise_chain = Promise.resolve()
document.addEventListener(
  'ttsu:page.change',
  (event: CustomEvent) => promise_chain = promise_chain.then(() => onUpdate(event))
)
