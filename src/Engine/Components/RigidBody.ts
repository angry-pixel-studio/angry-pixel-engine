import { Component, PhysicsComponent } from "../Component";
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
    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");

    private readonly gravityScale: number = 9.8;
    private readonly physicsFramerate: number = 60;
    private readonly physicsIterations: number = 12;

    private physicsDeltaTime: number = 0;
    private deltaTimeAccumulator: number = 0;

    private _rigidBodyType: RigidBodyType;
    private _colliderComponents: ColliderComponent[] = [];
    private _layersToCollide: string[] = [];
    private _velocity: Vector2 = new Vector2();
    private _gravity: Vector2 = new Vector2();

    private deltaGravity: Vector2 = new Vector2();
    private deltaVelocity: Vector2 = new Vector2();

    private collisions: Collision[] = [];

    private penetrationPerDirection: { x: Map<number, number>; y: Map<number, number> } = {
        x: new Map<number, number>(),
        y: new Map<number, number>(),
    };

    private nextObjectPosition: Vector2 = new Vector2();

    constructor(config: Config) {
        super();

        this.type = TYPE_RIGIDBODY;
        this.allowMultiple = false;

        this._rigidBodyType = config.rigidBodyType;
        this._layersToCollide = config.layersToCollide;
        this._gravity.set(0, config.gravity ?? this._gravity.y);

        this.physicsDeltaTime = parseFloat((1 / this.physicsFramerate / this.physicsIterations).toFixed(6));
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

        if (this._colliderComponents.length === 0) {
            throw new Error("RigidBody needs at least one Collider");
        }
    }

    protected update(): void {
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }

        this.deltaTimeAccumulator += this.timeManager.deltaTime;

        while (this.deltaTimeAccumulator >= this.physicsDeltaTime) {
            this.applyGravity();
            this.applyVelocity();

            this.deltaTimeAccumulator -= this.physicsDeltaTime;
        }
    }

    private applyGravity(): void {
        if (this._gravity.y > 0) {
            this._velocity = Vector2.add(
                this._velocity,
                this._velocity,
                Vector2.scale(this.deltaGravity, this._gravity, -this.gravityScale * this.physicsDeltaTime)
            );
        }
    }

    private applyVelocity(): void {
        Vector2.scale(this.deltaVelocity, this._velocity, this.physicsFramerate * this.physicsDeltaTime);

        if (this.deltaVelocity.x !== 0 || this.deltaVelocity.y !== 0) {
            this.move();
        }
    }

    private move(): void {
        this.penetrationPerDirection.x.clear();
        this.penetrationPerDirection.y.clear();

        this.gameObject.transform.position = Vector2.add(
            this.nextObjectPosition,
            this.gameObject.transform.position,
            this.deltaVelocity
        );
        this.updateCollisions();

        this.collisions.forEach((collision: Collision) => {
            if (
                collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY) !== null
            ) {
                if (collision.collisionData.direction.x !== 0) {
                    this.setPenetrationPerDirectionPerAxis("x", collision);
                }

                if (collision.collisionData.direction.y !== 0) {
                    this.setPenetrationPerDirectionPerAxis("y", collision);
                }
            }
        });

        this.penetrationResolution("x");
        this.penetrationResolution("y");
    }

    private setPenetrationPerDirectionPerAxis(axis: "x" | "y", collision: Collision): void {
        this.penetrationPerDirection[axis].set(
            collision.collisionData.direction[axis],
            Math.max(
                this.penetrationPerDirection[axis].get(collision.collisionData.direction[axis]) ?? 0,
                collision.collisionData.penetration
            )
        );
    }

    private penetrationResolution(axis: "x" | "y"): void {
        this.penetrationPerDirection[axis].forEach((penetration: number, direction: number) => {
            this.gameObject.transform.position[axis] += direction * penetration;

            if (this._velocity[axis] !== 0 && Math.sign(this._velocity[axis]) !== Math.sign(direction)) {
                this._velocity[axis] = 0;
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
