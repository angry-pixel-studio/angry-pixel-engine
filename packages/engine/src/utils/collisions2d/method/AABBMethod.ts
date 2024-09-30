import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { CollisionMethod } from "./CollisionMethod";
import { CollisionResolution, CollisionResolver } from "../resolver/CollisionResolver";
import { Circumference, Polygon, Shape } from "../Shape";

@injectable(TYPES.CollisionResolutionMethod)
export class AABBMethod implements CollisionMethod {
    constructor(
        @inject(TYPES.CollisionAABBResolver) private readonly AABBResolver: CollisionResolver,
        @inject(TYPES.CollisionCircumferenceAABBResolver) private readonly circumferenceAABBResolver: CollisionResolver,
        @inject(TYPES.CollisionCircumferenceResolver) private readonly circumferenceResolver: CollisionResolver,
    ) {}

    findCollision(shapeA: Shape, shapeB: Shape): CollisionResolution {
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
