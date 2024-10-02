import { injectable } from "@ioc";
import { Collider } from "./Collider";
import { Collision } from "./Collision";
import { TYPES } from "@config/types";

/**
 * The CollisionRepository has the necessary methods to perform queries on the current collisions
 * @public
 * @category Collisions
 */
@injectable(TYPES.CollisionRepository)
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
