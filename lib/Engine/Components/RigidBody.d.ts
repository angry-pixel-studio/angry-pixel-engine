import { PhysicsComponent } from "../Component";
import { Vector2 } from "../Math/Vector2";
export declare enum RigidBodyType {
    Static = 0,
    Dynamic = 1
}
interface Config {
    rigidBodyType: RigidBodyType;
    layersToCollide: string[];
    gravity?: number;
}
export declare const TYPE_RIGIDBODY: string;
export declare class RigidBody extends PhysicsComponent {
    private readonly gravityScale;
    private readonly physicsFramerate;
    private readonly physicsIterations;
    private physicsDeltaTime;
    private deltaTimeAccumulator;
    private _rigidBodyType;
    private _colliderComponents;
    private _layersToCollide;
    private _velocity;
    private _gravity;
    private deltaVelocity;
    private collisions;
    private penetrationPerDirection;
    private timeManager;
    constructor(config: Config);
    get rigidBodyType(): RigidBodyType;
    set velocity(velocity: Vector2);
    get velocity(): Vector2;
    set gravity(gravity: number);
    get gravity(): number;
    protected start(): void;
    protected update(): void;
    private applyGravity;
    private applyVelocity;
    private move;
    private setPenetrationPerDirectionPerAxis;
    private penetrationResolution;
    private updateCollisions;
}
export {};
