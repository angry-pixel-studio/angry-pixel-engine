import { Vector2 } from "angry-pixel-math";
import { Shape } from "../shape/Shape";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";

export class AABBResolver implements CollisionResolver {
    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private direction: Vector2 = new Vector2();
    private displacementDirection: Vector2 = new Vector2();

    public resolve({ boundingBox: boxA }: Shape, { boundingBox: boxB }: Shape): CollisionResolution | null {
        this.overlapX = Math.min(boxA.x1, boxB.x1) - Math.max(boxA.x, boxB.x);
        this.overlapY = Math.min(boxA.y1, boxB.y1) - Math.max(boxA.y, boxB.y);

        if (this.overlapX < 0 || this.overlapY < 0) {
            return null;
        }

        this.direction.set(Math.sign(boxB.x1 - boxA.x1), Math.sign(boxB.y1 - boxA.y1));

        if (this.overlapY < this.overlapX) {
            this.minOverlap = this.overlapY;
            this.displacementDirection.set(0, -this.direction.y);
            this.preventContainment(boxA.y, boxA.y1, boxB.y, boxB.y1);
        } else {
            this.minOverlap = this.overlapX;
            this.displacementDirection.set(-this.direction.x, this.overlapY === this.overlapX ? -this.direction.y : 0);
            this.preventContainment(boxA.x, boxA.x1, boxB.x, boxB.x1);
        }

        Vector2.unit(this.displacementDirection, this.displacementDirection);

        return {
            penetration: this.minOverlap,
            displacementDirection: this.displacementDirection.clone(),
            direction: Vector2.scale(new Vector2(), this.displacementDirection, -1),
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
