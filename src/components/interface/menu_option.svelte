<script lang="ts">
  import type { MediaStorage } from "../../storage/media_storage";

  import { onMount } from "svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";
  import type { TypeProperties } from "../../storage/type_storage";

  interface Props {
    media_storage: MediaStorage;
    id: keyof TypeProperties;
    description?: string;
    units?: string;
    type?: HTMLInputTypeAttribute;
    value?: string | number | undefined;
    root_css?: string | undefined;
  }

  let {
    media_storage,
    id,
    description = "",
    units = "",
    type = "number",
    value = $bindable(),
    root_css = undefined,
  }: Props = $props();

  let input_element: HTMLInputElement | undefined = $state();

  const update = async (event: Event) => {
    value = (event.target as HTMLInputElement).value;

    if (root_css !== undefined) {
      document.documentElement.style.setProperty(root_css, `${value}${units}`);
    }

    const properties: { [key: string]: string | undefined } = {};
    properties[id] = value;
    if (
      media_storage !== undefined &&
      media_storage.type_storage !== undefined
    ) {
      await media_storage.type_storage.updateProperties(properties);
    }
  };

  onMount(() => {
    if (media_storage.properties.hasOwnProperty(id) && input_element) {
      value = media_storage.properties[id];
      input_element.value = (value ?? "").toString();
    }

    if (input_element?.value !== undefined) {
      input_element.dispatchEvent(new Event("change"));
    }
  });
</script>

<div class="menu-label">
  {description}{#if units != ""}{" "}({units}){/if}
</div>
<input
  bind:this={input_element}
  class="menu-input"
  {type}
  {value}
  onchange={update}
/>
