import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference } from "../Shape";

@injectable(SYMBOLS.CollisionCircumferenceResolver)
export class CircumferenceResolver implements CollisionResolver {
    private distance: Vector2 = new Vector2();
    /** Reused return direction; callers that store CollisionResolution must copy `direction`. */
    private readonly outDirection: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): CollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        const len = this.distance.magnitude;
        const rSum = shapeA.radius + shapeB.radius;
        if (len > rSum) return undefined;

        Vector2.unit(this.outDirection, this.distance);

        return {
            direction: this.outDirection,
            penetration: rSum - len,
        };
    }
}
