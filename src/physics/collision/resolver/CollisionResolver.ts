import { Shape } from "../shape/Shape";
import { Vector2 } from "../../../math/Vector2";

export interface CollisionResolution {
    penetration: number;
    direction: Vector2;
    displacementDirection: Vector2;
}

export interface CollisionResolver {
    resolve(shapeA: Shape, shapeB: Shape): CollisionResolution | null;
}
