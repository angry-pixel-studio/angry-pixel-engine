import { Component, PhysicsComponent } from "../Component";
import { ICollider } from "../Core/Collision/Collider/ICollider";
import { Collision } from "../Core/Collision/CollisionManager";
import { TimeManager } from "../Core/Time/TimeManager";
import { container } from "../Game";
import { Vector2 } from "../Helper/Vector2";
import { ColliderComponent } from "./Colliders/ColliderComponent";

export enum RigidBodyType {
    Static,
    Dynamic,
}

interface Config {
    rigidBodyType: RigidBodyType;
    colliders: ColliderComponent[];
    layersToCollide: string[];
    gravity: number;
}

export const TYPE_RIGIDBODY: string = "RigidBody";

export class RigidBody extends PhysicsComponent {
    private _rigidBodyType: RigidBodyType;
    private _colliderComponents: ColliderComponent[] = [];
    private _gravity: number = 1;
    private _layersToCollide: string[] = [];
    private _velocity: Vector2 = new Vector2(0, 0);
    private deltaVelocity: Vector2 = new Vector2(0, 0);

    private collisions: Collision[] = [];

    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");

    constructor({ rigidBodyType, colliders, layersToCollide, gravity = 1 }: Config) {
        super();

        this.type = TYPE_RIGIDBODY;
        this.allowMultiple = false;

        this._rigidBodyType = rigidBodyType;
        this._colliderComponents = colliders;
        this._layersToCollide = layersToCollide;
        this._gravity = gravity;
    }

    public get rigidBodyType(): RigidBodyType {
        return this._rigidBodyType;
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
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }

        this.applyGravityToVelocity();
        this.moveGameObject();
    }

    private applyGravityToVelocity(): void {
        if (this._gravity > 0) {
            this._velocity.y -= this._gravity * this.timeManager.deltaTime;
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

        this.collisions.forEach((collision: Collision) => {
            const rigidBody = collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY);
            if (rigidBody !== null) {
                rollback ||=
                    (this.deltaVelocity.x > 0 &&
                        collision.remoteCollider.coordinates.x >= collision.localCollider.coordinates.x) ||
                    (this.deltaVelocity.x < 0 &&
                        collision.remoteCollider.coordinates.x <= collision.localCollider.coordinates.x);
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

        this.collisions.forEach((collision: Collision) => {
            const rigidBody = collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY);
            if (rigidBody !== null) {
                rollback ||=
                    (this.deltaVelocity.y > 0 &&
                        collision.remoteCollider.coordinates.y >= collision.localCollider.coordinates.y) ||
                    (this.deltaVelocity.y < 0 &&
                        collision.remoteCollider.coordinates.y <= collision.localCollider.coordinates.y);
            }
        });

        if (rollback) {
            this.gameObject.transform.position.y -= this.deltaVelocity.y;
            this._velocity.y = 0;
        }
    }

    private updateCollisions(): void {
        this.collisions = [];

        this._colliderComponents.forEach((collider: ColliderComponent) =>
            this._layersToCollide.forEach((layer: string) =>
                collider.getCollisionsWithLayer(layer).forEach((collision: Collision) => {
                    this.collisions.push(collision);
                })
            )
        );
    }
}
