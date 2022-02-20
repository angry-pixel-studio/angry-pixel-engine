import { CollisionResolution } from "./CollisionResolution";
import { Shape } from "../shape/Shape";

export interface CollisionResolver {
    getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null;
}
