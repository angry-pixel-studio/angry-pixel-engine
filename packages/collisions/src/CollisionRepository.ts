import { injectable } from "@angry-pixel/ioc";
import { Collider } from "./Collider";
import { Collision } from "./Collision";
import { SYMBOLS } from "./symbols";
import { CollisionResolution } from "./resolver/CollisionResolver";
import { Entity } from "@angry-pixel/ecs";
import { Vector2 } from "@angry-pixel/math";

const mapCollision = (collision: Collision, collider: Collider): Collision => {
    if (collision.localCollider === collider) {
        return {
            ...collision,
            resolution: {
                direction: collision.resolution.direction.clone(),
                penetration: collision.resolution.penetration,
            },
        };
    } else {
        return {
            localCollider: collision.remoteCollider,
            localEntity: collision.remoteEntity,
            remoteCollider: collision.localCollider,
            remoteEntity: collision.localEntity,
            resolution: {
                direction: Vector2.scale(new Vector2(), collision.resolution.direction, -1),
                penetration: collision.resolution.penetration,
            },
        };
    }
};

type CollisionCacheEntry = {
    step: number;
    collisions: Collision[];
};

/**
 * The CollisionRepository stores and manages collision data between colliders.
 * It provides methods for querying collisions by collider and layer,
 * and handles persisting/removing collision records.
 * @public
 * @category Collisions
 * @example
 * ```typescript
 * // Get all collisions for a collider
 * const collisions = collisionRepository.findCollisionsForCollider(playerCollider);
 *
 * // Get collisions between player and enemies
 * const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(
 *   playerCollider,
 *   "enemy"
 * );
 * ```
 */
@injectable(SYMBOLS.CollisionRepository)
export class CollisionRepository {
    private collisionPool: Collision[] = [];
    private collisionPoolIndex: number = 0;
    private collisions: Collision[] = [];

    private step: number = 0;
    private findCache: WeakMap<Collider, CollisionCacheEntry> = new WeakMap();

    /** @internal */
    private updateCache(collider: Collider) {
        if (!this.findCache.has(collider)) {
            this.findCache.set(collider, { step: 0, collisions: [] });
        }

        const cached = this.findCache.get(collider)!;

        if (cached.step !== this.step) {
            cached.step = this.step;
            cached.collisions = this.collisions
                .filter((c) => c.localCollider === collider || c.remoteCollider === collider)
                .map((c) => mapCollision(c, collider));
        }
    }

    /**
     * Searches for and returns a collection of collisions for the given collider
     * @param collider The local collider
     * @returns A collection of collisions
     */
    public findCollisionsForCollider(collider: Collider): Collision[] {
        this.updateCache(collider);
        return this.findCache.get(collider)!.collisions;
    }

    /**
     * Searches for and returns a collection of collisions for the given collider and layer
     * @param collider The local collider
     * @param layer The collision layer
     * @returns A collection of collisions
     */
    public findCollisionsForColliderAndLayer(collider: Collider, layer: string): Collision[] {
        this.updateCache(collider);
        return this.findCache.get(collider)!.collisions.filter((collision) => collision.remoteCollider.layer === layer);
    }

    /**
     * Returns the raw collisions of the current physics step, for engine systems that need every collision at once.
     * - Each pair of colliding shapes is stored once, not once per side: the shape that detected the collision is
     *   the local one. Check both `localEntity` and `remoteEntity` (and negate `resolution.direction` for the
     *   remote side) to find every collision of an entity.
     * - The collisions are pooled: the objects and the array are reused on the next physics step. Read them
     *   synchronously and do not keep references to them.
     *
     * Use `findCollisionsForCollider` or `findCollisionsForColliderAndLayer` instead when querying the collisions of
     * a single collider: they return copies, already oriented with that collider as the local one.
     * @internal
     */
    public getCollisions(): Collision[] {
        return this.collisions;
    }

    /** @internal */
    public persist(
        localEntity: Entity,
        localCollider: Collider,
        remoteEntity: Entity,
        remoteCollider: Collider,
        { direction, penetration }: CollisionResolution,
    ): void {
        if (this.collisionPoolIndex < this.collisionPool.length) {
            const collision = this.collisionPool[this.collisionPoolIndex++];

            collision.localCollider = localCollider;
            collision.localEntity = localEntity;
            collision.remoteCollider = remoteCollider;
            collision.remoteEntity = remoteEntity;
            collision.resolution.direction.copy(direction);
            collision.resolution.penetration = penetration;

            this.collisions.push(collision);
        } else {
            const collision: Collision = {
                localCollider,
                localEntity,
                remoteCollider,
                remoteEntity,
                resolution: { direction: direction.clone(), penetration },
            };

            this.collisionPool.push(collision);
            this.collisionPoolIndex++;

            this.collisions.push(collision);
        }
    }

    /** @internal */
    public clear(): void {
        this.collisions.length = 0;
        this.collisionPoolIndex = 0;
        this.step++;
    }
}
