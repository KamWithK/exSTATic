console.log("Injected")

import { VNStorage } from "../vn/vn_storage"
import { MokuroStorage } from "../mokuro/mokuro_storage"
import { TTUStorage } from "../ttu/ttu_storage"
import Settings from "./settings.svelte"
import { mount } from "svelte";

const setup = async () => {
    const vn_storage = await VNStorage.build(true)
    const mokuro_storage = await MokuroStorage.build(true)
    const ttu_storage = await TTUStorage.build(true)

    mount(Settings, {
            target: document.documentElement,
            props: {
                vn_storage,
                mokuro_storage,
                ttu_storage
            }
        })
}
setup()

export {}
