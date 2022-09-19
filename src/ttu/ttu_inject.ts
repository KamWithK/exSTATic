import { dateNowString } from "../calculations"
import { TTUStorage } from "./ttu_storage"

import App from "./ttu.svelte"

console.log("Injected")

var ttu_storage: TTUStorage

function getBookTitle() {
  return document.title.replace(/ \| ッツ Ebook Reader$/, "")
}

// Gets current char count and total in book
function getCharCount() {
  const nodes = document.getElementsByClassName("writing-horizontal-tb")[1].childNodes

  if (nodes.length == 6) {
    const char_current = nodes[0].textContent
    const char_total = nodes[2].textContent

    return [char_current, char_total]
  }

  return undefined
}

async function initialSetup(char_current, book_title) {
  ttu_storage = await TTUStorage.build(true)

  // Process first page
  await ttu_storage.changeInstance(undefined, book_title)

  // Ensure starting partially through doesn't cause everything so far to log in todays stats
  await ttu_storage.instance_storage.updateDetails({
    last_char_count: char_current,
  })

  // Load Svelte for the inserted UI
  new App({
    target: document.body.querySelector<HTMLElement>(".book-content"),
    props: {
      ttu_storage: ttu_storage,
    },
  })
}

const onUpdate = async () => {
  if (ttu_storage && !(await ttu_storage.extensionActivated())) return

  const book_title = getBookTitle()
  const char_count = getCharCount()

  // in case there's no charCount on TTU
  if (!char_count) return

  const [char_current,] = char_count

  await ttu_storage.changeInstance(undefined, book_title)
  await ttu_storage.processText(char_current, dateNowString())
}

const observer_settings = {
  characterData: true,
  childList: false,
  subtree: true,
}

const observeAfter = async () => {
  // Try get information
  const book_title = getBookTitle()
  const char_count = getCharCount()

  // If information doesn't exist then keep waiting
  if (!document.querySelector(".writing-horizontal-tb.fixed.bottom-2")) return
  if (!char_count) return

  // Once information exists initialise
  await initialSetup(char_count, book_title)

  // Create a new observer over just the built in stats bar
  const stats_observer = new MutationObserver(onUpdate)
  stats_observer.observe(
    document.querySelector(".writing-horizontal-tb.fixed.bottom-2"),
    observer_settings
  )

  // Disconnect the old observer so this never runs again
  overall_observer.disconnect()
}

const overall_observer = new MutationObserver(observeAfter)
overall_observer.observe(document, observer_settings)
