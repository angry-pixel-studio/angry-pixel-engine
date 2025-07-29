import { ColliderComponent } from "../../core/Component";
/** @internal */
export class BaseCollider extends ColliderComponent {
    constructor() {
        super(...arguments);
        this.renderer = null;
        this.colliders = [];
        /** TRUE if this collider interact with rigid bodies */
        this.physics = true;
        this.activateColliders = false;
    }
    update() {
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
    collidesWithLayer(layer) {
        for (const collider of this.colliders) {
            if (this.physicsManager.getCollisionsForColliderAndLayer(collider, layer).length > 0)
                return true;
        }
        return false;
    }
    /**
     * Check if the collider is in contact with any collider of the given layers.
     * @param layers The layers to check
     * @param condition "or" if collides with at least one layer (default value), "and" if collides with all layers.
     * @returns TRUE if is colliding, FALSE instead
     */
    collidesWithLayers(layers, condition = "or") {
        let matches = 0;
        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (layers.includes(collision.remoteCollider.layer)) {
                    if (condition === "or")
                        return true;
                    matches++;
                }
            }
        }
        if (condition === "and" && matches === layers.length)
            return true;
        return false;
    }
    /**
     * Finds the first collision with the given layer and returns it, or returns null instead.
     * @param layer The layer to check
     * @returns The collision data object, or NULL instead
     */
    getCollisionWithLayer(layer) {
        for (const collider of this.colliders) {
            const collisions = this.physicsManager.getCollisionsForColliderAndLayer(collider, layer);
            if (collisions.length > 0)
                return this.createCollisionData(collisions[0]);
        }
        return null;
    }
    /**
     * If there are collisions with the given layer, it returns information about every collision.
     * @param layer The layer to check
     * @returns The collection of collision data
     */
    getCollisionsWithLayer(layer) {
        const result = [];
        for (const collider of this.colliders) {
            this.physicsManager
                .getCollisionsForColliderAndLayer(collider, layer)
                .forEach((collision) => result.push(this.createCollisionData(collision)));
        }
        return result;
    }
    /**
     * If there are collisions with the given layers, it returns information about every collision.
     * @param layers The layers to check
     * @returns The collection of collision data
     */
    getCollisionsWithLayers(layers) {
        const result = [];
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
    createCollisionData(collision) {
        return {
            gameObject: this.gameObjectManager.findGameObjectById(Number(collision.remoteCollider.group)),
            collider: collision.remoteCollider,
            resolution: collision.resolution,
            getGameObject: function () {
                return this.gameObject;
            },
            localCollider: collision.localCollider,
        };
    }
    onActiveChange() {
        if (this.renderer)
            this.renderer.active = this.active;
        this.active ? (this.activateColliders = true) : this.colliders.forEach((c) => (c.active = this.active));
    }
    onDestroy() {
        this.colliders.forEach((c) => this.physicsManager.removeCollider(c));
    }
}
//# sourceMappingURL=Collider.js.map