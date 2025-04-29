import { FollowPlayerCamera } from "@component/camera/FollowPlayerCamera";
import { RENDER_LAYERS } from "@config/layers";
import { Camera, Component, defaultRenderLayer, ShadowRenderer, Transform } from "angry-pixel";

export const mainCamera: Component[] = [
    new Camera({
        layers: [
            RENDER_LAYERS.Foreground,
            RENDER_LAYERS.Goblin,
            RENDER_LAYERS.Ninja,
            RENDER_LAYERS.Shadow,
            defaultRenderLayer,
        ],
        zoom: 4,
        debug: true,
    }),
    new Transform(),
    new FollowPlayerCamera(),
    new ShadowRenderer({
        color: "#000000",
        width: 1920,
        height: 1080,
        layer: RENDER_LAYERS.Shadow,
        opacity: 0,
    }),
];

export const uiCamera: Component[] = [
    new Camera({
        depth: 1,
        layers: [RENDER_LAYERS.UI],
    }),
    new Transform(),
];
