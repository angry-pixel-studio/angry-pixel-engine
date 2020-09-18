import Rectangle from "./../../Helper/Rectangle";
import ICollider from "./ICollider";

export default class QuadTree {
    readonly maxObjects: number = 2;
    readonly maxLevels: number = 5;

    readonly sw: number = 0;
    readonly se: number = 1;
    readonly nw: number = 2;
    readonly ne: number = 3;

    private level: number;
    private objects: Array<ICollider> = [];
    private quadrants: Array<QuadTree> = [];
    public bounds: Rectangle;

    constructor(level: number, bounds: Rectangle) {
        this.level = level;
        this.bounds = bounds;
    }

    public insert(object: ICollider): void {
        if (this.hasQuadChildren()) {
            const index: number = this.getChildrenQuadrantForObject(object);
            this.quadrants[index].insert(object);


        } else if (this.isQuadFull()) {
            if (this.level >= this.maxLevels) {
                this.objects.push(object);

                return;
            }

            this.split();
            this.objects.push(object);
            for (const o of this.objects) {
                const index: number = this.getChildrenQuadrantForObject(o);
                this.quadrants[index].insert(o);
            }

            this.objects = [];
        } else if (this.hasQuadChildren()) {
            const index: number = this.getChildrenQuadrantForObject(object);
            this.quadrants[index].insert(object);
            this.objects.splice(this.objects.indexOf(object), 1);

            return;
        } else {
            this.objects.push(object);
        }
    }

    public getPossibleCollisionsWithObject(collider: ICollider): Array<ICollider> {
        const colliders: Array<ICollider> = [];

        if (this.hasQuadChildren()) {
            const qIndex: number = this.getChildrenQuadrantForObject(collider);
            colliders.push(...this.quadrants[qIndex].getPossibleCollisionsWithObject(collider));
        }

        colliders.push(...this.objects);

        const selfIndex: number = colliders.indexOf(collider);
        if (selfIndex !== -1) {
            colliders.splice(selfIndex, 1);
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

        const midX = this.bounds.width / 2;
        const midY = this.bounds.height / 2;

        this.quadrants = [
            new QuadTree(newLevel, new Rectangle(x, y, midX, midY)),
            new QuadTree(newLevel, new Rectangle(x + midX, y, midX, midY)),
            new QuadTree(newLevel, new Rectangle(x, y + midY, midX, midY)),
            new QuadTree(newLevel, new Rectangle(x + midX, y + midY, midX, midY)),
        ];
    }

    private getChildrenQuadrantForObject(object: ICollider): number {
        if (this.quadrants.length === 0) {
            throw 'Current quadrant does not have quadrant children';
        }

        const verticalMid = this.bounds.x + (this.bounds.width / 2);
        const horizontalMid = this.bounds.y + (this.bounds.height / 2);

        //change this to consider the whole collider and not only the bottom left corner.
        if (object.getRectangle().x <= verticalMid && object.getRectangle().y <= horizontalMid) {
            return this.sw;
        }

        if (object.getRectangle().x >= verticalMid && object.getRectangle().y <= horizontalMid) {
            return this.se;
        }

        if (object.getRectangle().x <= verticalMid && object.getRectangle().y >= horizontalMid) {
            return this.nw;
        }

        if (object.getRectangle().x >= verticalMid && object.getRectangle().y >= horizontalMid) {
            return this.ne;
        }

        throw 'Children does not fit in any children quadrant';
    }

    private hasQuadChildren(): boolean {
        return this.quadrants.length > 0;
    }

    private isQuadFull(): boolean {
        return this.objects.length >= this.maxObjects;
    }
}
