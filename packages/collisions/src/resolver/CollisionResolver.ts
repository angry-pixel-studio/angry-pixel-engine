import { Vector2 } from "@angry-pixel/math";
import { Shape } from "../Shape";

/**
 * Contains detailed information about a collision between two shapes, including the penetration depth
 * and direction vector. Used to determine how to resolve and separate colliding objects.
 * @example
 * ```typescript
 * // Example collision resolution between two shapes
 * const resolution: CollisionResolution = {
 *   penetration: 5, // Shapes overlap by 5 pixels
 *   direction: new Vector2(1, 0) // Collision along X axis
 * };
 * ```
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
