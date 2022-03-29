import { container } from "../../core/Game";
import { ColliderComponent, RenderComponent } from "../../core/Component";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { ColliderData } from "../../physics/collision/ColliderData";
import { GameObject } from "../../core/GameObject";
import { CollisionResolution } from "../../physics/collision/resolver/CollisionResolver";

export interface CollisionData {
    resolution: CollisionResolution;
    collider: ColliderData;
    gameObject: GameObject;
}

export abstract class Collider extends ColliderComponent {
    protected collisionManager: CollisionManager = container.getSingleton<CollisionManager>("CollisionManager");
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
            const collisions = this.collisionManager.getFrameCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    return {
                        gameObject: this.gameObjectManager.findGameObjectById(collision.remoteCollider.id),
                        collider: collision.remoteCollider,
                        resolution: collision.resolution,
                    };
                }
            }
        }

        return null;
    }

    public getCollisionsWithLayer(layer: string): CollisionData[] {
        const result: CollisionData[] = [];

        for (const collider of this.colliders) {
            const collisions = this.collisionManager.getFrameCollisionsForCollider(collider);
            for (const collision of collisions) {
                if (collision.remoteCollider.layer === layer) {
                    result.push({
                        gameObject: this.gameObjectManager.findGameObjectById(collision.remoteCollider.id),
                        collider: collision.remoteCollider,
                        resolution: collision.resolution,
                    });
                }
            }
        }

        return result;
    }

    protected activeStateChange(): void {
        if (this.renderer) this.renderer.setActive(this.active);
    }
}
