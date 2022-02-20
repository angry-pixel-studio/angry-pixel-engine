import { container } from "../../core/Game";
import { ColliderComponent, RenderComponent } from "../../core/Component";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { ColliderData } from "../../physics/collision/ColliderData";
import { CollisionResolution } from "../../physics/collision/resolver/CollisionResolution";
import { GameObject } from "../../core/GameObject";

export interface CollisionData {
    resolution: CollisionResolution;
    collider: ColliderData;
    gameObject: GameObject;
}

export abstract class Collider extends ColliderComponent {
    protected collisionManager: CollisionManager = container.getSingleton<CollisionManager>("CollisionManager");
    protected renderer: RenderComponent = null;

    protected _physics: boolean = true;
    public readonly colliders: ColliderData[] = [];

    public layer: string;

    public get physics(): boolean {
        return this._physics;
    }

    protected addCollider(collider: ColliderData): void {
        this.colliders.push(collider);
        this.collisionManager.addCollider(collider);
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

    public setActive(active: boolean): void {
        if (active === true && this.active === false) {
            this.colliders.forEach((collider) => this.collisionManager.addCollider(collider));
        } else if (active === false && this.active === true) {
            this.colliders.forEach((collider) => this.collisionManager.removeCollider(collider));
        }

        if (this.renderer) this.renderer.setActive(active);

        super.setActive(active);
    }

    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    public destroy(): void {
        this.colliders.forEach((collider) => this.collisionManager.removeCollider(collider));
        super.destroy();
    }
}
