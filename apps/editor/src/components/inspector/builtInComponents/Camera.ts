import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const camera: Component = {
    name: BuiltInComponent.Camera,
    displayName: "Camera",
    properties: [
        {
            name: "layers",
            displayName: "Layers",
            type: PropertyType.StringArray,
            defaultValue: ["Default"],
        },
        {
            name: "depth",
            displayName: "Depth",
            type: PropertyType.Number,
            defaultValue: 0,
        },

        {
            name: "zoom",
            displayName: "Zoom",
            type: PropertyType.Number,
            options: { min: 0, step: 0.1 },
            defaultValue: 1,
        },
    ],
};
