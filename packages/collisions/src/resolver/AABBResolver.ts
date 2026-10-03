import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "../symbols";
import { Rectangle, Vector2 } from "@angry-pixel/math";
import { CollisionResolution, CollisionResolver } from "./CollisionResolver";
import { Shape } from "../Shape";
import { CollisionResolutionPool } from "./CollisionResolutionPool";

@injectable(SYMBOLS.CollisionAABBResolver)
export class AABBResolver implements CollisionResolver {
    @inject(SYMBOLS.CollisionResolutionPool) private readonly collisionResolutionPool: CollisionResolutionPool;

    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private direction: Vector2 = new Vector2();
    private resolutionDirection: Vector2 = new Vector2();

    public resolve({ boundingBox: boxA }: Shape, { boundingBox: boxB }: Shape): CollisionResolution {
        this.overlapX = Math.min(boxA.x1, boxB.x1) - Math.max(boxA.x, boxB.x);
        this.overlapY = Math.min(boxA.y1, boxB.y1) - Math.max(boxA.y, boxB.y);

        if (this.overlapX < 0 || this.overlapY < 0) return undefined;

        this.checkOverlapForLines(boxA, boxB);

        this.direction.set(Math.sign(boxB.center.x - boxA.center.x), Math.sign(boxB.center.y - boxA.center.y));

        this.preventContainment(boxA, boxB);

        // a tie resolves on y; with the same center, either side is a valid exit
        if (this.overlapY <= this.overlapX) {
            this.minOverlap = this.overlapY;
            this.resolutionDirection.set(0, this.direction.y || 1);
        } else {
            this.minOverlap = this.overlapX;
            this.resolutionDirection.set(this.direction.x || 1, 0);
        }

        const resolution = this.collisionResolutionPool.get();
        Vector2.unit(resolution.direction, this.resolutionDirection);
        resolution.penetration = this.minOverlap;

        return resolution;
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
