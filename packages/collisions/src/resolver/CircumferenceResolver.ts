import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference } from "../Shape";

@injectable(SYMBOLS.CollisionCircumferenceResolver)
export class CircumferenceResolver implements CollisionResolver {
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): CollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        if (this.distance.magnitude > shapeA.radius + shapeB.radius) return undefined;

        Vector2.unit(this.direction, this.distance);

        return {
            direction: this.direction.clone(),
            penetration: shapeA.radius + shapeB.radius - this.distance.magnitude,
        };
    }
}
