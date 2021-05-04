import { Rectangle } from "../../Math/Rectangle";
import { Vector2 } from "../../Math/Vector2";
import { ICollider } from "./Collider/ICollider";

const MAX_COLLIDERS: number = 20;
const MAX_LEVELS: number = 6;

export class QuadTree {
    private _bounds: Rectangle = new Rectangle(0, 0, 0, 0);
    private _quadrants: QuadTree[] = [];

    private level: number;
    private colliders: ICollider[] = [];

    // Quads cardinal positions
    private readonly sw: number = 0;
    private readonly se: number = 1;
    private readonly nw: number = 2;
    private readonly ne: number = 3;

    // cache
    private center: Vector2 = new Vector2();
    private childrenWidth: number = 0;
    private childrenHeight: number = 0;
    private quadrantsForCollider: QuadTree[] = [];

    constructor(level: number, bounds: Rectangle) {
        this.level = level;
        this._bounds.updateFromRect(bounds);
        this.updateCache();
    }

    public get bounds(): Rectangle {
        return this._bounds;
    }

    public get quadrants(): QuadTree[] {
        return this._quadrants;
    }

    public updateBounds(bounds: Rectangle): void {
        this._bounds.updateFromRect(bounds);
        this.updateCache();
    }

    public clearColliders(): void {
        this.colliders = [];
        this._quadrants.forEach((quad: QuadTree) => quad.clearColliders());
    }

    public clearQuadrants(): void {
        this._quadrants.forEach((quad: QuadTree) => quad.clearQuadrants());
        this._quadrants = [];
    }

    public addCollider(collider: ICollider): void {
        if (this._quadrants.length > 0) {
            this.insertColliderIntoChildrenQuads(collider);
            return;
        }

        this.colliders.push(collider);

        if (this.colliders.length > MAX_COLLIDERS && this.level < MAX_LEVELS) {
            this.splitQuad();
        }
    }

    public retrieve(collider: ICollider): ICollider[] {
        const colliders: ICollider[] = [];

        if (this._quadrants.length > 0) {
            this.getChildrenQuadrantForCollider(collider).forEach((quadrant: QuadTree) =>
                colliders.push(...quadrant.retrieve(collider))
            );
        }

        colliders.push(...this.colliders);

        const selfIndex: number = colliders.indexOf(collider);
        if (selfIndex !== -1) {
            colliders.splice(selfIndex, 1);
        }

        return colliders;
    }

    private splitQuad(): void {
        this._quadrants = [
            new QuadTree(
                this.level + 1,
                new Rectangle(
                    this.center.x - this.childrenWidth,
                    this.center.y - this.childrenHeight,
                    this.childrenWidth,
                    this.childrenHeight
                )
            ),
            new QuadTree(
                this.level + 1,
                new Rectangle(
                    this.center.x,
                    this.center.y - this.childrenHeight,
                    this.childrenWidth,
                    this.childrenHeight
                )
            ),
            new QuadTree(
                this.level + 1,
                new Rectangle(
                    this.center.x - this.childrenWidth,
                    this.center.y,
                    this.childrenWidth,
                    this.childrenHeight
                )
            ),
            new QuadTree(
                this.level + 1,
                new Rectangle(this.center.x, this.center.y, this.childrenWidth, this.childrenHeight)
            ),
        ];

        for (const collider of this.colliders) {
            this.insertColliderIntoChildrenQuads(collider);
        }

        this.colliders = [];
    }

    private getChildrenQuadrantForCollider(collider: ICollider): Array<QuadTree> {
        if (this._quadrants.length === 0) {
            throw new Error("Current quadrant does not have quadrant children.");
        }

        this.quadrantsForCollider = [];

        if (collider.bottomLeftQuadVertex.x <= this.center.x && collider.bottomLeftQuadVertex.y <= this.center.y) {
            this.quadrantsForCollider.push(this._quadrants[this.sw]);
        }

        if (collider.bottomRightQuadVertex.x >= this.center.x && collider.bottomRightQuadVertex.y <= this.center.y) {
            this.quadrantsForCollider.push(this._quadrants[this.se]);
        }

        if (collider.topLeftQuadVertex.x <= this.center.x && collider.topLeftQuadVertex.y >= this.center.y) {
            this.quadrantsForCollider.push(this._quadrants[this.nw]);
        }

        if (collider.topRightQuadVertex.x >= this.center.x && collider.topRightQuadVertex.y >= this.center.y) {
            this.quadrantsForCollider.push(this._quadrants[this.ne]);
        }

        if (this.quadrantsForCollider.length === 0) {
            throw new Error("Children does not fit in any children quadrant");
        }

        return this.quadrantsForCollider;
    }

    private insertColliderIntoChildrenQuads(collider: ICollider): void {
        this.getChildrenQuadrantForCollider(collider).forEach((quadrant: QuadTree) => quadrant.addCollider(collider));
    }

    private updateCache(): void {
        this.center.set(this._bounds.width / 2 + this._bounds.x, this._bounds.height / 2 + this._bounds.y);
        this.childrenWidth = this._bounds.width / 2;
        this.childrenHeight = this._bounds.height / 2;
    }
}
