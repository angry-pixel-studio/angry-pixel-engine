import { Entity } from "@ecs";
import { Collider } from "./Collider";
import { CollisionResolution } from "./resolver/CollisionResolver";

/**
 * Represents a collision between two entities in the game world. It contains information about the colliding entities,
 * their collider components, and resolution data for handling the collision response.
 * @example
 * ```typescript
 * // Example collision between player and enemy
 * const collision: Collision = {
 *   localEntity: playerEntity,
 *   localCollider: playerCollider,
 *   remoteEntity: enemyEntity,
 *   remoteCollider: enemyCollider,
 *   resolution: {
 *     normal: new Vector2(1, 0),
 *     depth: 5
 *   }
 * };
 * ```
 * @category Collisions
 * @public
 */
export interface Collision {
    /**
     * The local collider component
     * @public
     */
    localCollider: Collider;
    /**
     * The local entity
     * @public
     */
    localEntity: Entity;
    /**
     * The remote collider component
     * @public
     */
    remoteCollider: Collider;
    /**
     * The remote collider
     * @public
     */
    remoteEntity: Entity;
    /**
     * Contains the information about the collision
     * @public
     */
    resolution: CollisionResolution;
}
