import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const darknessRenderer: Component = {
    name: BuiltInComponent.DarknessRenderer,
    displayName: "Darkness Renderer",
    properties: [
        {
            name: "width",
            displayName: "Width",
            type: PropertyType.Number,
            defaultValue: 100,
            options: { min: 0, step: 1 },
        },
        {
            name: "height",
            displayName: "Height",
            type: PropertyType.Number,
            defaultValue: 50,
            options: { min: 0, step: 1 },
        },
        {
            name: "color",
            displayName: "Color",
            type: PropertyType.Color,
            defaultValue: "#000000",
        },
        {
            name: "opacity",
            displayName: "Opacity",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 0.5,
        },
        {
            name: "layer",
            displayName: "Layer",
            type: PropertyType.String,
            defaultValue: "Default",
        },
    ],
};
