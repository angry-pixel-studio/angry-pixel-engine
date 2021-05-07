import { CollisionData } from "../CollisionData";
import { Shape } from "../Shape/Shape";

export interface ICollisionResolver {
    getCollisionData(shape1: Shape, shape2: Shape): CollisionData | null;
}
