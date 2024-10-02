import { Vector2 } from "@math";
import { Shape } from "./Shape";

/**
 * Interface implemented by the collider components
 * @public
 * @category Collisions
 */
export interface Collider {
    /** Ignores collisions with layers in the array */
    ignoreCollisionsWithLayers: string[];
    /** Collision layer*/
    layer: string;
    /** X-Y axis offset */
    offset: Vector2;
    /** TRUE if this collider interact with rigid bodies */
    physics: boolean;
    /** @internal */
    shapes: Shape[];
}
