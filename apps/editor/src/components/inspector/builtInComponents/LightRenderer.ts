import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const lightRenderer: Component = {
    name: BuiltInComponent.LightRenderer,
    displayName: "Light Renderer",
    properties: [
        {
            name: "radius",
            displayName: "Radius",
            type: PropertyType.Number,
            defaultValue: 100,
            options: { min: 0, step: 1 },
        },
        {
            name: "smooth",
            displayName: "Smooth",
            type: PropertyType.Boolean,
            defaultValue: true,
        },
        {
            name: "layer",
            displayName: "Layer",
            type: PropertyType.String,
            defaultValue: "Default",
        },
        {
            name: "intensity",
            displayName: "Intensity",
            type: PropertyType.Number,
            options: { min: 0, max: 1, step: 0.01 },
            defaultValue: 0.8,
        },
    ],
};
