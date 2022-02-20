import { QuadItem } from "./QuadTree";
import { Shape } from "./shape/Shape";

export class ColliderData implements QuadItem {
    constructor(
        public shape: Shape,
        public layer: string,
        public id: string,
        public updateCollisions: boolean,
        public physics: boolean,
        public rigidBody: boolean
    ) {}

    // For QuadTree
    public get x(): number {
        return this.shape.boundingBox.x;
    }

    public get y(): number {
        return this.shape.boundingBox.y;
    }

    public get x1(): number {
        return this.shape.boundingBox.x1;
    }

    public get y1(): number {
        return this.shape.boundingBox.y1;
    }
}
