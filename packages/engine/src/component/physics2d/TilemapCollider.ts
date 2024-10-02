import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * Configuration object for TilemapCollider creation
 * @public
 * @category Components
 * @example
 * ```js
 * const tilemapCollider = new TilemapCollider({
 *   composite: true,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export interface TilemapColliderOptions {
    /** Generate colliders that represent the outer lines of the tile map */
    composite: boolean;
    /** Collision layer */
    layer: string;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
    /** X-Y axis offset */
    offset: Vector2;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
}

/**
 * Generates rectangle colliders for the map edge tiles (or lines if composite is TRUE).\
 * **Limitations:** At the moment, it is not possible to modify the shape of the collider once it has been generated.
 * @public
 * @category Components
 * @example
 * ```js
 * const tilemapCollider = new TilemapCollider({
 *   composite: true,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export class TilemapCollider implements Collider {
    /** Generate colliders that represent the outer lines of the tile map */
    composite: boolean = true;
    /** Collision layer */
    layer: string = "";
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** @internal */
    shapes: Shape[] = [];

    constructor(options?: Partial<TilemapColliderOptions>) {
        Object.assign(this, options);
    }
}
