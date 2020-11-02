import { Component } from "../Component";
import { TimeManager } from "../Core/Time/TimeManager";
import { container } from "../Game";
import { Vector2 } from "../Helper/Vector2";
import { Collider } from "./Colliders/Collider";

interface Config {
    colliders: Collider[];
    layersToCollide: string[];
    gravity: number;
}

export class RigidBody extends Component {
    private _colliders: Collider[] = [];
    private _gravity: number = 1;
    private _layersToCollide: string[] = [];
    private _velocity: Vector2 = new Vector2(0, 0);
    private deltaVelocity: Vector2 = new Vector2(0, 0);

    private deltaGravity: number = 0;

    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");

    constructor({ colliders, layersToCollide, gravity = 1 }: Config) {
        super();

        this._colliders = colliders;
        this._layersToCollide = layersToCollide;
        this._gravity = gravity;
    }

    public set velocity(velocity: Vector2) {
        this.velocity.set(velocity.x, velocity.y);
    }

    public get velocity(): Vector2 {
        return this._velocity;
    }

    public set gravity(gravity: number) {
        this.gravity = gravity;
    }

    public get gravity(): number {
        return this._gravity;
    }

    protected update(): void {
        this.applyGravityToVelocity();
        this.moveGameObject();
    }

    private applyGravityToVelocity(): void {
        if (this._gravity > 0) {
            this.deltaGravity += this._gravity * this.timeManager.deltaTime;
            this._velocity.y -= this.deltaGravity;
        }
    }

    protected moveGameObject(): void {
        if (this._velocity.x !== 0) {
            this.moveX();
        }

        if (this._velocity.y !== 0) {
            this.moveY();
        }
    }

    private moveX(): void {
        this.deltaVelocity.x = this._velocity.x * this.timeManager.deltaTime;
        this.gameObject.transform.position.x += this.deltaVelocity.x;

        if (this.isTouchingLayers()) {
            this.gameObject.transform.position.x -= this.deltaVelocity.x;
            this._velocity.x = 0;
            this.deltaVelocity.x = 0;
        }
    }

    private moveY(): void {
        this.deltaVelocity.y = this._velocity.y * this.timeManager.deltaTime;
        this.gameObject.transform.position.y += this.deltaVelocity.y;

        if (this.isTouchingLayers()) {
            this.gameObject.transform.position.y -= this.deltaVelocity.y;

            // If the object is falling and it reaches a collision, we must reset deltaGravity
            if (this.velocity.y < 0 && this._gravity > 0) {
                this.deltaGravity = 0;
            }

            this._velocity.y = 0;
            this.deltaVelocity.y = 0;
        }
    }

    private isTouchingLayers(): boolean {
        for (const collider of this._colliders) {
            for (const layer of this._layersToCollide) {
                if (collider.collidesWithLayer(layer)) {
                    return true;
                }
            }
        }
        return false;
    }
}
