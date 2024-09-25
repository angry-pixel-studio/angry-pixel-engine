import { inject, injectable } from "ioc";
import { TYPES } from "config/types";
import { CollisionMethod } from "./CollisionMethod";
import { CollisionResolution, CollisionResolver } from "../resolver/CollisionResolver";
import { Circumference, Shape } from "../Shape";

@injectable(TYPES.CollisionResolutionMethod)
export class SatMethod implements CollisionMethod {
    constructor(
        @inject(TYPES.CollisionCircumferenceResolver) private readonly circumferenceResolver: CollisionResolver,
        @inject(TYPES.CollisionSatResolver) private readonly satResolver: CollisionResolver,
    ) {}

    public findCollision(shapeA: Shape, shapeB: Shape): CollisionResolution {
        if (shapeA instanceof Circumference && shapeB instanceof Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
