<script lang="ts">
    import { MediaStorage } from "../storage/media_storage"

    export let media_storage: MediaStorage
    export let id: string
    export let description: string = ""
    export let units = ""
    export let type = "number"
    export let value = undefined
    export let root_css = undefined

    let input_element = undefined
    
    async function update(event) {
        value = event["target"].value

        if (root_css !== undefined) {
            document.documentElement.style.setProperty(root_css, `${value}${units}`)
        }

        let properties = {}
        properties[id] = value
        if (media_storage !== undefined && media_storage.type_storage !== undefined) {
            await media_storage.type_storage.updateProperties(properties)
        }
    }

    function setup(media_storage) {
        if (
            media_storage !== undefined
                && media_storage.properties !== undefined
                && media_storage.properties.hasOwnProperty(id)
        ) {
            value = media_storage.properties[id]
            input_element.value = value
        }

        if (input_element != undefined && input_element.value != undefined) {
            input_element.dispatchEvent(new Event("change"))
        }
    }
    $: setup(media_storage)
</script>

<div class="menu-label">
    {description}{#if units != ""}{" "}({units}){/if}
</div>
<input bind:this={input_element} class="menu-input" type={type} value={value} on:change={update}>
