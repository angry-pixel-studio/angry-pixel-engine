import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * Configuration object for BoxCollider creation
 * @public
 * @category Components
 * @example
 * ```js
 * const boxCollider = new BoxCollider({
 *   width: 16,
 *   height: 16,
 *   rotation: 0,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export interface BoxColliderOptions {
    /** Collision layer*/
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** Width of the rectangle */
    width: number;
    /** Height of the rectangle */
    height: number;
    /** X-Y axis offset */
    offset: Vector2;
    /** Rectangle rotation in radians */
    rotation: number;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
}

/**
 * Rectangle shaped collider for 2d collisions.
 * @public
 * @category Components
 * @example
 * ```js
 * const boxCollider = new BoxCollider({
 *   width: 16,
 *   height: 16,
 *   rotation: 0,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export class BoxCollider implements Collider {
    /** Collision layer*/
    layer: string = "";
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** Width of the rectangle */
    width: number = 0;
    /** Height of the rectangle */
    height: number = 0;
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** Rectangle rotation in radians */
    rotation: number = 0;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** @internal */
    shapes: Shape[] = [];

    constructor(options?: Partial<BoxColliderOptions>) {
        Object.assign(this, options);
    }
}
