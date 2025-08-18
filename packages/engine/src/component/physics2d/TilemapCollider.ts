import { Vector2 } from "@angry-pixel/math";
import { Collider, Shape } from "@angry-pixel/collisions";

/**
 * TilemapCollider component configuration
 * @public
 * @category Components Configuration
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
 * The TilemapCollider component automatically generates collision shapes for tilemap edges.\
 * When composite is FALSE, it creates individual rectangle colliders for each edge tile.\
 * When composite is TRUE, it optimizes by generating connected line segments that follow the tilemap's outer edges.\
 * This is useful for efficiently handling collision detection with tilemap boundaries.\
 * **Limitations:** The collider shapes are generated once and cannot be modified after creation.
 * To update the collision shapes, you must create a new TilemapCollider instance.
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
    /** @internal */
    static componentName: string = "TilemapCollider";

    constructor(options?: Partial<TilemapColliderOptions>) {
        Object.assign(this, options);
    }
}
