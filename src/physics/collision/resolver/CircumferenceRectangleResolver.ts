import { clamp } from "../../../math/Utils";
import { Vector2 } from "../../../math/Vector2";
import { Circumference } from "../shape/Circumference";
import { Rectangle } from "../shape/Rectangle";
import { CollisionResolver, CollisionResolution } from "./CollisionResolver";

export class CircumferenceRectangleResolver implements CollisionResolver {
    private closestPoint: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Rectangle, invert: boolean = false): CollisionResolution {
        this.closestPoint.set(
            clamp(shapeA.position.x, shapeB.boundingBox.x, shapeB.boundingBox.x1),
            clamp(shapeA.position.y, shapeB.boundingBox.y, shapeB.boundingBox.y1)
        );

        Vector2.subtract(this.distance, this.closestPoint, shapeA.position);

        if (this.distance.magnitude > shapeA.radius) {
            return null;
        }

        Vector2.unit(this.direction, this.distance);

        return {
            penetration: shapeA.radius - this.distance.magnitude,
            direction: invert ? Vector2.scale(new Vector2(), this.direction, -1) : this.direction.clone(),
            displacementDirection: invert ? this.direction.clone() : Vector2.scale(new Vector2(), this.direction, -1),
        };
    }
}
