import { Vector2 } from "@math";
import { Collider, Shape } from "@collisions2d";

/**
 * PolygonCollider component configuration
 * @public
 * @category Components Configuration
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
 * The PolygonCollider component defines a convex polygon-shaped collision area for an entity.\
 * It can be used for both physics interactions and collision detection.\
 * The collider's shape is determined by a series of vertices that form a closed convex polygon.\
 * Note that only convex polygons are supported - concave shapes must be broken into multiple convex polygons.\
 * The shape can be offset and rotated, and collision layers allow controlling which objects can collide with each other.
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
