import { CollisionResolution } from "../resolver/CollisionResolver";
import { Shape } from "../Shape";

/**
 * Resolution phase collision methods
 * - AABB (axis-aligned bounding box): It only works with axis-aligned rectangles and lines and cimcurferences.
 * - SAT (Separation axis theorem): It works with every type of shape.
 * @category Config
 * @public
 */
export enum CollisionMethods {
    AABB,
    SAT,
}

export interface CollisionMethod {
    findCollision(shapeA: Shape, shapeB: Shape): CollisionResolution;
}
