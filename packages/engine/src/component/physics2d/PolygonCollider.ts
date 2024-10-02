import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * Configuration object for PolygonCollider creation
 * @public
 * @category Components
 * @example
 * ```js
 * const polygonCollider = new PolygonCollider({
 *   vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
 *   rotation: 0,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export interface PolygonColliderOptions {
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
 * Polygon shaped Collider for 2d collisions. Only convex polygons are allowed.
 * @public
 * @category Components
 * @example
 * ```js
 * const polygonCollider = new PolygonCollider({
 *   vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
 *   rotation: 0,
 *   offset: new Vector2(),
 *   layer: "CollisionLayer",
 *   physics: true,
 *   ignoreCollisionsWithLayer: ["IgnoredLayer"]
 * });
 * ```
 */
export class PolygonCollider implements Collider {
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

    constructor(options?: Partial<PolygonColliderOptions>) {
        Object.assign(this, options);
    }
}
