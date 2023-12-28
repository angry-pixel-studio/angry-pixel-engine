import { Vector2 } from "@angry-pixel/math";
import { Circumference } from "../shape/Circumference";
import { ICollisionResolution } from "../ICollisionResolution";
import { ICollisionResolver } from "./ICollisionResolver";

export class CircumferenceResolver implements ICollisionResolver {
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): ICollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        if (this.distance.magnitude > shapeA.radius + shapeB.radius) {
            return null;
        }

        Vector2.unit(this.direction, this.distance);

        return {
            direction: this.direction.clone(),
            displacementDirection: Vector2.scale(new Vector2(), this.direction, -1),
            penetration: shapeA.radius + shapeB.radius - this.distance.magnitude,
        };
    }
}
