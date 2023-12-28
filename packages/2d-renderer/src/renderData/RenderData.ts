import { Vector2 } from "@angry-pixel/math";

export enum RenderLocation {
    WorldSpace,
    ViewPort,
}

export enum RenderDataType {
    Sprite,
    Text,
    Tilemap,
    Mask,
    Geometric,
    Video,
}

export interface IRenderData {
    type: RenderDataType;
    position: Vector2;
    location: RenderLocation;
    layer: string;
}
