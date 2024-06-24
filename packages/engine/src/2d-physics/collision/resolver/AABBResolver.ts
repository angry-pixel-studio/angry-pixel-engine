import { Rectangle, Vector2 } from "../../../math";
import { ICollisionResolution, ICollisionResolver } from "./ICollisionResolver";
import { IShape } from "../../component/Shape";

export class AABBResolver implements ICollisionResolver {
    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private direction: Vector2 = new Vector2();
    private resolutionDirection: Vector2 = new Vector2();

    public resolve({ boundingBox: boxA }: IShape, { boundingBox: boxB }: IShape): ICollisionResolution {
        this.overlapX = Math.min(boxA.x1, boxB.x1) - Math.max(boxA.x, boxB.x);
        this.overlapY = Math.min(boxA.y1, boxB.y1) - Math.max(boxA.y, boxB.y);

        if (this.overlapX < 0 || this.overlapY < 0) return undefined;

        this.checkOverlapForLines(boxA, boxB);

        this.direction.set(Math.sign(boxB.center.x - boxA.center.x), Math.sign(boxB.center.y - boxA.center.y));

        this.preventContainment(boxA, boxB);

        if (this.overlapY < this.overlapX) {
            this.minOverlap = this.overlapY;
            this.resolutionDirection.set(0, this.direction.y);
        } else {
            this.minOverlap = this.overlapX;
            this.resolutionDirection.set(this.direction.x, this.overlapY === this.overlapX ? this.direction.y : 0);
        }

        return {
            direction: Vector2.unit(new Vector2(), this.resolutionDirection),
            penetration: this.minOverlap,
        };
    }

    private checkOverlapForLines(boxA: Rectangle, boxB: Rectangle) {
        if ((boxA.width === 0 || boxB.width === 0) && this.overlapX === 0) {
            this.overlapX = Math.min(Math.abs(boxA.x - boxB.x), Math.abs(boxA.x1 - boxB.x1));
        }

        if ((boxA.height === 0 || boxB.height === 0) && this.overlapY === 0) {
            this.overlapY = Math.min(Math.abs(boxA.y - boxB.y), Math.abs(boxA.y1 - boxB.y1));
        }
    }

    private preventContainment(boxA: Rectangle, boxB: Rectangle): void {
        if (this.overlapY > 0) {
            if ((boxA.y1 > boxB.y1 && boxA.y < boxB.y) || (boxA.y1 < boxB.y1 && boxA.y > boxB.y)) {
                const minSep = Math.abs(boxA.y - boxB.y);
                const maxSep = Math.abs(boxA.y1 - boxB.y1);

                this.overlapY += minSep < maxSep ? minSep : maxSep;
            }
        }

        if (this.overlapX > 0) {
            if ((boxA.x1 > boxB.x1 && boxA.x < boxB.x) || (boxA.x1 < boxB.x1 && boxA.x > boxB.x)) {
                const minSep = Math.abs(boxA.x - boxB.x);
                const maxSep = Math.abs(boxA.x1 - boxB.x1);

                this.overlapX += minSep < maxSep ? minSep : maxSep;
            }
        }
    }
}
