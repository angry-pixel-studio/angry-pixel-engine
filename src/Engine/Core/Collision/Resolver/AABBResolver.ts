import { Rectangle } from "../../../Math/Rectangle";
import { Vector2 } from "../../../Math/Vector2";
import { CollisionData } from "../CollisionData";
import { Shape } from "../Shape/Shape";
import { ICollisionResolver } from "./ICollisionResolver";

export class AABBResolver implements ICollisionResolver {
    private shape1Rect: Rectangle = new Rectangle(0, 0, 0, 0);
    private shape2Rect: Rectangle = new Rectangle(0, 0, 0, 0);

    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private displaceDirection: Vector2 = new Vector2();

    getCollisionData(shape1: Shape, shape2: Shape): CollisionData | null {
        this.setShapeRect(shape1, this.shape1Rect);
        this.setShapeRect(shape2, this.shape2Rect);

        this.overlapX =
            Math.min(this.shape1Rect.x1, this.shape2Rect.x1) - Math.max(this.shape1Rect.x, this.shape2Rect.x);
        this.overlapY =
            Math.min(this.shape1Rect.y1, this.shape2Rect.y1) - Math.max(this.shape1Rect.y, this.shape2Rect.y);

        if (this.overlapX < 0 || this.overlapY < 0) {
            return null;
        }

        if (this.overlapY < this.overlapX) {
            this.minOverlap = this.overlapY;
            this.displaceDirection.set(0, Math.sign(this.shape1Rect.y1 - this.shape2Rect.y1));

            this.preventContainment(this.shape1Rect.y, this.shape2Rect.y, this.shape1Rect.y1, this.shape2Rect.y1);
        } else {
            this.minOverlap = this.overlapX;
            this.displaceDirection.set(
                Math.sign(this.shape1Rect.x1 - this.shape2Rect.x1),
                this.overlapY === this.overlapX ? Math.sign(this.shape1Rect.y1 - this.shape2Rect.y1) : 0
            );
            this.preventContainment(this.shape1Rect.x, this.shape2Rect.x, this.shape1Rect.x1, this.shape2Rect.x1);
        }

        return new CollisionData(this.minOverlap, this.displaceDirection);
    }

    private setShapeRect(shape: Shape, rect: Rectangle): void {
        rect.set(shape.position.x - shape.width / 2, shape.position.y - shape.height / 2, shape.width, shape.height);
    }

    private preventContainment(min1: number, max1: number, min2: number, max2: number): void {
        if ((min1 > min2 && max1 < max2) || (min2 > min1 && max2 < max1)) {
            const minSep = Math.abs(min1 - min2);
            const maxSep = Math.abs(max1 - max2);

            if (minSep < maxSep) {
                this.minOverlap += minSep;
            } else {
                this.minOverlap += maxSep;
                Vector2.scale(this.displaceDirection, this.displaceDirection, -1);
            }
        }
    }
}
