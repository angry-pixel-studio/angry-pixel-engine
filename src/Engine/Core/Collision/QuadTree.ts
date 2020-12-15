import { Vector2 } from "../../Math/Vector2";
import { Rectangle } from "../../Math/Rectangle";
import { ICollider } from "./Collider/ICollider";

export class QuadTree {
    // TODO: maxColliders and maxLevels should be calculated automatically based
    // on the size of the scene and set on the constructor.
    readonly maxColliders: number = 20;
    readonly maxLevels: number = 5;

    // Quads cardinal positions
    private readonly sw: number = 0;
    private readonly se: number = 1;
    private readonly nw: number = 2;
    private readonly ne: number = 3;

    private level: number;
    private colliders: Array<ICollider> = [];
    public quadrants: Array<QuadTree> = [];
    public bounds: Rectangle;

    constructor(level: number, bounds: Rectangle) {
        this.level = level;
        this.bounds = bounds;
    }

    public insert(collider: ICollider): void {
        if (this.hasQuadChildren()) {
            this.insertColliderIntoChildrenQuads(collider);

            return;
        }

        this.colliders.push(collider);

        if (!this.isQuadFull()) {
            return;
        }

        if (this.level < this.maxLevels) {
            this.splitQuad();
        }
    }

    public retrieve(collider: ICollider): Array<ICollider> {
        const colliders: Array<ICollider> = [];

        if (this.hasQuadChildren()) {
            const quadrants: Array<QuadTree> = this.getChildrenQuadrantForCollider(collider);
            for (const quadrant of quadrants) {
                colliders.push(...quadrant.retrieve(collider));
            }
        }

        colliders.push(...this.colliders);

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

        this.colliders = [];
        this.quadrants = [];
    }

    private splitQuad(): void {
        const { x: midPointX, y: midPointY } = this.getQuadrantMidPoint();
        const newLevel: number = this.level + 1;
        const newWidth = this.bounds.width / 2;
        const newHeight = this.bounds.height / 2;

        this.quadrants = [
            new QuadTree(newLevel, new Rectangle(midPointX - newWidth, midPointY - newHeight, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX, midPointY - newHeight, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX - newWidth, midPointY, newWidth, newHeight)),
            new QuadTree(newLevel, new Rectangle(midPointX, midPointY, newWidth, newHeight)),
        ];

        for (const collider of this.colliders) {
            this.insertColliderIntoChildrenQuads(collider);
        }

        this.colliders = [];
    }

    private getChildrenQuadrantForCollider(collider: ICollider): Array<QuadTree> {
        if (this.quadrants.length === 0) {
            throw new Error("Current quadrant does not have quadrant children.");
        }

        const { x: midPointX, y: midPointY } = this.getQuadrantMidPoint();

        const childrenQuadrants: Array<QuadTree> = [];

        if (collider.bottomLeftQuadVertex.x <= midPointX && collider.bottomLeftQuadVertex.y <= midPointY) {
            childrenQuadrants.push(this.quadrants[this.sw]);
        }

        if (collider.bottomRightQuadvertex.x >= midPointX && collider.bottomRightQuadvertex.y <= midPointY) {
            childrenQuadrants.push(this.quadrants[this.se]);
        }

        if (collider.topLeftQuadVertex.x <= midPointX && collider.topLeftQuadVertex.y >= midPointY) {
            childrenQuadrants.push(this.quadrants[this.nw]);
        }

        if (collider.topRightQuadVertex.x >= midPointX && collider.topRightQuadVertex.y >= midPointY) {
            childrenQuadrants.push(this.quadrants[this.ne]);
        }

        if (childrenQuadrants.length === 0) {
            throw new Error("Children does not fit in any children quadrant");
        }

        return childrenQuadrants;
    }

    private insertColliderIntoChildrenQuads(collider: ICollider) {
        const quadrants: Array<QuadTree> = this.getChildrenQuadrantForCollider(collider);
        for (const quadrant of quadrants) {
            quadrant.insert(collider);
        }
    }

    private getQuadrantMidPoint(): Vector2 {
        return new Vector2(this.bounds.width / 2 + this.bounds.x, this.bounds.height / 2 + this.bounds.y);
    }

    private hasQuadChildren(): boolean {
        return this.quadrants.length > 0;
    }

    private isQuadFull(): boolean {
        return this.colliders.length > this.maxColliders;
    }
}
