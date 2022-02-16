import { Rectangle } from "../../math/Rectangle";
import { Vector2 } from "../../math/Vector2";
import { ICollider } from "./collider/ICollider";
import { QuadTree } from "./QuadTree";
import { CollisionData } from "./CollisionData";
import { ICollisionResolver } from "./resolver/ICollisionResolver";
import { ComponentTypes } from "../..";

export interface Collision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    collisionData: CollisionData;
}

export class CollisionManager {
    private colliders: ICollider[];
    private quadTree: QuadTree;
    private bounds: Rectangle;
    private fixedQuadTree: boolean;
    private resolver: ICollisionResolver;
    private collisions: Collision[] = [];

    // cache
    private minBounds: Vector2 = new Vector2();
    private maxBounds: Vector2 = new Vector2();
    private newBounds: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        resolver: ICollisionResolver,
        quadTreeBounds: Rectangle | null = null,
        quadMaxLevel: number,
        collidersPerQuad: number
    ) {
        this.fixedQuadTree = quadTreeBounds !== null;
        this.resolver = resolver;
        this.colliders = [];

        if (this.fixedQuadTree) {
            this.bounds = quadTreeBounds;
        } else {
            this.bounds = new Rectangle(0, 0, 0, 0);
        }

        this.quadTree = new QuadTree(0, this.bounds, quadMaxLevel, collidersPerQuad);
    }

    public addCollider(collider: ICollider): void {
        this.colliders.push(collider);
    }

    public removeCollider(collider: ICollider): void {
        const index: number = this.colliders.indexOf(collider);
        if (index !== -1) {
            delete this.colliders[index];
            this.colliders.splice(index, 1);
        }
    }

    public getFrameCollisionsForCollider(collider: ICollider): Collision[] {
        if (this.colliders.indexOf(collider) === -1) return [];

        return this.collisions.filter((collision) => collision.localCollider === collider);
    }

    public refreshCollisionsForCollider(collider: ICollider): Collision[] {
        if (this.colliders.indexOf(collider) === -1) return [];

        const collisions = this.narrowPhase(collider, this.broadPhase(collider));

        this.collisions = this.collisions.filter((collision) => collision.localCollider !== collider);
        this.collisions.push(...collisions);

        return collisions;
    }

    public update(): void {
        this.collisions = [];

        if (this.colliders.length === 0) {
            return;
        }

        this.quadTree.clearColliders();
        this.quadTree.clearQuadrants();

        if (this.fixedQuadTree === false) {
            this.updateNewBounds();
            if (this.newBounds.equals(this.bounds) === false) {
                this.bounds.updateFromRect(this.newBounds);
                this.quadTree.updateBounds(this.bounds);
            }
        }

        for (const collider of this.colliders) {
            this.quadTree.addCollider(collider);
        }

        this.updateCollisions();
    }

    private updateNewBounds(): void {
        this.colliders.forEach((collider: ICollider) => {
            this.minBounds.set(
                Math.min(collider.bottomLeftQuadVertex.x, this.minBounds.x),
                Math.min(collider.bottomLeftQuadVertex.y, this.minBounds.y)
            );

            this.maxBounds.set(
                Math.max(collider.topRightQuadVertex.x, this.maxBounds.x),
                Math.max(collider.topRightQuadVertex.y, this.maxBounds.y)
            );
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
            .forEach((collider) => this.collisions.push(...this.narrowPhase(collider, this.broadPhase(collider))));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        return this.quadTree.retrieve(collider);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: Array<ICollider>): Array<Collision> {
        const collisions: Array<Collision> = [];
        colliders
            .filter((remoteCollider: ICollider) => remoteCollider.gameObject !== collider.gameObject)
            .forEach((remoteCollider: ICollider) => {
                const collisionData = this.resolver.getCollisionData(collider.shape, remoteCollider.shape);
                if (collisionData !== null) {
                    collisions.push({
                        localCollider: collider,
                        remoteCollider: remoteCollider,
                        collisionData: collisionData,
                    });
                }
            });

        return collisions;
    }
}
