import { Component } from "../Component";
import { Vector2 } from "../Helper/Vector2";
import { Collider } from "./Colliders/Collider";
export declare enum RigidBodyType {
    Static = 0,
    Dynamic = 1
}
interface Config {
    type: RigidBodyType;
    colliders: Collider[];
    layersToCollide: string[];
    gravity: number;
}
export declare class RigidBody extends Component {
    private _type;
    private _colliders;
    private _gravity;
    private _layersToCollide;
    private _velocity;
    private deltaVelocity;
    private gravityTime;
    private collisions;
    private timeManager;
    constructor({ type, colliders, layersToCollide, gravity }: Config);
    get type(): RigidBodyType;
    set velocity(velocity: Vector2);
    get velocity(): Vector2;
    set gravity(gravity: number);
    get gravity(): number;
    protected update(): void;
    private applyGravityToVelocity;
    protected moveGameObject(): void;
    private moveX;
    private moveY;
    private updateCollisions;
    private isTouchingLayers;
}
export {};
