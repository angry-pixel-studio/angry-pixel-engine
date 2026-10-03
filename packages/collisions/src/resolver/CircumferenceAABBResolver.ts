import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { clamp, Rectangle, Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Circumference, Polygon } from "../Shape";
import { CollisionResolutionPool } from "./CollisionResolutionPool";

@injectable(SYMBOLS.CollisionCircumferenceAABBResolver)
export class CircumferenceAABBResolver implements CollisionResolver {
    @inject(SYMBOLS.CollisionResolutionPool) private readonly collisionResolutionPool: CollisionResolutionPool;

    private closestPoint: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private direction: Vector2 = new Vector2();

    public resolve(shapeA: Circumference, shapeB: Polygon, invert: boolean = false): CollisionResolution {
        this.closestPoint.set(
            clamp(shapeA.position.x, shapeB.boundingBox.x, shapeB.boundingBox.x1),
            clamp(shapeA.position.y, shapeB.boundingBox.y, shapeB.boundingBox.y1),
        );

        Vector2.subtract(this.distance, this.closestPoint, shapeA.position);

        const lenSq = this.distance.x * this.distance.x + this.distance.y * this.distance.y;
        if (lenSq > shapeA.radius * shapeA.radius) return undefined;

        const len = Math.sqrt(lenSq);

        let penetration: number;
        if (len > 0) {
            Vector2.unit(this.direction, this.distance);
            penetration = shapeA.radius - len;
        } else {
            // the center is on or inside the box: exit through the nearest face
            penetration = shapeA.radius + this.setDirectionToNearestFace(shapeA.position, shapeB.boundingBox);
        }

        if (invert) Vector2.scale(this.direction, this.direction, -1);

        const resolution = this.collisionResolutionPool.get();
        resolution.direction.copy(this.direction);
        resolution.penetration = penetration;

        return resolution;
    }

    private setDirectionToNearestFace({ x, y }: Vector2, box: Rectangle): number {
        const left = x - box.x;
        const right = box.x1 - x;
        const bottom = y - box.y;
        const top = box.y1 - y;
        const nearest = Math.min(left, right, bottom, top);

        if (nearest === left) this.direction.set(1, 0);
        else if (nearest === right) this.direction.set(-1, 0);
        else if (nearest === bottom) this.direction.set(0, 1);
        else this.direction.set(0, -1);

        return nearest;
    }
}
