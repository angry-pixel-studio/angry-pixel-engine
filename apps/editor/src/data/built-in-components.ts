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
                options: { min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 },
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
                options: { min: 0, step: 0.1 },
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
            {
                name: "slice",
                displayName: "Slice",
                type: PropertyType.Rect,
            },
            {
                name: "smooth",
                displayName: "Smooth",
                type: PropertyType.Boolean,
            },
            {
                name: "offset",
                displayName: "Offset",
                type: PropertyType.Vector2,
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
                name: "rotation",
                displayName: "Rotation",
                type: PropertyType.Number,
                options: { min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 },
            },
            {
                name: "opacity",
                displayName: "Opacity",
                type: PropertyType.Number,
                options: { min: 0, max: 1, step: 0.01 },
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
            },
            {
                name: "tintColor",
                displayName: "Tint Color",
                type: PropertyType.Color,
            },
            {
                name: "scale",
                displayName: "Scale",
                type: PropertyType.Vector2,
            },
            {
                name: "width",
                displayName: "Width",
                type: PropertyType.Number,
            },
            {
                name: "height",
                displayName: "Height",
                type: PropertyType.Number,
            },
            {
                name: "tiled",
                displayName: "Tiled",
                type: PropertyType.Vector2,
            },
        ],
    },
    {
        name: BuiltInComponent.TypeTest,
        displayName: "Type Test",
        properties: [
            {
                name: "numberProp",
                displayName: "Number",
                type: PropertyType.Number,
            },
            {
                name: "stringProp",
                displayName: "String",
                type: PropertyType.String,
            },
            {
                name: "booleanProp",
                displayName: "Boolean",
                type: PropertyType.Boolean,
            },
            {
                name: "vector2Prop",
                displayName: "Vector2",
                type: PropertyType.Vector2,
            },
            {
                name: "colorProp",
                displayName: "Color",
                type: PropertyType.Color,
            },
            {
                name: "fontProp",
                displayName: "Font",
                type: PropertyType.Font,
            },
            {
                name: "textProp",
                displayName: "Text",
                type: PropertyType.Text,
            },
            {
                name: "imageProp",
                displayName: "Image",
                type: PropertyType.Image,
            },
            {
                name: "audioProp",
                displayName: "Audio",
                type: PropertyType.Audio,
            },
            {
                name: "videoProp",
                displayName: "Video",
                type: PropertyType.Video,
            },
            {
                name: "objectProp",
                displayName: "Object",
                type: PropertyType.Object,
            },
            {
                name: "stringArrayProp",
                displayName: "String Array",
                type: PropertyType.StringArray,
            },
        ],
    },
];
