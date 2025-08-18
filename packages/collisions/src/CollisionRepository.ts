import { injectable } from "@angry-pixel/ioc";
import { Collider } from "./Collider";
import { Collision } from "./Collision";
import { SYMBOLS } from "./symbols";

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
 *
 * // Get all current collisions
 * const allCollisions = collisionRepository.findAll();
 * ```
 */
@injectable(SYMBOLS.CollisionRepository)
export class CollisionRepository {
    private collisions: Collision[] = [];

    /**
     * Searches for and returns a collection of collisions for the given collider
     * @param collider The local collider
     * @returns A collection of collisions
     */
    public findCollisionsForCollider(collider: Collider): Collision[] {
        return this.collisions.filter((c) => c.localCollider === collider);
    }

    /**
     * Searches for and returns a collection of collisions for the given collider and layer
     * @param collider The local collider
     * @param layer The collision layer
     * @returns A collection of collisions
     */
    public findCollisionsForColliderAndLayer(collider: Collider, layer: string): Collision[] {
        return this.collisions.filter((c) => c.localCollider === collider && c.remoteCollider.layer === layer);
    }

    /**
     * Returns all the collisions
     * @public
     * @returns A collection of collisions
     */
    public findAll(): Collision[] {
        return this.collisions;
    }

    /** @internal */
    public persist(collision: Collision): void {
        this.collisions.push(collision);
    }

    /** @internal */
    public removeAll(): void {
        this.collisions = [];
    }
}
