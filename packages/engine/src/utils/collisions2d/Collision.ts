import { Entity } from "@ecs";
import { Collider } from "./Collider";
import { CollisionResolution } from "./resolver/CollisionResolver";

/**
 * Represent a collision. It contains the colliders involved, the entities, and the resolution data.
 * @category Collisions
 * @public
 */
export interface Collision {
    localCollider: Collider;
    localEntity: Entity;
    remoteCollider: Collider;
    remoteEntity: Entity;
    resolution: CollisionResolution;
}
