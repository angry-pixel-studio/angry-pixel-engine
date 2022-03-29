import { Vector2 } from "../../../math/Vector2";
import { Rectangle } from "../shape/Rectangle";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";

export class RectangleRectangleResolver implements CollisionResolver {
    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private direction: Vector2 = new Vector2();
    private displacementDirection: Vector2 = new Vector2();

    public resolve(shapeA: Rectangle, shapeB: Rectangle): CollisionResolution | null {
        this.overlapX =
            Math.min(shapeA.boundingBox.x1, shapeB.boundingBox.x1) -
            Math.max(shapeA.boundingBox.x, shapeB.boundingBox.x);
        this.overlapY =
            Math.min(shapeA.boundingBox.y1, shapeB.boundingBox.y1) -
            Math.max(shapeA.boundingBox.y, shapeB.boundingBox.y);

        if (this.overlapX < 0 || this.overlapY < 0) {
            return null;
        }

        this.direction.set(
            Math.sign(shapeB.boundingBox.x1 - shapeA.boundingBox.x1),
            Math.sign(shapeB.boundingBox.y1 - shapeA.boundingBox.y1)
        );

        if (this.overlapY < this.overlapX) {
            this.minOverlap = this.overlapY;
            this.displacementDirection.set(0, -this.direction.y);

            this.preventContainment(
                shapeA.boundingBox.y,
                shapeB.boundingBox.y,
                shapeA.boundingBox.y1,
                shapeB.boundingBox.y1
            );
        } else {
            this.minOverlap = this.overlapX;
            this.displacementDirection.set(-this.direction.x, this.overlapY === this.overlapX ? -this.direction.y : 0);
            this.preventContainment(
                shapeA.boundingBox.x,
                shapeB.boundingBox.x,
                shapeA.boundingBox.x1,
                shapeB.boundingBox.x1
            );
        }

        return {
            penetration: this.minOverlap,
            displacementDirection: this.displacementDirection.clone(),
            direction: this.direction.clone(),
        };
    }

    private preventContainment(min1: number, max1: number, min2: number, max2: number): void {
        if ((min1 > min2 && max1 < max2) || (min2 > min1 && max2 < max1)) {
            const minSep = Math.abs(min1 - min2);
            const maxSep = Math.abs(max1 - max2);

            if (minSep < maxSep) {
                this.minOverlap += minSep;
            } else {
                this.minOverlap += maxSep;
                Vector2.scale(this.displacementDirection, this.displacementDirection, -1);
            }
        }
    }
}
