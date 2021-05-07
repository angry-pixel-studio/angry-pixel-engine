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

        if (this.shape1Rect.overlappingRectangle(this.shape2Rect) === false) {
            return null;
        }

        this.overlapX = Math.min(this.shape1Rect.x1 - this.shape2Rect.x, this.shape2Rect.x1 - this.shape1Rect.x);
        this.overlapY = Math.min(this.shape1Rect.y1 - this.shape2Rect.y, this.shape2Rect.y1 - this.shape1Rect.y);

        if (this.overlapX === this.overlapY) {
            this.minOverlap = this.overlapX;
            this.displaceDirection.set(1, 1);
        } else if (this.overlapX < this.overlapY) {
            this.minOverlap = this.overlapX;
            this.displaceDirection.set(1, 0);
        } else {
            this.minOverlap = this.overlapY;
            this.displaceDirection.set(0, 1);
        }

        this.displaceDirection.x *= Math.sign(this.shape1Rect.x1 - this.shape2Rect.x1);
        this.displaceDirection.y *= Math.sign(this.shape1Rect.y1 - this.shape2Rect.y1);

        return new CollisionData(this.minOverlap, this.displaceDirection);
    }

    private setShapeRect(shape: Shape, rect: Rectangle): void {
        rect.set(shape.position.x - shape.width / 2, shape.position.y - shape.height / 2, shape.width, shape.height);
    }
}
