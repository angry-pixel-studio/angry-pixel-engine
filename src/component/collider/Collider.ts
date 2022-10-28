import { ColliderComponent, RenderComponent } from "../../core/Component";
import { Collision, CollisionManager } from "../../physics/collision/CollisionManager";
import { ColliderData } from "../../physics/collision/ColliderData";
import { GameObject } from "../../core/GameObject";
import { CollisionResolution } from "../../physics/collision/resolver/CollisionResolver";

export interface CollisionData {
    resolution: CollisionResolution;
    collider: ColliderData;
    gameObject: GameObject;
    /**
     * @return The GameObject to which this component belongs
     */
    getGameObject: <T extends GameObject>() => T;
}

export abstract class Collider extends ColliderComponent {
    protected collisionManager: CollisionManager = this.container.getSingleton<CollisionManager>("CollisionManager");
    protected renderer: RenderComponent = null;

    public readonly colliders: ColliderData[] = [];
    public layer: string;
    public physics: boolean = true;

    protected update(): void {
        this.colliders.forEach((collider) => this.collisionManager.addCollider(collider));
    }

    public collidesWithLayer(layer: string): boolean {
        return this.getCollisionWithLayer(layer) !== null;
    }

    public getCollisionWithLayer(layer: string): CollisionData | null {
        for (const collider of this.colliders) {
            const collisions = this.collisionManager.getCollisionsForCollider(collider);
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
            const collisions = this.collisionManager.getCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    result.push(this.createCollisionData(collision));
                }
            }
        }

        return result;
    }

    private createCollisionData(collision: Collision): CollisionData {
        return {
            gameObject: this.gameObjectManager.findGameObjectById(collision.remoteCollider.id),
            collider: collision.remoteCollider,
            resolution: collision.resolution,
            getGameObject: function <T extends GameObject>(): T {
                return this.gameObject as T;
            },
        };
    }

    protected onActiveChange(): void {
        if (this.renderer) this.renderer.active = this.active;
    }
}
