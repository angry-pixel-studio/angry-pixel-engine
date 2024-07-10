import { Vector2 } from "../../../math";
import { ICollider, Polygon } from "../../../2d-physics";

/**
 * Rectangle shaped collider for 2d collisions.
 * @public
 * @category Components
 */
export class BoxCollider {
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
    _collider: ICollider<Polygon>;
}
