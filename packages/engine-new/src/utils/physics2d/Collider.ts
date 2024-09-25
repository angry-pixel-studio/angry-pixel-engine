import { Vector2 } from "math";
import { Shape } from "./Shape";

export interface Collider {
    ignoreCollisionsWithLayers: string[];
    layer: string;
    offset: Vector2;
    physics: boolean;
    shapes: Shape[];
    updateCollisions: boolean;
}
