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

        const rSum = shapeA.radius + shapeB.radius;
        const lenSq = this.distance.x * this.distance.x + this.distance.y * this.distance.y;
        if (lenSq > rSum * rSum) return undefined;

        const len = Math.sqrt(lenSq);

        const resolution = this.collisionResolutionPool.get();
        resolution.penetration = rSum - len;

        // concentric circumferences have no direction between them
        if (len > 0) Vector2.unit(resolution.direction, this.distance);
        else resolution.direction.set(1, 0);

        return resolution;
    }
}
