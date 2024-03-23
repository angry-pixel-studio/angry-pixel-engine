import { Rectangle, Vector2 } from "@angry-pixel/math";
import { ICollisionMethod } from "./method/ICollisionMethod";
import { QuadTree } from "./broadPhase/QuadTree";
import { SpartialGrid } from "./broadPhase/SpartialGrid";
import { ICollider } from "./ICollider";
import { ICollision } from "./ICollision";
import { BroadPhaseMethods, IBroadPhaseResolver } from "./broadPhase/IBroadPhaseResolver";

const MAX_COLLIDERS_PER_CELL = 10;

export interface ICollisionManager {
    addCollider(collider: ICollider): void;
    getCollider(id: number): ICollider;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    resolve(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[];
    refreshCollisionsForCollider(collider: ICollider): void;
}

/**
 * Array containing which layers will collide with each other.
 * @category Config
 * @public
 */
export type CollisionMatrix = [string, string][];

export class CollisionManager implements ICollisionManager {
    private colliders: ICollider[];
    private activeColliders: ICollider[];
    private broadPhaseResolver: IBroadPhaseResolver;
    private collisionArea: Rectangle;
    private fixedCollisionArea: boolean;
    private method: ICollisionMethod;
    private collisions: ICollision[] = [];
    private collisionMatrix: CollisionMatrix;

    // cache
    private lastCollidersAmount: number = 0;
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();
    private newArea: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        method: ICollisionMethod,
        broadPhaseMethod?: BroadPhaseMethods,
        collisionArea?: Rectangle,
        collisionMatrix?: CollisionMatrix
    ) {
        this.method = method;
        this.colliders = [];
        this.activeColliders = [];
        this.collisionMatrix = collisionMatrix;

        this.setupBroadPhaseResolver(broadPhaseMethod ?? BroadPhaseMethods.QuadTree, collisionArea);
    }

    private setupBroadPhaseResolver(broadPhaseMethod?: BroadPhaseMethods, collisionArea?: Rectangle): void {
        this.collisionArea = collisionArea ?? new Rectangle(0, 0, 0, 0);
        this.fixedCollisionArea = collisionArea ? true : false;

        if (broadPhaseMethod === BroadPhaseMethods.SpartialGrid) {
            this.broadPhaseResolver = new SpartialGrid(this.collisionArea);
        } else {
            this.broadPhaseResolver = new QuadTree(this.collisionArea);
        }
    }

    public addCollider(collider: ICollider): void {
        collider.id = this.colliders.length;
        this.colliders.push(collider);
    }

    public getCollider(id: number): ICollider {
        return this.colliders[id];
    }

    public removeCollider(collider: ICollider): void {
        this.colliders.splice(collider.id, 1);
        this.colliders.forEach((collider, index) => (collider.id = index));
    }

    public clearColliders(): void {
        this.colliders = [];
    }

    public getCollisionsForCollider(collider: ICollider): ICollision[] {
        return collider.active ? this.collisions.filter((c) => c.localCollider.id === collider.id) : [];
    }

    public getCollisionsForColliderAndLayer(collider: ICollider, layer: string): ICollision[] {
        return collider.active
            ? this.collisions.filter((c) => c.localCollider.id === collider.id && c.remoteCollider.layer === layer)
            : [];
    }

    public refreshCollisionsForCollider(collider: ICollider): void {
        if (!this.colliders[collider.id] || !collider.active) return;

        this.collisions = this.collisions.filter(
            (c) => c.localCollider.id !== collider.id && c.remoteCollider.id !== collider.id
        );

        this.updateShape(collider);
        this.narrowPhase(collider, this.broadPhase(collider));
    }

    public resolve(): void {
        this.collisions = [];

        if (this.colliders.length === 0) {
            return;
        }

        this.activeColliders = this.colliders.filter((c) => c.active);

        this.broadPhaseResolver.clear();

        this.activeColliders.forEach((collider) => {
            this.updateShape(collider);
        });

        if (this.fixedCollisionArea === false) {
            this.updateNewArea();

            if (this.newArea.equals(this.collisionArea) === false) {
                this.collisionArea.copy(this.newArea);
                this.broadPhaseResolver.resize(this.collisionArea);
            }
        }

        this.checkForSpartialGridResize();

        this.activeColliders.forEach(({ id, shape: { boundingBox } }) =>
            this.broadPhaseResolver.insert(id, boundingBox)
        );

        this.updateCollisions();
    }

    private updateShape(collider: ICollider): void {
        collider.shape.position = collider.position;
        collider.shape.rotation = collider.rotation;

        collider.shape.update();
    }

    private updateNewArea(): void {
        this.activeColliders.forEach(({ shape: { boundingBox: box } }: ICollider) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        this.newArea.set(
            this.minArea.x,
            this.minArea.y,
            this.maxArea.x - this.minArea.x,
            this.maxArea.y - this.minArea.y
        );
    }

    private checkForSpartialGridResize() {
        if (
            this.broadPhaseResolver instanceof SpartialGrid &&
            this.lastCollidersAmount !== this.activeColliders.length
        ) {
            this.broadPhaseResolver.subdivisions = ((this.activeColliders.length / MAX_COLLIDERS_PER_CELL) | 0) + 1;
            this.broadPhaseResolver.resize(this.collisionArea);
            this.lastCollidersAmount = this.activeColliders.length;
        }
    }

    private updateCollisions(): void {
        this.activeColliders
            .filter((collider) => collider.updateCollisions)
            .forEach((collider) => this.narrowPhase(collider, this.broadPhase(collider)));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        if (this.collisionMatrix) {
            return this.broadPhaseResolver
                .retrieve<number>(collider.shape.boundingBox)
                .map<ICollider>((id) => this.colliders[id])
                .filter((c) => c.active)
                .filter((remoteCollider) =>
                    this.collisionMatrix.some(
                        (row) =>
                            (row[0] === collider.layer && row[1] === remoteCollider.layer) ||
                            (row[1] === collider.layer && row[0] === remoteCollider.layer)
                    )
                );
        }

        return this.broadPhaseResolver
            .retrieve<number>(collider.shape.boundingBox)
            .map<ICollider>((id) => this.colliders[id])
            .filter((c) => c.active);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: ICollider[]): void {
        colliders
            .filter(
                (remoteCollider: ICollider) =>
                    (!collider.group || !remoteCollider.group || remoteCollider.group !== collider.group) &&
                    collider.id !== remoteCollider.id
            )
            .forEach((remoteCollider: ICollider) => {
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

                    if (collider.onCollision) collider.onCollision(resolution);
                }
            });
    }

    private isResolved(localCollider: ICollider, remoteCollider: ICollider): boolean {
        for (const collision of this.collisions) {
            if (collision.localCollider.id === localCollider.id && collision.remoteCollider.id === remoteCollider.id) {
                return true;
            }
        }

        return false;
    }
}
