import { BuiltInComponent, Component, PropertyType } from "../types/component";

export const builtInComponents: Component[] = [
    {
        name: BuiltInComponent.Transform,
        displayName: "Transform",
        properties: [
            {
                name: "position",
                displayName: "Position",
                type: PropertyType.Vector2,
            },
            {
                name: "scale",
                displayName: "Scale",
                type: PropertyType.Vector2,
            },
            {
                name: "rotation",
                displayName: "Rotation",
                type: PropertyType.Number,
            },
        ],
    },
    {
        name: BuiltInComponent.Camera,
        displayName: "Camera",
        properties: [
            {
                name: "layers",
                displayName: "Layers",
                type: PropertyType.StringArray,
            },
            {
                name: "depth",
                displayName: "Depth",
                type: PropertyType.Number,
            },

            {
                name: "zoom",
                displayName: "Zoom",
                type: PropertyType.Number,
            },
        ],
    },
    {
        name: BuiltInComponent.SpriteRenderer,
        displayName: "Sprite Renderer",
        properties: [
            {
                name: "image",
                displayName: "Image",
                type: PropertyType.Image,
            },
            {
                name: "layer",
                displayName: "Layer",
                type: PropertyType.String,
            },
        ],
    },
];
