import { Component } from "../Component";
import { ICollider } from "../Core/Collision/Collider/ICollider";
import { TimeManager } from "../Core/Time/TimeManager";
import { container } from "../Game";
import { Vector2 } from "../Helper/Vector2";
import { Collider } from "./Colliders/Collider";

export enum RigidBodyType {
    Static,
    Dynamic,
}

interface Config {
    type: RigidBodyType;
    colliders: Collider[];
    layersToCollide: string[];
    gravity: number;
}

export class RigidBody extends Component {
    private _type: RigidBodyType;
    private _colliders: Collider[] = [];
    private _gravity: number = 1;
    private _layersToCollide: string[] = [];
    private _velocity: Vector2 = new Vector2(0, 0);
    private deltaVelocity: Vector2 = new Vector2(0, 0);

    private gravityTime: number = 0;
    private collisions: ICollider[] = [];

    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");

    constructor({ type, colliders, layersToCollide, gravity = 1 }: Config) {
        super();

        this._type = type;
        this._colliders = colliders;
        this._layersToCollide = layersToCollide;
        this._gravity = gravity;
    }

    public get type(): RigidBodyType {
        return this._type;
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
        if (this._type === RigidBodyType.Static) {
            return;
        }

        this.applyGravityToVelocity();
        this.moveGameObject();
    }

    private applyGravityToVelocity(): void {
        if (this._gravity > 0) {
            this.gravityTime += this.timeManager.deltaTime;
            this._velocity.y -= this._gravity * this.gravityTime;
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
        this.deltaVelocity.set(this._velocity.x * this.timeManager.deltaTime, 0);
        this.gameObject.transform.position.x += this.deltaVelocity.x;
        this.updateCollisions();
        let rollback: boolean = false;

        this.collisions.forEach((collision: ICollider) => {
            const rigidBody = collision.gameObject.getComponent<RigidBody>("RigidBody");
            if (rigidBody !== null) {
                rollback ||=
                    (this.deltaVelocity.x > 0 && collision.coordinates.x >= this.gameObject.transform.position.x) ||
                    (this.deltaVelocity.x < 0 && collision.coordinates.x <= this.gameObject.transform.position.x);

                //rigidBody.velocity = new Vector2(rigidBody.velocity.x + this._velocity.x, rigidBody.velocity.y);
            }
        });

        if (rollback) {
            this.gameObject.transform.position.x -= this.deltaVelocity.x;
            this._velocity.x = 0;
        }
    }

    private moveY(): void {
        this.deltaVelocity.set(0, this._velocity.y * this.timeManager.deltaTime);
        this.gameObject.transform.position.y += this.deltaVelocity.y;
        this.updateCollisions();
        let rollback: boolean = false;

        this.collisions.forEach((collision: ICollider) => {
            const rigidBody = collision.gameObject.getComponent<RigidBody>("RigidBody");
            if (rigidBody !== null) {
                rollback ||=
                    (this.deltaVelocity.y > 0 && collision.coordinates.y >= this.gameObject.transform.position.y) ||
                    (this.deltaVelocity.y < 0 && collision.coordinates.y <= this.gameObject.transform.position.y);

                //rigidBody.velocity = new Vector2(rigidBody.velocity.x, rigidBody.velocity.y + this._velocity.y);

                if (collision.coordinates.y <= this.gameObject.transform.position.y) {
                    this.gravityTime = 0;
                }
            }
        });

        if (rollback) {
            this.gameObject.transform.position.y -= this.deltaVelocity.y;
            this._velocity.y = 0;
        }
    }

    private updateCollisions(): void {
        this.collisions = [];

        this._colliders.forEach((collider: Collider) =>
            this._layersToCollide.forEach((layer: string) =>
                collider.getCollisionsWithLayer(layer).forEach((collision: ICollider) => {
                    this.collisions.push(collision);
                })
            )
        );
    }
}
