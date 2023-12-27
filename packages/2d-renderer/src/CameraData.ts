import { Vector2 } from "@angry-pixel/math";

export interface ICameraData {
    depth: number;
    layers: string[];
    position: Vector2;
    zoom?: number;
}
