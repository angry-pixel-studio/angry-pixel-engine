import { Vector2 } from "../../../math";
import { ICollider, Polygon } from "../../../2d-physics";

/**
 * Collider composed of lines defined by its vertices, for 2d collisions.
 * @public
 * @category Components
 */
export class EdgeCollider {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[];
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
    _colliders: ICollider<Polygon>[] = [];
}
