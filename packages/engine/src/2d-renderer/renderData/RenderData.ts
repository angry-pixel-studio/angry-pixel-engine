import { Vector2 } from "../../math";

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
    Shadow,
}

export interface IRenderData {
    type: RenderDataType;
    position: Vector2;
    location: RenderLocation;
    layer: string;
}
