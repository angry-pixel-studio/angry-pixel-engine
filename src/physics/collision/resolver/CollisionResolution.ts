import { Vector2 } from "../../../math/Vector2";

export interface CollisionResolution {
    penetration: number;
    direction: Vector2;
    displacementDirection: Vector2;
}
