import { ICollisionMethod } from "./ICollisionMethod";
import { ICollisionResolution, ICollisionResolver } from "../resolver/ICollisionResolver";
import { Circumference, IShape } from "../../component/Shape";

export class SatMethod implements ICollisionMethod {
    constructor(
        private readonly circumferenceResolver: ICollisionResolver,
        private readonly satResolver: ICollisionResolver,
    ) {}

    public findCollision(shapeA: IShape, shapeB: IShape): ICollisionResolution {
        if (shapeA instanceof Circumference && shapeB instanceof Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
