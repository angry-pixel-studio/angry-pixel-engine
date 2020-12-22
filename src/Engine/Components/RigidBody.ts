import { Component, PhysicsComponent } from "../Component";
import { ICollider } from "../Core/Collision/Collider/ICollider";
import { Collision } from "../Core/Collision/CollisionManager";
import { TimeManager } from "../Core/Time/TimeManager";
import { container } from "../Game";
import { Vector2 } from "../Math/Vector2";
import { ColliderComponent } from "./Colliders/ColliderComponent";

export enum RigidBodyType {
    Static,
    Dynamic,
}

interface Config {
    rigidBodyType: RigidBodyType;
    layersToCollide: string[];
    gravity?: number;
}

export const TYPE_RIGIDBODY: string = "RigidBody";

export class RigidBody extends PhysicsComponent {
    private readonly velocityScale: number = 60;
    private readonly gravityScale: number = 9.8;

    private _rigidBodyType: RigidBodyType;
    private _colliderComponents: ColliderComponent[] = [];
    private _layersToCollide: string[] = [];
    private _velocity: Vector2 = new Vector2();
    private _gravity: Vector2 = new Vector2();

    private deltaVelocity: Vector2;

    private collisions: Collision[] = [];

    private penetrationPerDirection: { x: Map<number, number>; y: Map<number, number> } = {
        x: new Map<number, number>(),
        y: new Map<number, number>(),
    };

    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");

    constructor(config: Config) {
        super();

        this.type = TYPE_RIGIDBODY;
        this.allowMultiple = false;

        this._rigidBodyType = config.rigidBodyType;
        this._layersToCollide = config.layersToCollide;
        this._gravity.set(0, config.gravity ?? this._gravity.y);
    }

    public get rigidBodyType(): RigidBodyType {
        return this._rigidBodyType;
    }

    public set velocity(velocity: Vector2) {
        this._velocity.set(velocity.x, velocity.y);
    }

    public get velocity(): Vector2 {
        return this._velocity;
    }

    public set gravity(gravity: number) {
        this._gravity.set(this._gravity.x, gravity);
    }

    public get gravity(): number {
        return this._gravity.y;
    }

    protected start(): void {
        this.gameObject
            .getComponents()
            .forEach((component: Component) =>
                component instanceof ColliderComponent && component.physics
                    ? this._colliderComponents.push(component)
                    : null
            );
    }

    protected update(): void {
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }

        this.applyGravity();
        this.applyVelocity();
    }

    private applyGravity(): void {
        if (this._gravity.y > 0) {
            this._velocity = this._velocity.add(this._gravity.mult(-this.gravityScale * this.timeManager.deltaTime));
        }
    }

    private applyVelocity(): void {
        this.deltaVelocity = this._velocity.mult(this.velocityScale * this.timeManager.deltaTime);

        if (this._velocity.x !== 0) {
            this.moveX();
        }

        if (this._velocity.y !== 0) {
            this.moveY();
        }
    }

    private moveX(): void {
        this.penetrationPerDirection.x.clear();

        this.gameObject.transform.position.set(
            this.gameObject.transform.position.x + this.deltaVelocity.x,
            this.gameObject.transform.position.y
        );
        this.updateCollisions();

        this.collisions.forEach((collision: Collision) => {
            if (
                collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY) !== null &&
                collision.collisionData.direction.x !== 0
            ) {
                this.penetrationPerDirection.x.set(
                    collision.collisionData.direction.x,
                    Math.max(
                        this.penetrationPerDirection.x.get(collision.collisionData.direction.x) ?? 0,
                        collision.collisionData.penetration
                    )
                );
            }
        });

        this.penetrationPerDirection.x.forEach((penetration: number, direction: number) => {
            const pen: number = direction * penetration;
            this.gameObject.transform.position.set(
                this.gameObject.transform.position.x + pen,
                this.gameObject.transform.position.y
            );

            if (this._velocity.unit().x !== direction) {
                this._velocity.set(0, this._velocity.y);
            }
        });
    }

    private moveY(): void {
        this.penetrationPerDirection.y.clear();

        this.gameObject.transform.position.set(
            this.gameObject.transform.position.x,
            this.gameObject.transform.position.y + this.deltaVelocity.y
        );
        this.updateCollisions();

        this.collisions.forEach((collision: Collision) => {
            if (
                collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY) !== null &&
                collision.collisionData.direction.y !== 0
            ) {
                this.penetrationPerDirection.y.set(
                    collision.collisionData.direction.y,
                    Math.max(
                        this.penetrationPerDirection.y.get(collision.collisionData.direction.y) ?? 0,
                        collision.collisionData.penetration
                    )
                );
            }
        });

        this.penetrationPerDirection.y.forEach((penetration: number, direction: number) => {
            const pen: number = direction * penetration;
            this.gameObject.transform.position.set(
                this.gameObject.transform.position.x,
                this.gameObject.transform.position.y + pen
            );

            if (this._velocity.unit().y !== direction) {
                this._velocity.set(this._velocity.x, 0);
            }
        });
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
