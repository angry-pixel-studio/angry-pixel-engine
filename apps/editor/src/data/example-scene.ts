import { BuiltInComponent } from "../types/component";
import { AssetType, Scene } from "../types/scene";

export const exampleScene: Scene = {
    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8d",
    name: "Example Scene",
    assets: [
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8f",
            name: "Player Spritesheet",
            url: "assets/example-scene/image/player-spritesheet.png",
            type: AssetType.Image,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6d",
            name: "Tileset",
            url: "assets/example-scene/image/tileset.png",
            type: AssetType.Image,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6e",
            name: "PressStart2P-Regular",
            url: "assets/example-scene/font/PressStart2P-Regular.ttf",
            type: AssetType.Font,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6f",
            name: "Main Song",
            url: "assets/example-scene/audio/main_song.ogg",
            type: AssetType.Audio,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6g",
            name: "Jump SFX",
            url: "assets/example-scene/audio/sfx_jump4.wav",
            type: AssetType.Audio,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6h",
            name: "Tiled Tilemap",
            url: "assets/example-scene/tilemap/tilemap.json",
            type: AssetType.Json,
        },
        {
            id: "e2a4b1c3-5d6f-4a7b-8c9d-1e2f3a4b5c6i",
            name: "Example Video",
            url: "assets/example-scene/video/example.mp4",
            type: AssetType.Video,
        },
    ],
    entities: [
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8e",
            name: "Main Camera",
            enabled: true,
            components: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8f",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c90",
                    name: BuiltInComponent.Camera,
                    enabled: true,
                    builtIn: true,
                    data: {
                        layers: ["Background", "Player", "Foreground", "Default"],
                        depth: 0,
                        zoom: 4,
                    },
                },
            ],
            children: [],
        },
        {
            id: "e2a4b8c7-9d1f-4e3b-8a2c-5f6d7e8c9b01",
            name: "Foreground",
            enabled: true,
            components: [
                {
                    id: "f8c1e7b2-3d4a-4b6e-8c2f-7a9e5d3c1b24",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: "b2f7c1e4-8a3d-4b2e-9c1f-7e5d3a2b1c45",
                    name: BuiltInComponent.TilemapRenderer,
                    enabled: true,
                    builtIn: true,
                    data: {
                        layer: "Foreground",
                        tileset: {
                            image: "assets/example-scene/image/tileset.png",
                            tileWidth: 16,
                            tileHeight: 16,
                            width: 12,
                            margin: { x: 0, y: 0 },
                            spacing: { x: 0, y: 0 },
                        },
                        // prettier-ignore
                        data: [
                            3, 0, 0, 0, 0, 0, 0, 1, 
                            15, 0, 0, 0, 0, 0, 0, 13, 
                            15, 0, 0, 0, 0, 0, 0, 13, 
                            15, 0, 0, 0, 0, 0, 0, 13,
                            28, 2, 2, 2, 2, 2, 2, 30,
                        ],
                        width: 8,
                        height: 5,
                    },
                },
            ],
            children: [],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c91",
            name: "Player",
            enabled: true,
            components: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c92",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                    data: {
                        position: { x: 0, y: -16 },
                    },
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c93",
                    name: BuiltInComponent.SpriteRenderer,
                    enabled: true,
                    builtIn: true,
                    data: {
                        image: "assets/example-scene/image/player-spritesheet.png",
                        layer: "Player",
                        slice: {
                            x: 0,
                            y: 64,
                            width: 16,
                            height: 16,
                        },
                    },
                },
            ],
            children: [],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-7e1f2d3c4b5a",
            name: "Text",
            enabled: true,
            components: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c98",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c97",
                    name: BuiltInComponent.TextRenderer,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [],
        },
        {
            id: "e2a4b7c1-5d3f-4e9a-8c2b-1f3e6d7a8b91",
            name: "Mask",
            enabled: true,
            components: [
                {
                    id: "e8c1f7a2-3b4d-4e6a-9c2b-5d7f8a9b0c12",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: "e4a7b2c3-9d1f-4e6a-8c2b-7f3e5d6a8b91",
                    name: BuiltInComponent.MaskRenderer,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c94",
            name: "Test Parent",
            enabled: true,
            components: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c95",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c96",
                    name: "Test Child 01",
                    enabled: true,
                    components: [
                        {
                            id: "b7e3c2a1-4f2d-4e8a-9c3a-3f1e5d6b7c93",
                            name: BuiltInComponent.TypeTest,
                            enabled: true,
                            builtIn: true,
                        },
                    ],
                    children: [],
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c99",
                    name: "Test Child 02",
                    enabled: true,
                    components: [
                        {
                            id: "b8f4d3e2-5a1b-4c7d-8e9f-1a2b3c4d5e6f",
                            name: "Custom Component",
                            enabled: true,
                            builtIn: false,
                            data: {
                                numberProp: 1,
                                stringProp: "Hello",
                                booleanProp: true,
                                vector2Prop: { x: 1, y: 2 },
                            },
                        },
                    ],
                    children: [],
                },
            ],
        },
    ],
    systems: [
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9c",
            name: "PlayerControllerSystem",
            enabled: true,
            url: "assets/example-scene/systems/playerControllerSystem.ts",
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9d",
            name: "EnemyControllerSystem",
            enabled: true,
            url: "assets/example-scene/systems/enemyControllerSystem.ts",
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9e",
            name: "SomeSystem",
            enabled: true,
            url: "assets/example-scene/systems/SomeSystem.ts",
        },
    ],
    components: [],
};
