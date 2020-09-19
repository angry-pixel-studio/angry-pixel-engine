import Rectangle from "./../../Helper/Rectangle";
import ICollider from "./ICollider";

export default class QuadTree {
    readonly maxObjects: number = 3;
    readonly maxLevels: number = 5;

    // Quads cardinal positions
    readonly sw: number = 0;
    readonly se: number = 1;
    readonly nw: number = 2;
    readonly ne: number = 3;

    private level: number;
    private objects: Array<ICollider> = [];
    public quadrants: Array<QuadTree> = [];
    public bounds: Rectangle;

    constructor(level: number, bounds: Rectangle) {
        this.level = level;
        this.bounds = bounds;
    }

    public insert(object: ICollider): void {
        if (this.quadrants.length > 0) {
            const index: number = this.getChildrenQuadrantForObject(object);
            this.quadrants[index].insert(object);

            return;
        }

        // max objects reached
        if (this.objects.length >= this.maxObjects) {
            if (this.level >= this.maxLevels) {
                this.objects.push(object);

                return;
            }

            if (this.quadrants.length === 0) {
                this.split();
                this.objects.push(object);
                for (const o of this.objects) {
                    const index: number = this.getChildrenQuadrantForObject(o);
                    this.quadrants[index].insert(o);
                }

                this.objects = [];
            }

            return;
        }

        // if quad has children
        if (this.quadrants.length > 0) {
            const index: number = this.getChildrenQuadrantForObject(object);
            this.quadrants[index].insert(object);
            this.objects.splice(this.objects.indexOf(object), 1);

            return;
        }

        this.objects.push(object);
    }

    public retrieve(collider: ICollider): Array<ICollider> {
        const colliders: Array<ICollider> = [];

        if (this.quadrants.length > 0) {
            const qIndex: number = this.getChildrenQuadrantForObject(collider);
            colliders.push(...this.quadrants[qIndex].retrieve(collider));
        }

        colliders.push(...this.objects);

        const selfIndex: number = colliders.indexOf(collider);
        if (selfIndex !== -1) {
            colliders.splice(selfIndex, 1);
        }

        //remove this
        for (const q of this.quadrants) {
            q.retrieve(collider);
        }

        return colliders;
    }

    public clear(): void {
        for (const quadrant of this.quadrants) {
            quadrant.clear();
        }

        this.objects = [];
        this.quadrants = [];
    }

    // splits the current quad in 4 quadrants
    private split(): void {
        const newLevel: number = this.level + 1;

        const x = this.bounds.x;
        const y = this.bounds.y;

        const newWidth = this.bounds.width / 2;
        const newHeight = this.bounds.height / 2;

        const midPointX = this.bounds.width / 2 + this.bounds.x;
        const midPointY = (this.bounds.height / 2 - this.bounds.y) * -1;

        this.quadrants = [
            new QuadTree(newLevel, new Rectangle(midPointX - newWidth, midPointY, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX, midPointY, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX - newWidth, midPointY + newHeight, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX, midPointY + newHeight, newWidth, newHeight)),
        ];
    }

    private getChildrenQuadrantForObject(object: ICollider): number {
        if (this.quadrants.length === 0) {
            throw 'Current quadrant does not have quadrant children';
        }

        const midPointX = this.bounds.width / 2 + this.bounds.x;
        const midPointY = (this.bounds.height / 2 - this.bounds.y) * -1;

        if (object.getRectangle().x <= midPointX && object.getRectangle().y <= midPointY) {
            return this.sw;
        }

        if (object.getRectangle().x >= midPointX && object.getRectangle().y <= midPointY) {
            return this.se;
        }

        if (object.getRectangle().x <= midPointX && object.getRectangle().y >= midPointY) {
            return this.nw;
        }

        if (object.getRectangle().x >= midPointX && object.getRectangle().y >= midPointY) {
            return this.ne;
        }

        return -1;
    }
}
