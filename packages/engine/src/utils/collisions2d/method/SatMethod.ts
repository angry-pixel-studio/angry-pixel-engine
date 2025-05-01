import { inject, injectable } from "@ioc";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { CollisionMethod } from "./CollisionMethod";
import { CollisionResolution, CollisionResolver } from "../resolver/CollisionResolver";
import { Circumference, Shape } from "../Shape";

@injectable(DEPENDENCY_TYPES.CollisionResolutionMethod)
export class SatMethod implements CollisionMethod {
    constructor(
        @inject(DEPENDENCY_TYPES.CollisionCircumferenceResolver)
        private readonly circumferenceResolver: CollisionResolver,
        @inject(DEPENDENCY_TYPES.CollisionSatResolver) private readonly satResolver: CollisionResolver,
    ) {}

    public findCollision(shapeA: Shape, shapeB: Shape): CollisionResolution {
        if (shapeA instanceof Circumference && shapeB instanceof Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
