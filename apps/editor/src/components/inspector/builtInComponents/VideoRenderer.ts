import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const videoRenderer: Component = {
    name: BuiltInComponent.VideoRenderer,
    displayName: "Video Renderer",
    properties: [
        {
            name: "video",
            displayName: "Video",
            type: PropertyType.Video,
        },
        {
            name: "width",
            displayName: "Width",
            type: PropertyType.Number,
            options: { min: 0, step: 1 },
        },
        {
            name: "height",
            displayName: "Height",
            type: PropertyType.Number,
            options: { min: 0, step: 1 },
        },
        {
            name: "offset",
            displayName: "Offset",
            type: PropertyType.Vector2,
            defaultValue: { x: 0, y: 0 },
        },
        {
            name: "flipHorizontally",
            displayName: "Flip Horizontally",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
        {
            name: "flipVertically",
            displayName: "Flip Vertically",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
        {
            name: "rotation",
            displayName: "Rotation",
            type: PropertyType.Number,
            options: { min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 },
            defaultValue: 0,
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
        },
        {
            name: "maskColorMix",
            displayName: "Mask Color Mix",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 0,
        },
        {
            name: "tintColor",
            displayName: "Tint Color",
            type: PropertyType.Color,
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
            name: "volume",
            displayName: "Volume",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 1,
        },
        {
            name: "loop",
            displayName: "Loop",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
        {
            name: "fixedToTimeScale",
            displayName: "Fixed To Time Scale",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
        {
            name: "action",
            displayName: "Action",
            type: PropertyType.String,
            defaultValue: "play",
        },
    ],
};
