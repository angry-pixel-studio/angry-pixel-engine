import { Vector2 } from "../../../math";
import { Circumference, ICollider } from "../../../2d-physics";

/**
 * Circumference shaped collider for 2d collisions.
 * @public
 * @category Components
 */
export class BallCollider {
    /** Circumference radius */
    radius: number = 0;
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** Collision layer*/
    layer: string = "";
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** @internal */
    _collider: ICollider<Circumference>;
}
