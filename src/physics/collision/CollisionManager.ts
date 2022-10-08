import { Rectangle } from "angry-pixel-math";
import { Vector2 } from "angry-pixel-math";
import { ColliderData } from "./ColliderData";
import { CollisionMethod } from "./method/CollisionMethod";
import { QuadTree } from "./QuadTree";
import { CollisionResolution } from "./resolver/CollisionResolver";

export interface Collision {
    localCollider: ColliderData;
    remoteCollider: ColliderData;
    resolution: CollisionResolution;
}

export type CollisionMatrix = [string, string][];

export class CollisionManager {
    private colliders: ColliderData[];
    private quadTree: QuadTree;
    private bounds: Rectangle;
    private fixedQuadTree: boolean;
    private method: CollisionMethod;
    private collisions: Collision[] = [];
    private collisionMatrix: CollisionMatrix;

    // cache
    private minBounds: Vector2 = new Vector2();
    private maxBounds: Vector2 = new Vector2();
    private newBounds: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        method: CollisionMethod,
        quadMaxLevel: number,
        collidersPerQuad: number,
        quadTreeBounds?: Rectangle,
        collisionMatrix?: CollisionMatrix | null
    ) {
        this.method = method;
        this.colliders = [];
        this.collisionMatrix = collisionMatrix;
        this.setupQuadTree(quadMaxLevel, collidersPerQuad, quadTreeBounds);
    }

    private setupQuadTree(quadMaxLevel: number, collidersPerQuad: number, quadTreeBounds?: Rectangle): void {
        if (quadTreeBounds) {
            this.bounds = quadTreeBounds;
            this.fixedQuadTree = true;
        } else {
            this.bounds = new Rectangle(0, 0, 0, 0);
            this.fixedQuadTree = false;
        }

        this.quadTree = new QuadTree(0, this.bounds, quadMaxLevel, collidersPerQuad);
    }

    public addCollider(collider: ColliderData): void {
        this.colliders.push(collider);
    }

    public removeCollider(collider: ColliderData): void {
        const index: number = this.colliders.indexOf(collider);
        if (index !== -1) {
            delete this.colliders[index];
            this.colliders.splice(index, 1);
        }
    }

    public getCollisionsForCollider(collider: ColliderData): Collision[] {
        return this.collisions.filter((collision) => collision.localCollider === collider);
    }

    public refreshCollisionsForCollider(collider: ColliderData): void {
        if (this.colliders.indexOf(collider) === -1) return;

        this.collisions = this.collisions.filter(
            (collision) => collision.localCollider !== collider && collision.remoteCollider !== collider
        );

        this.narrowPhase(collider, this.broadPhase(collider));
    }

    public clear(): void {
        this.colliders = [];
    }

    public update(): void {
        this.collisions = [];

        if (this.colliders.length === 0) {
            return;
        }

        this.quadTree.clearItems();
        this.quadTree.clearQuadrants();

        if (this.fixedQuadTree === false) {
            this.updateNewBounds();
            if (this.newBounds.equals(this.bounds) === false) {
                this.bounds.copy(this.newBounds);
                this.quadTree.updateBounds(this.bounds);
            }
        }

        for (const collider of this.colliders) {
            this.quadTree.addItem(collider);
        }

        this.updateCollisions();
    }

    private updateNewBounds(): void {
        this.colliders.forEach((collider: ColliderData) => {
            this.minBounds.set(Math.min(collider.x, this.minBounds.x), Math.min(collider.y, this.minBounds.y));

            this.maxBounds.set(Math.max(collider.x1, this.maxBounds.x), Math.max(collider.y1, this.maxBounds.y));
        });

        this.newBounds.set(
            this.minBounds.x,
            this.minBounds.y,
            this.maxBounds.x - this.minBounds.x,
            this.maxBounds.y - this.minBounds.y
        );
    }

    private updateCollisions(): void {
        this.colliders
            .filter((collider) => collider.updateCollisions)
            .forEach((collider) => this.narrowPhase(collider, this.broadPhase(collider)));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ColliderData): ColliderData[] {
        if (this.collisionMatrix) {
            return this.quadTree
                .retrieve<ColliderData>(collider)
                .filter((remoteCollider) =>
                    this.collisionMatrix.some(
                        (row) =>
                            (row[0] === collider.layer && row[1] === remoteCollider.layer) ||
                            (row[1] === collider.layer && row[0] === remoteCollider.layer)
                    )
                );
        }
        return this.quadTree.retrieve<ColliderData>(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ColliderData, colliders: Array<ColliderData>): void {
        colliders
            .filter((remoteCollider: ColliderData) => remoteCollider.id !== collider.id)
            .forEach((remoteCollider: ColliderData) => {
                if (this.isResolved(collider, remoteCollider)) return;

                const resolution = this.method.getCollisionResolution(collider.shape, remoteCollider.shape);
                if (resolution !== null) {
                    this.collisions.push(
                        {
                            localCollider: collider,
                            remoteCollider: remoteCollider,
                            resolution: resolution,
                        },
                        {
                            localCollider: remoteCollider,
                            remoteCollider: collider,
                            resolution: {
                                direction: resolution.displacementDirection,
                                displacementDirection: resolution.direction,
                                penetration: resolution.penetration,
                            },
                        }
                    );
                }
            });
    }

    private isResolved(localCollider: ColliderData, remoteCollider: ColliderData): boolean {
        for (const collision of this.collisions) {
            if (collision.localCollider === localCollider && collision.remoteCollider === remoteCollider) {
                return true;
            }
        }

        return false;
    }
}
