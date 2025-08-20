import { SceneData } from "@types";
import { MaskShape } from "angry-pixel";

export const sceneData: SceneData = {
    assets: {
        images: ["image/logo.png"],
        fonts: [],
        audio: [],
        video: [],
    },
    entities: [
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8d",
            name: "camera",
            active: true,
            components: [
                {
                    name: "Transform",
                    active: true,
                    data: {
                        position: {
                            x: 0,
                            y: 0,
                        },
                        rotation: 0,
                        scale: {
                            x: 1,
                            y: 1,
                        },
                    },
                },
                {
                    name: "Camera",
                    active: true,
                    data: {
                        layers: ["Background", "Foreground"],
                        zoom: 1,
                        depth: 0,
                    },
                },
            ],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8e",
            name: "Logo",
            active: true,
            components: [
                {
                    name: "Transform",
                    active: true,
                    data: {
                        position: {
                            x: 0,
                            y: 0,
                        },
                        scale: {
                            x: 4,
                            y: 1,
                        },
                    },
                },
                {
                    name: "SpriteRenderer",
                    active: true,
                    data: {
                        image: "image/logo.png",
                        layer: "Foreground",
                    },
                },
            ],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8f",
            name: "Color BG",
            active: true,
            components: [
                {
                    name: "Transform",
                    active: true,
                    data: {
                        position: { x: -500, y: 0 },
                        rotation: Math.PI / 4,
                    },
                },
                {
                    name: "MaskRenderer",
                    active: true,
                    data: {
                        color: "#c3d4e5",
                        layer: "Background",
                        shape: MaskShape.Rectangle,
                        width: 500,
                        height: 500,
                    },
                },
            ],
        },
    ],
};
