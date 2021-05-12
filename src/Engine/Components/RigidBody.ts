import { Component, PhysicsComponent } from "../Component";
import { Collision } from "../Core/Collision/CollisionManager";
import { MiniEngineException } from "../Core/Exception/MiniEngineException";
import { PhysicsIterationManager } from "../Core/Physics/PhysicsIterationManager";
import { container } from "../Game";
import { Vector2 } from "../Math/Vector2";
import { AbstractColliderComponent } from "./Colliders/AbstractColliderComponent";

export enum RigidBodyType {
    Static,
    Dynamic,
}

export interface RigidBodyConfig {
    rigidBodyType: RigidBodyType;
    layersToCollide: string[];
    gravity?: number;
}

type Axis = "x" | "y";

export const TYPE_RIGIDBODY: string = "RigidBody";

export class RigidBody extends PhysicsComponent {
    private readonly iterationManager: PhysicsIterationManager = container.getSingleton<PhysicsIterationManager>(
        "PhysicsIterationManager"
    );
    private readonly gravityScale: number = 9.8;
    private readonly velocityScale: number = 60;

    private _rigidBodyType: RigidBodyType;
    private _colliderComponents: AbstractColliderComponent[] = [];
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
    private updatePosition: boolean = false;
    private penetrationResolution: Vector2 = new Vector2();
    private nextObjectPosition: Vector2 = new Vector2();

    constructor(config: RigidBodyConfig) {
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
                component instanceof AbstractColliderComponent && component.physics
                    ? this._colliderComponents.push(component)
                    : null
            );

        if (this._colliderComponents.length === 0) {
            throw new MiniEngineException("RigidBody needs at least one Collider");
        }
    }

    protected update(): void {
        if (this._rigidBodyType === RigidBodyType.Static) {
            return;
        }

        this.applyGravity();

        this.deltaVelocity.set(0, 0);
        this.applyVelocity("x");
        this.applyReposition("x");

        this.deltaVelocity.set(0, 0);
        this.applyVelocity("y");
        this.applyReposition("y");
    }

    private applyGravity(): void {
        if (this._gravity.y > 0) {
            this._velocity = Vector2.add(
                this._velocity,
                this._velocity,
                Vector2.scale(
                    this.deltaGravity,
                    this._gravity,
                    -this.gravityScale * this.iterationManager.physicsDeltaTime
                )
            );
        }
    }

    private applyVelocity(axis: Axis): void {
        this.deltaVelocity[axis] = this._velocity[axis] * this.velocityScale * this.iterationManager.physicsDeltaTime;

        if (this.deltaVelocity.x !== 0 || this.deltaVelocity.y !== 0) {
            this.gameObject.transform.position = Vector2.add(
                this.nextObjectPosition,
                this.gameObject.transform.position,
                this.deltaVelocity
            );
        }
    }

    private applyReposition(axis: Axis): void {
        this.updatePosition = false;
        this.penetrationResolution.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
        this.penetrationPerDirection[axis].clear();

        this.updateCollisions();

        this.collisions.forEach((collision: Collision) => {
            if (
                collision.remoteCollider.physics === true &&
                collision.remoteCollider.gameObject.getComponentByType<RigidBody>(TYPE_RIGIDBODY) !== null
            ) {
                if (collision.collisionData.direction[axis] !== 0) {
                    this.setPenetrationPerDirectionPerAxis(axis, collision);
                }
            }
        });

        this.setPenetrationResolution(axis);

        if (this.updatePosition) {
            this.gameObject.transform.position = this.penetrationResolution;
        }
    }

    private setPenetrationPerDirectionPerAxis(axis: Axis, collision: Collision): void {
        this.penetrationPerDirection[axis].set(
            collision.collisionData.direction[axis],
            Math.max(
                this.penetrationPerDirection[axis].get(collision.collisionData.direction[axis]) ?? 0,
                collision.collisionData.penetration
            )
        );
    }

    private setPenetrationResolution(axis: Axis): void {
        this.penetrationPerDirection[axis].forEach((penetration: number, direction: number) => {
            this.penetrationResolution[axis] += direction * penetration;

            if (this._velocity[axis] !== 0 && Math.sign(this._velocity[axis]) !== Math.sign(direction)) {
                this._velocity[axis] = 0;
            }

            this.updatePosition = true;
        });
    }

    private updateCollisions(): void {
        this.collisions = [];

        this._colliderComponents.forEach((collider: AbstractColliderComponent) =>
            this._layersToCollide.forEach((layer: string) =>
                collider
                    .getCollisionsWithLayer(layer)
                    .forEach((collision: Collision) => this.collisions.push(collision))
            )
        );
    }
}
