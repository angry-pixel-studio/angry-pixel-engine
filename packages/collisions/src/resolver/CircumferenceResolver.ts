import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference } from "../Shape";
import { CollisionResolutionPool } from "./CollisionResolutionPool";

@injectable(SYMBOLS.CollisionCircumferenceResolver)
export class CircumferenceResolver implements CollisionResolver {
    @inject(SYMBOLS.CollisionResolutionPool) private readonly collisionResolutionPool: CollisionResolutionPool;

    private distance: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Circumference): CollisionResolution {
        Vector2.subtract(this.distance, shapeB.position, shapeA.position);

        const len = this.distance.magnitude;
        const rSum = shapeA.radius + shapeB.radius;
        if (len > rSum) return undefined;

        const resolution = this.collisionResolutionPool.get();
        resolution.penetration = rSum - len;
        Vector2.unit(resolution.direction, this.distance);

        return resolution;
    }
}
