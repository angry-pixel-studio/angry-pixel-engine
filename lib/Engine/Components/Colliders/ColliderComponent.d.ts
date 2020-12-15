import { Component } from "../../Component";
import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { Collision, CollisionManager } from "../../Core/Collision/CollisionManager";
export declare abstract class ColliderComponent extends Component {
    protected collisionManager: CollisionManager;
    protected colliders: ICollider[];
    protected _physics: boolean;
    private collisionsCache;
    constructor();
    get physics(): boolean;
    protected abstract updatePosition(): void;
    protected addCollider(collider: ICollider): void;
    collidesWithLayer(layer: string): boolean;
    getCollisionWithLayer(layer: string): Collision | null;
    getCollisionsWithLayer(layer: string): Collision[];
    setActive(active: boolean): void;
    destroy(): void;
}
