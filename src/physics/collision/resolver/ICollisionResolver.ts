import { CollisionData } from "../CollisionData";
import { Shape } from "../shape/Shape";

export interface ICollisionResolver {
    getCollisionData(shape1: Shape, shape2: Shape): CollisionData | null;
}
