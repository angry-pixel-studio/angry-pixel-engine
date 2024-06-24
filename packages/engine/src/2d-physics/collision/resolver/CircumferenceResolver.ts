import { Vector2 } from "../../../math";
import { ICollisionResolution, ICollisionResolver } from "./ICollisionResolver";
import { Circumference } from "../../component/Shape";

export class CircumferenceResolver implements ICollisionResolver {
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): ICollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        if (this.distance.magnitude > shapeA.radius + shapeB.radius) return undefined;

        Vector2.unit(this.direction, this.distance);

        return {
            direction: this.direction.clone(),
            penetration: shapeA.radius + shapeB.radius - this.distance.magnitude,
        };
    }
}
