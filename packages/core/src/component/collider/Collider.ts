import { ColliderComponent, RenderComponent } from "../../core/Component";
import { GameObject } from "../../core/GameObject";
import { ICollisionResolution, ICollider, ICollision } from "@angry-pixel/2d-physics";

/**
 * Information about the collision
 * @public
 * @category Components
 */
export interface CollisionData {
    /** Contains information about the penetration and direction of the collision. */
    resolution: ICollisionResolution;
    /** The collider on the other side of the collision. */
    collider: ICollider;
    /** The object on the other side of the collision. */
    gameObject: GameObject;
    /**
     * @return The object on the other side of the collision.
     */
    getGameObject: <T extends GameObject>() => T;
    /** The collider belonging to the queried component */
    localCollider: ICollider;
}

/**
 * Every collider component implements this interface.
 * @public
 * @category Components
 */
export interface IColliderComponent {
    /**
     * Check if the collider is in contact with any collider of the given layer.
     * @param layer The layer to check
     * @returns TRUE if is colliding, FALSE instead
     */
    collidesWithLayer(layer: string): boolean;
    /**
     * Check if the collider is in contact with any collider of the given layers.
     * @param layers The layers to check
     * @param condition "or" if collides with at least one layer (default value), "and" if collides with all layers.
     * @returns TRUE if is colliding, FALSE instead
     */
    collidesWithLayers(layers: string[], condition: "or" | "and"): boolean;
    /**
     * If there is a collision with the given layer, it returns information about it, or null if there is none.
     * @param layer The layer to check
     * @returns The collision data object, or NULL instead
     */
    getCollisionWithLayer(layer: string): CollisionData | null;
    /**
     * If there are collisions with the given layer, it returns information about every collision.
     * @param layer The layer to check
     * @returns The collection of collision data
     */
    getCollisionsWithLayer(layer: string): CollisionData[];
    /**
     * If there are collisions with the given layers, it returns information about every collision.
     * @param layers The layers to check
     * @returns The collection of collision data
     */
    getCollisionsWithLayers(layers: string[]): CollisionData[];
}

/** @internal */
export abstract class BaseCollider extends ColliderComponent implements IColliderComponent {
    protected renderer: RenderComponent = null;

    public readonly colliders: ICollider[] = [];
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    public layer: string;
    /** TRUE if this collider interact with rigid bodies */
    public physics: boolean = true;

    private activateColliders: boolean = false;

    protected abstract updateRealSize(): void;
    protected abstract updatePosition(): void;
    protected abstract updateColliders(): void;

    protected update(): void {
        if (this.activateColliders) {
            this.colliders.forEach((c) => (c.active = true));
            this.activateColliders = false;
        }

        this.updateRealSize();
        this.updatePosition();
        this.updateColliders();
    }

    /**
     * Check if the collider is in contact with any collider of the given layer.
     * @param layer The layer to check
     * @returns TRUE if is colliding, FALSE instead
     */
    public collidesWithLayer(layer: string): boolean {
        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    return true;
                }
            }
        }
    }

    /**
     * Check if the collider is in contact with any collider of the given layers.
     * @param layers The layers to check
     * @param condition "or" if collides with at least one layer (default value), "and" if collides with all layers.
     * @returns TRUE if is colliding, FALSE instead
     */
    public collidesWithLayers(layers: string[], condition: "or" | "and" = "or"): boolean {
        let matches = 0;

        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (layers.includes(collision.remoteCollider.layer)) {
                    if (condition === "or") return true;
                    matches++;
                }
            }
        }

        if (condition === "and" && matches === layers.length) return true;

        return false;
    }

    /**
     * If there is a collision with the given layer, it returns information about it, or null if there is none.
     * @param layer The layer to check
     * @returns The collision data object, or NULL instead
     */
    public getCollisionWithLayer(layer: string): CollisionData | null {
        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    return this.createCollisionData(collision);
                }
            }
        }

        return null;
    }

    /**
     * If there are collisions with the given layer, it returns information about every collision.
     * @param layer The layer to check
     * @returns The collection of collision data
     */
    public getCollisionsWithLayer(layer: string): CollisionData[] {
        const result: CollisionData[] = [];

        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    result.push(this.createCollisionData(collision));
                }
            }
        }

        return result;
    }

    /**
     * If there are collisions with the given layers, it returns information about every collision.
     * @param layers The layers to check
     * @returns The collection of collision data
     */
    public getCollisionsWithLayers(layers: string[]): CollisionData[] {
        const result: CollisionData[] = [];

        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (layers.includes(collision.remoteCollider.layer)) {
                    result.push(this.createCollisionData(collision));
                }
            }
        }

        return result;
    }

    protected createCollisionData(collision: ICollision): CollisionData {
        return {
            gameObject: this.gameObjectManager.findGameObjectById(Number(collision.remoteCollider.group)),
            collider: collision.remoteCollider,
            resolution: collision.resolution,
            getGameObject: function <T extends GameObject>(): T {
                return this.gameObject as T;
            },
            localCollider: collision.localCollider,
        };
    }

    protected onActiveChange(): void {
        if (this.renderer) this.renderer.active = this.active;
        this.active ? (this.activateColliders = true) : this.colliders.forEach((c) => (c.active = this.active));
    }

    protected onDestroy(): void {
        this.colliders.forEach((c) => this.physicsManager.removeCollider(c));
    }
}
