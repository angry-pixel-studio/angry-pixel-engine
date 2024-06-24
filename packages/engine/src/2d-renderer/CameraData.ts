import { Vector2 } from "../math";

export interface ICameraData {
    depth: number;
    layers: string[];
    position: Vector2;
    zoom?: number;
}
