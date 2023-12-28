import { ICollisionResolution } from "../ICollisionResolution";
import { IShape, ShapeType } from "../shape/IShape";
import { ICollisionMethod } from "./ICollisionMethod";
import { ICollisionResolver } from "../resolver/ICollisionResolver";

export class SatMethod implements ICollisionMethod {
    constructor(
        private readonly circumferenceResolver: ICollisionResolver,
        private readonly satResolver: ICollisionResolver
    ) {}

    public getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null {
        if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
