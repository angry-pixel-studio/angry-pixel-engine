import { TextOrientation } from "angry-pixel";
import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const textRenderer: Component = {
    name: BuiltInComponent.TextRenderer,
    displayName: "Text Renderer",
    properties: [
        {
            name: "text",
            displayName: "Text",
            type: PropertyType.Text,
            defaultValue: "Hello World!",
        },
        {
            name: "color",
            displayName: "Color",
            type: PropertyType.Color,
            defaultValue: "#000000",
        },
        {
            name: "font",
            displayName: "Font",
            type: PropertyType.Font,
            defaultValue: "Arial",
        },
        {
            name: "fontSize",
            displayName: "Font Size",
            type: PropertyType.Number,
            options: { min: 1 },
            defaultValue: 16,
        },
        {
            name: "width",
            displayName: "Width",
            type: PropertyType.Number,
            options: { min: 0 },
            defaultValue: 192,
        },
        {
            name: "height",
            displayName: "Height",
            type: PropertyType.Number,
            options: { min: 0 },
            defaultValue: 16,
        },
        {
            name: "layer",
            displayName: "Layer",
            type: PropertyType.String,
            defaultValue: "Default",
        },
        {
            name: "opacity",
            displayName: "Opacity",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 1,
        },
        {
            name: "orientation",
            displayName: "Orientation",
            type: PropertyType.List,
            options: {
                items: [
                    { value: TextOrientation.Center, label: "Center" },
                    { value: TextOrientation.RightCenter, label: "Right Center" },
                    { value: TextOrientation.RightUp, label: "Right Up" },
                    { value: TextOrientation.RightDown, label: "Right Down" },
                ],
            },
            defaultValue: TextOrientation.Center,
        },
        {
            name: "rotation",
            displayName: "Rotation",
            type: PropertyType.Number,
            options: { min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 },
            defaultValue: 0,
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
            name: "smooth",
            displayName: "Smooth",
            type: PropertyType.Boolean,
            defaultValue: false,
        },
        {
            name: "letterSpacing",
            displayName: "Letter Spacing",
            type: PropertyType.Number,
            defaultValue: 0,
        },
        {
            name: "lineHeight",
            displayName: "Line Height",
            type: PropertyType.Number,
            options: { min: 0 },
        },
    ],
};
