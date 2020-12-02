import { PhysicsComponent } from "../Component";
import { Vector2 } from "../Math/Vector2";
import { ColliderComponent } from "./Colliders/ColliderComponent";
export declare enum RigidBodyType {
    Static = 0,
    Dynamic = 1
}
interface Config {
    rigidBodyType: RigidBodyType;
    colliders: ColliderComponent[];
    layersToCollide: string[];
    gravity?: number;
}
export declare const TYPE_RIGIDBODY: string;
export declare class RigidBody extends PhysicsComponent {
    private _rigidBodyType;
    private _colliderComponents;
    private _gravity;
    private _layersToCollide;
    private _velocity;
    private deltaVelocity;
    private collisions;
    private timeManager;
    constructor(config: Config);
    get rigidBodyType(): RigidBodyType;
    set velocity(velocity: Vector2);
    get velocity(): Vector2;
    set gravity(gravity: number);
    get gravity(): number;
    protected update(): void;
    private applyGravityToVelocity;
    private moveGameObject;
    private moveX;
    private moveY;
    private updateCollisions;
}
export {};
