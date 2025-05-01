import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * BallCollider component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const ballCollider = new BallCollider({
 *   radius: 16,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export interface BallColliderOptions {
    /** Circumference radius */
    radius: number;
    /** X-Y axis offset */
    offset: Vector2;
    /** Collision layer*/
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
}

/**
 * The BallCollider component defines a circular collision shape for an entity.\
 * It can be used for both physics interactions and collision detection.\
 * The collider's size is determined by its radius, and it can be offset from the entity's position.\
 * Collision layers allow controlling which objects can collide with each other.
 * @public
 * @category Components
 * @example
 * ```js
 * const ballCollider = new BallCollider({
 *   radius: 16,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export class BallCollider implements Collider {
    /** Circumference radius */
    radius: number = 0;
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** Collision layer*/
    layer: string = "";
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** @internal */
    shapes: Shape[] = [];

    constructor(options?: Partial<BallColliderOptions>) {
        Object.assign(this, options);
    }
}
