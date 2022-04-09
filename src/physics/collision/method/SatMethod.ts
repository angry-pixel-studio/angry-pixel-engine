import { Shape, ShapeType } from "../shape/Shape";
import { CollisionResolution } from "../resolver/CollisionResolver";
import { CollisionMethod } from "./CollisionMethod";
import { CircumferenceResolver } from "../resolver/CircumferenceResolver";
import { Circumference } from "../shape/Circumference";
import { SatResolver } from "../resolver/SatResolver";

export class SatMethod implements CollisionMethod {
    constructor(
        private readonly circumferenceResolver: CircumferenceResolver,
        private readonly satResolver: SatResolver
    ) {}

    public getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null {
        if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceResolver.resolve(shapeA as Circumference, shapeB as Circumference);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
