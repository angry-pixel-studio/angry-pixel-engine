import { Vector2 } from "../../math";
import { IEntityManager } from "../EntityManager";
import { IBroadPhaseResolver } from "../collision/broadPhase/IBroadPhaseResolver";
import { ICollider } from "../component/Collider";
import { ICollision } from "../collision/Collision";
import { ICollisionMethod } from "../collision/method/ICollisionMethod";
import { SystemBase } from "./System";

/**
 * Array containing which layers will collide with each other.
 * @category Config
 * @public
 */
export type CollisionMatrix = [string, string][];

export class ResolveCollisionSystem extends SystemBase {
    public collisions: ICollision[] = [];

    // cache
    private colliders: ICollider[] = [];

    constructor(
        entityManager: IEntityManager,
        private broadPhaseResolver: IBroadPhaseResolver,
        private collisionMatrix: CollisionMatrix,
        private method: ICollisionMethod,
    ) {
        super(entityManager);
    }

    public update(): void {
        this.colliders = [];
        this.collisions = [];

        this.entityManager.getEntities().forEach((e) => e[3].forEach((c) => (this.colliders[c.id] = c)));

        this.broadPhaseResolver.update(this.colliders);

        this.colliders
            .filter((collider) => collider.updateCollisions)
            .forEach((collider) => this.narrowPhase(collider, this.broadPhase(collider)));
    }

    // broad phase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        if (this.collisionMatrix) {
            return this.broadPhaseResolver
                .retrieve(collider.shape.boundingBox)
                .map<ICollider>((id) => this.colliders[id])
                .filter((remoteCollider) =>
                    this.collisionMatrix.some(
                        (row) =>
                            (row[0] === collider.layer && row[1] === remoteCollider.layer) ||
                            (row[1] === collider.layer && row[0] === remoteCollider.layer),
                    ),
                );
        }

        return this.broadPhaseResolver.retrieve(collider.shape.boundingBox).map<ICollider>((id) => this.colliders[id]);
    }

    // narrow phase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, neighbors: ICollider[]): void {
        neighbors
            .filter(
                (neighbor: ICollider) =>
                    neighbor.entity !== collider.entity &&
                    collider.id !== neighbor.id &&
                    !this.isResolved(collider, neighbor),
            )
            .forEach((neighbor: ICollider) => {
                const resolution = this.method.findCollision(collider.shape, neighbor.shape);

                if (resolution) {
                    this.collisions.push(
                        {
                            localCollider: collider,
                            remoteCollider: neighbor,
                            resolution,
                        },
                        {
                            localCollider: neighbor,
                            remoteCollider: collider,
                            resolution: {
                                direction: Vector2.scale(new Vector2(), resolution.direction, -1),
                                penetration: resolution.penetration,
                            },
                        },
                    );
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
