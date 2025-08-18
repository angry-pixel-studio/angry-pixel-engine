import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { CollisionMethod } from "./CollisionMethod";
import { CollisionResolution, CollisionResolver } from "../resolver/CollisionResolver";
import { Circumference, Shape } from "../Shape";

@injectable(SYMBOLS.CollisionResolutionMethod)
export class SatMethod implements CollisionMethod {
    constructor(
        @inject(SYMBOLS.CollisionCircumferenceResolver)
        private readonly circumferenceResolver: CollisionResolver,
        @inject(SYMBOLS.CollisionSatResolver) private readonly satResolver: CollisionResolver,
    ) {}

    public findCollision(shapeA: Shape, shapeB: Shape): CollisionResolution {
        if (shapeA instanceof Circumference && shapeB instanceof Circumference) {
            return this.circumferenceResolver.resolve(shapeA, shapeB);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
