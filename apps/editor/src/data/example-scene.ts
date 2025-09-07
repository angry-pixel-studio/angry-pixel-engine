import { BuiltInComponent } from "../types/component";
import { AssetType, Scene } from "../types/scene";
import { v4 as uuid } from "uuid";

export const exampleScene: Scene = {
    id: uuid(),
    name: "Example Scene",
    assets: [
        {
            id: uuid(),
            name: "Player Spritesheet",
            url: "assets/example-scene/image/player-spritesheet.png",
            type: AssetType.Image,
        },
        {
            id: uuid(),
            name: "Tileset",
            url: "assets/example-scene/image/tileset.png",
            type: AssetType.Image,
        },
        {
            id: uuid(),
            name: "PressStart2P-Regular",
            url: "assets/example-scene/font/PressStart2P-Regular.ttf",
            type: AssetType.Font,
        },
        {
            id: uuid(),
            name: "Main Song",
            url: "assets/example-scene/audio/main_song.ogg",
            type: AssetType.Audio,
        },
        {
            id: uuid(),
            name: "Jump SFX",
            url: "assets/example-scene/audio/sfx_jump4.wav",
            type: AssetType.Audio,
        },
        {
            id: uuid(),
            name: "Tiled Tilemap",
            url: "assets/example-scene/tilemap/tilemap.json",
            type: AssetType.Json,
        },
        {
            id: uuid(),
            name: "Example Video",
            url: "assets/example-scene/video/example.mp4",
            type: AssetType.Video,
        },
    ],
    entities: [
        {
            id: uuid(),
            name: "Main Camera",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: uuid(),
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
            id: uuid(),
            name: "Foreground",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: uuid(),
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
            id: uuid(),
            name: "Player",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                    data: {
                        position: { x: 0, y: -16 },
                    },
                },
                {
                    id: uuid(),
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
            id: uuid(),
            name: "Text",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: uuid(),
                    name: BuiltInComponent.TextRenderer,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [],
        },
        {
            id: uuid(),
            name: "Mask",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
                {
                    id: uuid(),
                    name: BuiltInComponent.MaskRenderer,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [],
        },
        {
            id: uuid(),
            name: "Test Parent",
            enabled: true,
            components: [
                {
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                },
            ],
            children: [
                {
                    id: uuid(),
                    name: "Test Child 01",
                    enabled: true,
                    components: [
                        {
                            id: uuid(),
                            name: BuiltInComponent.Transform,
                            enabled: true,
                            builtIn: true,
                        },
                    ],
                    children: [],
                },
                {
                    id: uuid(),
                    name: "Test Child 02",
                    enabled: true,
                    components: [
                        {
                            id: uuid(),
                            name: BuiltInComponent.Transform,
                            enabled: true,
                            builtIn: true,
                        },
                        {
                            id: uuid(),
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
            id: uuid(),
            name: "PlayerControllerSystem",
            enabled: true,
            url: "assets/example-scene/systems/playerControllerSystem.ts",
        },
        {
            id: uuid(),
            name: "EnemyControllerSystem",
            enabled: true,
            url: "assets/example-scene/systems/enemyControllerSystem.ts",
        },
        {
            id: uuid(),
            name: "SomeSystem",
            enabled: true,
            url: "assets/example-scene/systems/SomeSystem.ts",
        },
    ],
    components: [],
};
