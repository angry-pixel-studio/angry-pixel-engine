import { Shape } from "../shape/Shape";
import { CollisionResolution } from "../resolver/CollisionResolver";

export interface CollisionMethod {
    getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null;
}
