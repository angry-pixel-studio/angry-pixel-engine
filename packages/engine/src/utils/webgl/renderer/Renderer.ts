import { Vector2 } from "@math";

export enum RenderDataType {
    Sprite,
    Text,
    Tilemap,
    Mask,
    Geometric,
    Video,
    Darkness,
}

export interface CameraData {
    depth: number;
    layers: string[];
    position: Vector2;
    zoom: number;
}

export interface RenderData {
    type: RenderDataType;
    position: Vector2;
    layer: string;
}

export interface Renderer {
    readonly type: RenderDataType;

    render(renderData: RenderData, cameraData: CameraData, lastRender: RenderDataType): boolean;
}
