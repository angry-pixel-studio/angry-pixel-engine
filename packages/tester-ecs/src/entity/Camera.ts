import { FollowPlayerCamera } from "@component/camera/FollowPlayerCamera";
import { RENDER_LAYERS } from "@config/layers";
import { Archetype, Camera, defaultRenderLayer, DarknessRenderer, Transform } from "angry-pixel";

export const mainCameraArchetype: Archetype = {
    components: [
        new Camera({
            layers: [
                RENDER_LAYERS.Foreground,
                RENDER_LAYERS.Goblin,
                RENDER_LAYERS.Ninja,
                RENDER_LAYERS.Darkness,
                defaultRenderLayer,
            ],
            zoom: 4,
            debug: true,
        }),
        new Transform(),
        new FollowPlayerCamera(),
        new DarknessRenderer({
            color: "#000000",
            width: 1920,
            height: 1080,
            layer: RENDER_LAYERS.Darkness,
            opacity: 1,
        }),
    ],
};

export const uiCameraArchetype: Archetype = {
    components: [
        new Camera({
            depth: 1,
            layers: [RENDER_LAYERS.UI],
        }),
        new Transform(),
    ],
};
