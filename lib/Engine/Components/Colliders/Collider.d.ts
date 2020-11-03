import { Component } from "../../Component";
import { ICollider } from "../../Core/Collision/Collider/ICollider";
import { CollisionManager } from "../../Core/Collision/CollisionManager";
export declare abstract class Collider extends Component {
    protected collisionManager: CollisionManager;
    protected colliders: ICollider[];
    private collisionsCache;
    constructor();
    protected abstract updateCoordinates(): void;
    protected addCollider(collider: ICollider): void;
    collidesWithLayer(layer: string): boolean;
    getCollisionWithLayer(layer: string): ICollider | null;
    getCollisionsWithLayer(layer: string): ICollider[];
    setActive(active: boolean): void;
    destroy(): void;
}
