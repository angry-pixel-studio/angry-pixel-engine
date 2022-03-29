import { Vector2 } from "../../../math/Vector2";
import { Circumference } from "../shape/Circumference";

import { CollisionResolution, CollisionResolver } from "./CollisionResolver";

export class CircumferenceCircumferenceResolver implements CollisionResolver {
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): CollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        if (this.distance.magnitude > shapeA.radius + shapeB.radius) {
            return null;
        }

        Vector2.unit(this.direction, this.distance);

        return {
            penetration: shapeA.radius + shapeB.radius - this.distance.magnitude,
            direction: this.direction.clone(),
            displacementDirection: Vector2.scale(new Vector2(), this.direction, -1),
        };
    }
}
