import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const transform: Component = {
    name: BuiltInComponent.Transform,
    displayName: "Transform",
    properties: [
        {
            name: "position",
            displayName: "Position",
            type: PropertyType.Vector2,
            defaultValue: { x: 0, y: 0 },
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
            defaultValue: 0,
        },
    ],
};
