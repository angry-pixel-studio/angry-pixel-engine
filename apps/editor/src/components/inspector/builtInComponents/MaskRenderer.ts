import { MaskShape } from "angry-pixel";
import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const maskRenderer: Component = {
    name: BuiltInComponent.MaskRenderer,
    displayName: "Mask Renderer",
    properties: [
        {
            name: "shape",
            displayName: "Shape",
            type: PropertyType.List,
            options: {
                items: [
                    { value: undefined, label: "Select Shape" },
                    { value: MaskShape.Rectangle, label: "Rectangle" },
                    { value: MaskShape.Circumference, label: "Circumference" },
                    { value: MaskShape.Polygon, label: "Polygon" },
                ],
                castValue: (value: string) => value !== undefined && Number(value),
            },
            defaultValue: undefined,
        },
        {
            name: "color",
            displayName: "Color",
            type: PropertyType.Color,
            defaultValue: "#000000",
        },
        {
            name: "width",
            displayName: "Width",
            type: PropertyType.Number,
            defaultValue: 0,
            options: { min: 0, step: 1 },
        },
        {
            name: "height",
            displayName: "Height",
            type: PropertyType.Number,
            defaultValue: 0,
            options: { min: 0, step: 1 },
        },
        {
            name: "radius",
            displayName: "Radius",
            type: PropertyType.Number,
            defaultValue: 0,
            options: { min: 0, step: 1 },
        },
        {
            name: "vertexModel",
            displayName: "Vertex Model",
            type: PropertyType.Vector2Array,
            defaultValue: [],
        },
        {
            name: "offset",
            displayName: "Offset",
            type: PropertyType.Vector2,
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
            name: "layer",
            displayName: "Layer",
            type: PropertyType.String,
            defaultValue: "Default",
        },
    ],
};
