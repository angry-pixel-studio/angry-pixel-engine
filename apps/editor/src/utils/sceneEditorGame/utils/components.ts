import { Camera, Component, ComponentType, SpriteRenderer, TilemapRenderer, Transform } from "angry-pixel";
import { BuiltInComponent } from "../../../types/component";

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
