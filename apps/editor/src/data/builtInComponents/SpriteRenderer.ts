import { BuiltInComponent, Component, PropertyType } from "../../types/component";

export const spriteRenderer: Component = {
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
            defaultValue: "Default",
        },
        {
            name: "slice",
            displayName: "Slice",
            type: PropertyType.Rect,
            enabled: false,
            options: { setUndefinedWhenZero: true },
        },
        {
            name: "tiled",
            displayName: "Tiled",
            type: PropertyType.Vector2,
            defaultValue: { x: 1, y: 1 },
        },
        {
            name: "flipHorizontally",
            displayName: "Flip Horizontally",
            type: PropertyType.Boolean,
        },
        {
            name: "flipVertically",
            displayName: "Flip Vertically",
            type: PropertyType.Boolean,
        },
        {
            name: "smooth",
            displayName: "Smooth",
            type: PropertyType.Boolean,
        },
        {
            name: "opacity",
            displayName: "Opacity",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 1,
        },
        {
            name: "maskColor",
            displayName: "Mask Color",
            type: PropertyType.Color,
            defaultValue: "#FFFFFF",
        },
        {
            name: "maskColorMix",
            displayName: "Mask Color Mix",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 0,
        },
        {
            name: "offset",
            displayName: "Offset",
            type: PropertyType.Vector2,
        },
        {
            name: "scale",
            displayName: "Scale",
            type: PropertyType.Vector2,
            defaultValue: { x: 1, y: 1 },
        },
        {
            name: "rotation",
            displayName: "Rotation",
            type: PropertyType.Number,
            options: { min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 },
        },
        {
            name: "width",
            displayName: "Width",
            type: PropertyType.Number,
            options: { setUndefinedWhenZero: true },
        },
        {
            name: "height",
            displayName: "Height",
            type: PropertyType.Number,
            options: { setUndefinedWhenZero: true },
        },
    ],
};
