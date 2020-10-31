import { Component } from "../../Component";
import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { CollisionManager } from "../../Core/Collision/CollisionManager";
export declare abstract class AbstractColliderComponent extends Component {
    protected collisionManager: CollisionManager;
    protected colliders: ICollider[];
    constructor();
    protected abstract updateCoordinates(): void;
    protected addCollider(collider: ICollider): void;
    collidesWithLayer(layer: string): boolean;
    getCollisionWithLayer(layer: string): ICollider | null;
    setActive(active: boolean): void;
    destroy(): void;
}
