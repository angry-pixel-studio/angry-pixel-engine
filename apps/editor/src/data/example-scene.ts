import { BuiltInComponent } from "../types/component";
import { Scene } from "../types/scene";

export const exampleScene: Scene = {
    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c8d",
    name: "Example Scene",
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
                    data: {
                        position: { x: 0, y: 0 },
                        scale: { x: 0, y: 0 },
                        rotation: 0,
                    },
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c90",
                    name: BuiltInComponent.Camera,
                    enabled: true,
                    builtIn: true,
                    data: {
                        layers: ["Default", "Player", "Background", "Foreground"],
                        depth: 0,
                        zoom: 1,
                    },
                },
            ],
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
                        scale: { x: 0, y: 0 },
                        rotation: 0,
                    },
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c93",
                    name: BuiltInComponent.SpriteRenderer,
                    enabled: true,
                    builtIn: true,
                    data: {
                        image: "assets/images/player.png",
                        layer: "Player",
                    },
                },
            ],
        },
        {
            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c94",
            name: "Stage",
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
                    name: "Background",
                    enabled: true,
                    components: [
                        {
                            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c97",
                            name: BuiltInComponent.Transform,
                            enabled: true,
                            builtIn: true,
                            data: {
                                position: { x: 0, y: 0 },
                                scale: { x: 0, y: 0 },
                                rotation: 0,
                            },
                        },
                        {
                            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c98",
                            name: BuiltInComponent.SpriteRenderer,
                            enabled: true,
                            builtIn: true,
                            data: {
                                image: "assets/images/background.png",
                                layer: "Background",
                            },
                        },
                    ],
                },
                {
                    id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c99",
                    name: "Foreground",
                    enabled: true,
                    components: [
                        {
                            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9a",
                            name: BuiltInComponent.Transform,
                            enabled: true,
                            builtIn: true,
                            data: {
                                position: { x: 0, y: 0 },
                                scale: { x: 0, y: 0 },
                                rotation: 0,
                            },
                        },
                        {
                            id: "b7e3c2a1-4f2d-4e8a-9c3a-2f1e5d6b7c9b",
                            name: BuiltInComponent.SpriteRenderer,
                            enabled: true,
                            builtIn: true,
                            data: {
                                image: "assets/images/foreground.png",
                                layer: "Foreground",
                            },
                        },
                    ],
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
