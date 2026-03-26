import { injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { clamp, Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference, Polygon } from "../Shape";

@injectable(SYMBOLS.CollisionCircumferenceAABBResolver)
export class CircumferenceAABBResolver implements CollisionResolver {
    private closestPoint: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();
    /** Reused return direction; callers that store CollisionResolution must copy `direction`. */
    private readonly outDirection: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Polygon, invert: boolean = false): CollisionResolution {
        this.closestPoint.set(
            clamp(shapeA.position.x, shapeB.boundingBox.x, shapeB.boundingBox.x1),
            clamp(shapeA.position.y, shapeB.boundingBox.y, shapeB.boundingBox.y1),
        );

        Vector2.subtract(this.distance, this.closestPoint, shapeA.position);

        const len = this.distance.magnitude;
        if (len > shapeA.radius) return undefined;

        Vector2.unit(this.direction, this.distance);

        if (invert) Vector2.scale(this.outDirection, this.direction, -1);
        else this.outDirection.copy(this.direction);

        return {
            direction: this.outDirection,
            penetration: shapeA.radius - len,
        };
    }
}
