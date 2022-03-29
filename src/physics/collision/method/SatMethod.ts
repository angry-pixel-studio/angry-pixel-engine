import { Shape, ShapeType } from "../shape/Shape";
import { CollisionResolution } from "../resolver/CollisionResolver";
import { CollisionMethod } from "./CollisionMethod";
import { PolygonPolygonResolver } from "../resolver/PolygonPolygonResolver";
import { CircumferencePolygonResolver } from "../resolver/CircumferencePolygonResolver";
import { CircumferenceCircumferenceResolver } from "../resolver/CircumferenceCircumferenceResolver";
import { Circumference } from "../shape/Circumference";
import { Polygon } from "../shape/Polygon";

export class SatMethod implements CollisionMethod {
    constructor(
        private readonly polygonPolygonResolver: PolygonPolygonResolver,
        private readonly circumferencePolygonResolver: CircumferencePolygonResolver,
        private readonly circumferenceCircumferenceResolver: CircumferenceCircumferenceResolver
    ) {}

    public getCollisionResolution(shapeA: Shape, shapeB: Shape): CollisionResolution | null {
        if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Polygon) {
            return this.polygonPolygonResolver.resolve(shapeA as Polygon, shapeB as Polygon);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Polygon) {
            return this.circumferencePolygonResolver.resolve(shapeA as Circumference, shapeB as Polygon);
        } else if (shapeA.type === ShapeType.Polygon && shapeB.type === ShapeType.Circumference) {
            return this.circumferencePolygonResolver.resolve(shapeB as Circumference, shapeA as Polygon, true);
        } else if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceCircumferenceResolver.resolve(shapeA as Circumference, shapeB as Circumference);
        }

        return null;
    }
}
