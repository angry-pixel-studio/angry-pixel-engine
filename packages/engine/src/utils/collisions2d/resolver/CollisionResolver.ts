import { Vector2 } from "@math";
import { Shape } from "../Shape";

/**
 * Contains information about the collision
 * @public
 * @category Collisions
 */
export interface CollisionResolution {
    /**
     * Intersection between both colliders expressed in pixels
     * @public
     */
    penetration: number;
    /**
     * Collision direction
     * @public
     */
    direction: Vector2;
}

export interface CollisionResolver {
    resolve(shapeA: Shape, shapeB: Shape, invert?: boolean): CollisionResolution;
}
