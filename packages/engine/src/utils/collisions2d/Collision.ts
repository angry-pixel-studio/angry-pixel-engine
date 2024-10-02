import { Entity } from "@ecs";
import { Collider } from "./Collider";
import { CollisionResolution } from "./resolver/CollisionResolver";

/**
 * Represent a collision. It contains the colliders involved, the entities, and the resolution data.
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
