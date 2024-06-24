import { Vector2 } from "../../../math";
import { ICollider, Polygon } from "../../../2d-physics";

/**
 * Polygon shaped Collider for 2d collisions. Only convex polygons are allowed.
 * @public
 * @category Components
 */
export class PolygonCollider {
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
    /** @internal */
    _collider: ICollider<Polygon>;
}
