import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * Configuration object for EdgeCollider creation
 * @public
 * @category Components
 * @example
 * ```js
 * const edgeCollider = new EdgeCollider({
 *   vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
 *   rotation: 0,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export interface EdgeColliderOptions {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[];
    /** X-Y axis offset */
    offset: Vector2;
    /** Edges rotation in radians */
    rotation: number;
    /** Collision layer */
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
}

/**
 * Collider composed of lines defined by its vertices, for 2d collisions.
 * @public
 * @category Components
 * @example
 * ```js
 * const edgeCollider = new EdgeCollider({
 *   vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export class EdgeCollider implements Collider {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[] = [];
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** Edges rotation in radians */
    rotation: number = 0;
    /** Collision layer */
    layer: string = "";
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** @internal */
    shapes: Shape[] = [];

    constructor(options?: Partial<EdgeColliderOptions>) {
        Object.assign(this, options);
    }
}
