import { Vector2 } from "@angry-pixel/math";
import { Collider, Shape } from "@angry-pixel/collisions";

/**
 * EdgeCollider component configuration
 * @public
 * @category Components Configuration
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
 * The EdgeCollider component defines a collision shape made up of connected line segments.\
 * It can be used for both physics interactions and collision detection.\
 * The collider's shape is determined by a series of vertices that form edges between them.\
 * The shape can be offset and rotated, and collision layers allow controlling which objects can collide with each other.
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
    /** @internal */
    static componentName: string = "EdgeCollider";

    constructor(options?: Partial<EdgeColliderOptions>) {
        Object.assign(this, options);
    }
}
