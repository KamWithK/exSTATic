<script lang="ts">
    import type { MediaStorage } from "../../storage/media_storage"

    import { onMount } from "svelte"
    import type { HTMLInputTypeAttribute } from "svelte/elements"
    import type { TypeProperties } from "../../storage/type_storage";

    export let media_storage: MediaStorage
    export let id: keyof TypeProperties
    export let description = ""
    export let units = ""
    export let type: HTMLInputTypeAttribute = "number"
    export let value: string | number | undefined = undefined
    export let root_css: string | undefined = undefined

    let input_element: HTMLInputElement | undefined
    
    const update = async (event: Event) => {
        value = (event.target as HTMLInputElement).value

        if (root_css !== undefined) {
            document.documentElement.style.setProperty(root_css, `${value}${units}`)
        }

        const properties: {[key: string]: string | undefined} = {}
        properties[id] = value
        if (media_storage !== undefined && media_storage.type_storage !== undefined) {
            await media_storage.type_storage.updateProperties(properties)
        }
    }
    
    onMount(() => {
        if (media_storage.properties.hasOwnProperty(id) && input_element) {
            value = media_storage.properties[id]
            input_element.value = (value ?? "").toString()
        }

        if (input_element?.value !== undefined) {
            input_element.dispatchEvent(new Event("change"))
        }
    })
</script>

<div class="menu-label">
    {description}{#if units != ""}{" "}({units}){/if}
</div>
<input bind:this={input_element} class="menu-input" type={type} value={value} on:change={update}>
