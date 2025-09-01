import {
    BallCollider,
    BoxCollider,
    Camera,
    Component,
    ComponentType,
    DarknessRenderer,
    EdgeCollider,
    LightRenderer,
    MaskRenderer,
    PolygonCollider,
    Slice,
    SpriteRenderer,
    TextRenderer,
    TilemapCollider,
    TilemapRenderer,
    Transform,
    VideoRenderer,
} from "angry-pixel";
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
        case BuiltInComponent.TextRenderer:
            return TextRenderer;
        case BuiltInComponent.VideoRenderer:
            return VideoRenderer;
        case BuiltInComponent.MaskRenderer:
            return MaskRenderer;
        case BuiltInComponent.LightRenderer:
            return LightRenderer;
        case BuiltInComponent.DarknessRenderer:
            return DarknessRenderer;
        case BuiltInComponent.TilemapCollider:
            return TilemapCollider;
        case BuiltInComponent.EdgeCollider:
            return EdgeCollider;
        case BuiltInComponent.BoxCollider:
            return BoxCollider;
        case BuiltInComponent.BallCollider:
            return BallCollider;
        case BuiltInComponent.PolygonCollider:
            return PolygonCollider;
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
