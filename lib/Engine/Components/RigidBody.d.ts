import { Component } from "../Component";
import { Vector2 } from "../Helper/Vector2";
import { Collider } from "./Colliders/Collider";
interface Config {
    colliders: Collider[];
    layersToCollide: string[];
    gravity: number;
}
export declare class RigidBody extends Component {
    private _colliders;
    private _gravity;
    private _layersToCollide;
    private _velocity;
    private deltaVelocity;
    private deltaGravity;
    private timeManager;
    constructor({ colliders, layersToCollide, gravity }: Config);
    set velocity(velocity: Vector2);
    get velocity(): Vector2;
    set gravity(gravity: number);
    get gravity(): number;
    protected update(): void;
    private applyGravityToVelocity;
    protected moveGameObject(): void;
    private moveX;
    private moveY;
    private isTouchingLayers;
}
export {};
