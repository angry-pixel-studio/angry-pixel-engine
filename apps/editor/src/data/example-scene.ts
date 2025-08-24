import { BuiltInComponent } from "../types/component";
import { AssetType, Scene } from "../types/scene";

export const exampleScene: Scene = {
    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8d",
    name: "Example Scene",
    assets: [
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8f",
            name: "Player Spritesheet",
            url: "assets/image/player-spritesheet.png",
            type: AssetType.Image,
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
                        layers: ["Background", "Foreground", "Player"],
                        depth: 0,
                        zoom: 4,
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
                        position: { x: 0, y: 0 },
                        scale: { x: 1, y: 1 },
                        rotation: 0,
                    },
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c93",
                    name: BuiltInComponent.SpriteRenderer,
                    enabled: true,
                    builtIn: true,
                    data: {
                        image: "assets/image/player-spritesheet.png",
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
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c94",
            name: "Test Parent",
            enabled: true,
            components: [
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c95",
                    name: BuiltInComponent.Transform,
                    enabled: true,
                    builtIn: true,
                    data: {
                        position: { x: 0, y: 0 },
                        scale: { x: 0, y: 0 },
                        rotation: 0,
                    },
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
            url: "assets/systems/playerControllerSystem.ts",
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9d",
            name: "EnemyControllerSystem",
            enabled: true,
            url: "assets/systems/enemyControllerSystem.ts",
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9e",
            name: "SomeSystem",
            enabled: true,
            url: "assets/systems/SomeSystem.ts",
        },
    ],
    components: [],
};
