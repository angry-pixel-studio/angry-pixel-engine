import { ICollisionMethod } from "./ICollisionMethod";
import { ICollisionResolution, ICollisionResolver } from "../resolver/ICollisionResolver";
import { Circumference, IShape, Polygon } from "../../component/Shape";

export class AABBMethod implements ICollisionMethod {
    constructor(
        private readonly AABBResolver: ICollisionResolver,
        private readonly circumferenceAABBResolver: ICollisionResolver,
        private readonly circumferenceResolver: ICollisionResolver,
    ) {}

    findCollision(shapeA: IShape, shapeB: IShape): ICollisionResolution {
        if (shapeA instanceof Polygon && shapeB instanceof Polygon) {
            return this.AABBResolver.resolve(shapeA, shapeB);
        } else if (shapeA instanceof Circumference && shapeB instanceof Polygon) {
            return this.circumferenceAABBResolver.resolve(shapeA, shapeB);
        } else if (shapeA instanceof Polygon && shapeB instanceof Circumference) {
            return this.circumferenceAABBResolver.resolve(shapeB, shapeA, true);
        } else if (shapeA instanceof Circumference && shapeB instanceof Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        }
    }
}
