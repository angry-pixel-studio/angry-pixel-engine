import { Vector2 } from "math";
import { Shape } from "../Shape";

export interface CollisionResolution {
    penetration: number;
    direction: Vector2;
}

export interface CollisionResolver {
    resolve(shapeA: Shape, shapeB: Shape, invert?: boolean): CollisionResolution;
}
