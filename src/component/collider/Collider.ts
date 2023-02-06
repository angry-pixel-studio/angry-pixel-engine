import { ColliderComponent, RenderComponent } from "../../core/Component";
import { GameObject } from "../../core/GameObject";
import { ICollisionResolution, ICollider, ICollision, IPhysicsManager } from "angry-pixel-2d-physics";

export interface CollisionData {
    resolution: ICollisionResolution;
    collider: ICollider;
    gameObject: GameObject;
    /**
     * @return The GameObject to which this component belongs
     */
    getGameObject: <T extends GameObject>() => T;
}

export abstract class Collider extends ColliderComponent {
    protected physicsManager: IPhysicsManager = this.container.getSingleton<IPhysicsManager>("PhysicsManager");
    protected renderer: RenderComponent = null;

    public readonly colliders: ICollider[] = [];
    public layer: string;
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

    public collidesWithLayer(layer: string): boolean {
        return this.getCollisionWithLayer(layer) !== null;
    }

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

    private createCollisionData(collision: ICollision): CollisionData {
        return {
            gameObject: this.gameObjectManager.findGameObjectById(collision.remoteCollider.group),
            collider: collision.remoteCollider,
            resolution: collision.resolution,
            getGameObject: function <T extends GameObject>(): T {
                return this.gameObject as T;
            },
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
