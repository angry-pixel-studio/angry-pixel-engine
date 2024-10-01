import { injectable } from "@ioc";
import { Collider } from "./Collider";
import { Collision } from "./Collision";
import { TYPES } from "@config/types";

/**
 * @public
 * @category Collisions
 */
@injectable(TYPES.CollisionRepository)
export class CollisionRepository {
    private collisions: Collision[] = [];

    public findCollisionsForCollider(collider: Collider): Collision[] {
        return this.collisions.filter((c) => c.localCollider === collider);
    }

    public findCollisionsForColliderAndLayer(collider: Collider, layer: string): Collision[] {
        return this.collisions.filter((c) => c.localCollider === collider && c.remoteCollider.layer === layer);
    }

    public findAll(): Collision[] {
        return this.collisions;
    }

    public persist(collision: Collision): void {
        this.collisions.push(collision);
    }

    public removeAll(): void {
        this.collisions = [];
    }
}
