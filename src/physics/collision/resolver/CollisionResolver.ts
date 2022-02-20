import { CollisionResolution } from "./CollisionResolution";
import { Shape } from "../shape/Shape";

export interface CollisionResolver {
    getCollisionData(shapeA: Shape, shapeB: Shape): CollisionResolution | null;
}
