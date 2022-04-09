import { Shape, ShapeType } from "../shape/Shape";
import { CollisionResolution } from "../resolver/CollisionResolver";
import { Circumference } from "../shape/Circumference";
import { CollisionMethod } from "./CollisionMethod";
import { AABBResolver } from "../resolver/AABBResolver";
import { CircumferenceAABBResolver } from "../resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "../resolver/CircumferenceResolver";
import { Rectangle } from "../shape/Rectangle";

export class AABBMethod implements CollisionMethod {
    constructor(
        private readonly AABBResolver: AABBResolver,
        private readonly circumferenceAABBResolver: CircumferenceAABBResolver,
        private readonly circumferenceResolver: CircumferenceResolver
    ) {}

    getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null {
        if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Polygon) {
            return this.AABBResolver.resolve(shapeA as Rectangle, shapeB as Rectangle);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Polygon) {
            return this.circumferenceAABBResolver.resolve(shapeA as Circumference, shapeB as Rectangle);
        } else if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceAABBResolver.resolve(shapeB as Circumference, shapeA as Rectangle, true);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceResolver.resolve(shapeA as Circumference, shapeB as Circumference);
        }

        return null;
    }
}
