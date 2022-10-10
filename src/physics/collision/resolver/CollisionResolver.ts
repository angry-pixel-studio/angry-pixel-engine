import { Shape } from "../shape/Shape";
import { Vector2 } from "angry-pixel-math";

export interface CollisionResolution {
    penetration: number;
    direction: Vector2;
    displacementDirection: Vector2;
}

export interface CollisionResolver {
    resolve(shapeA: Shape, shapeB: Shape): CollisionResolution | null;
}
