import { ICollisionResolution } from "../ICollisionResolution";
import { IShape, ShapeType } from "../shape/IShape";
import { ICollisionMethod } from "./ICollisionMethod";
import { ICollisionResolver } from "../resolver/ICollisionResolver";

export class AABBMethod implements ICollisionMethod {
    constructor(
        private readonly AABBResolver: ICollisionResolver,
        private readonly circumferenceAABBResolver: ICollisionResolver,
        private readonly circumferenceResolver: ICollisionResolver,
    ) {}

    getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null {
        if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Polygon) {
            return this.AABBResolver.resolve(shapeA, shapeB);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Polygon) {
            return this.circumferenceAABBResolver.resolve(shapeA, shapeB);
        } else if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceAABBResolver.resolve(shapeB, shapeA, true);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        }

        return null;
    }
}
