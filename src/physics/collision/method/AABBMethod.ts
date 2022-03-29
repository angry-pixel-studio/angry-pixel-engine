import { Shape, ShapeType } from "../shape/Shape";
import { CollisionResolution } from "../resolver/CollisionResolver";
import { Circumference } from "../shape/Circumference";
import { CollisionMethod } from "./CollisionMethod";
import { RectangleRectangleResolver } from "../resolver/RectangleRectangleResolver";
import { CircumferenceRectangleResolver } from "../resolver/CircumferenceRectangleResolver";
import { CircumferenceCircumferenceResolver } from "../resolver/CircumferenceCircumferenceResolver";
import { Rectangle } from "../shape/Rectangle";

export class AABBMethod implements CollisionMethod {
    constructor(
        private readonly rectangleRectangleResolver: RectangleRectangleResolver,
        private readonly circumferenceRectangleResolver: CircumferenceRectangleResolver,
        private readonly circumferenceCircumferenceResolver: CircumferenceCircumferenceResolver
    ) {}

    getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null {
        if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Polygon) {
            return this.rectangleRectangleResolver.resolve(shapeA as Rectangle, shapeB as Rectangle);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Polygon) {
            return this.circumferenceRectangleResolver.resolve(shapeA as Circumference, shapeB as Rectangle);
        } else if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceRectangleResolver.resolve(shapeB as Circumference, shapeA as Rectangle, true);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceCircumferenceResolver.resolve(shapeA as Circumference, shapeB as Circumference);
        }

        return null;
    }
}
