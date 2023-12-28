import { Vector2 } from "@angry-pixel/math";

/**
 * Contains information about the collision
 * @category Components
 * @public
 */
export interface ICollisionResolution {
    penetration: number;
    direction: Vector2;
    displacementDirection: Vector2;
}
