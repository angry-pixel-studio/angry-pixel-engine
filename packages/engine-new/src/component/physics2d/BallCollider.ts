import { Vector2 } from "math";
import { Collider, Shape } from "physics2d";

export interface BallColliderOptions {
    /** Circumference radius */
    radius: number;
    /** X-Y axis offset */
    offset: Vector2;
    /** Collision layer*/
    layer: string;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
}

/**
 * Circumference shaped collider for 2d collisions.
 * @public
 * @category Components
 */
export class BallCollider implements Collider {
    /** Circumference radius */
    radius: number = 0;
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();
    /** Collision layer*/
    layer: string = "";
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean = true;
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[] = [];
    /** @internal */
    shapes: Shape[] = [];
    /** @internal */
    updateCollisions: boolean = true;

    constructor(options: Partial<BallColliderOptions>) {
        Object.assign(this, options);
    }
}
