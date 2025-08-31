import { Camera, Component, ComponentType, SpriteRenderer, TilemapRenderer, Transform } from "angry-pixel";
import { BuiltInComponent } from "../../../types/component";
import { Vector2 } from "@angry-pixel/math";

export const getComponentType = (componentName: BuiltInComponent): ComponentType<Component> | undefined => {
    switch (componentName) {
        case BuiltInComponent.Transform:
            return Transform;
        case BuiltInComponent.Camera:
            return Camera;
        case BuiltInComponent.SpriteRenderer:
            return SpriteRenderer;
        case BuiltInComponent.TilemapRenderer:
            return TilemapRenderer;
    }
};

export const mapComponentData = (componentData: Record<string, unknown>): Record<string, unknown> => {
    return Object.fromEntries(Object.entries(componentData).map(([key, value]) => [key, mapComponentValue(value)]));
};

type Vector2Value = { x: number; y: number };

const mapComponentValue = (value: unknown): unknown => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const keys = Object.keys(value);

        // Map Vector2 value
        if (keys.length === 2 && keys.includes("x") && keys.includes("y")) {
            return new Vector2((value as Vector2Value).x, (value as Vector2Value).y);
        }

        return { ...value };
    }
    return value;
};
