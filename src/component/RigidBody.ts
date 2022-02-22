import { Component, EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { container } from "../core/Game";
import { Vector2 } from "../math/Vector2";
import { Collider } from "./collider/Collider";
import { ComponentTypes } from "./ComponentTypes";
import { RigidBodyManager, RigidBodyType } from "../physics/rigodBody/RigidBodyManager";
import { RigidBodyData } from "../physics/rigodBody/RigidBodyData";
import { ColliderData } from "../physics/collision/ColliderData";

const defaultGravity: number = 10;

export { RigidBodyType } from "../physics/rigodBody/RigidBodyManager";

export interface RigidBodyConfig {
    rigidBodyType: RigidBodyType;
    layersToCollide?: string[];
    gravity?: number;
}

export class RigidBody extends EngineComponent {
    private rigidBodyManager: RigidBodyManager = container.getSingleton<RigidBodyManager>("RigidBodyManager");

    public readonly rigidBodyType: RigidBodyType;
    private data: RigidBodyData;

    constructor(config: RigidBodyConfig) {
        super();

        this.type = ComponentTypes.RigidBody;
        this.allowMultiple = false;

        this.rigidBodyType = config.rigidBodyType;

        this.data = {
            position: null,
            gravity: Math.abs(config.gravity) ?? defaultGravity,
            velocity: new Vector2(),
            layersToCollider: config.layersToCollide ?? [],
            colliders: [],
        };
    }

    public set velocity(velocity: Vector2) {
        this.data.velocity.set(velocity.x, velocity.y);
    }

    public get velocity(): Vector2 {
        return this.data.velocity;
    }

    public set gravity(gravity: number) {
        this.data.gravity = Math.abs(gravity);
    }

    public get gravity(): number {
        return this.data.gravity;
    }

    protected start(): void {
        if (this.getColliders().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }

        // setted by reference, so any change made by the RigidBodyManager will impact in the object position
        this.data.position = this.gameObject.transform.position;
    }

    protected update(): void {
        this.data.colliders = this.getColliders();

        if (this.rigidBodyType === RigidBodyType.Dynamic) {
            this.rigidBodyManager.addRigidBodyData(this.data);
        }
    }

    private getColliders(): ColliderData[] {
        return this.gameObject
            .getComponents()
            .reduce<ColliderData[]>(
                (colliders, component: Component) =>
                    component instanceof Collider && component.physics
                        ? [...colliders, ...component.colliders]
                        : colliders,
                []
            );
    }
}
