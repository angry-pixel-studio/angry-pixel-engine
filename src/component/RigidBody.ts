import { Component, EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { container } from "../core/Game";
import { Vector2 } from "../math/Vector2";
import { AbstractColliderComponent } from "./colliderComponent/AbstractColliderComponent";
import { ComponentTypes } from "./ComponentTypes";
import { ICollider } from "..";
import { PhysicsManager, RigidBodyData, RigidBodyType } from "../physics/PhysicsManager";

const defaultGravity: number = 10;

export { RigidBodyType } from "../physics/PhysicsManager";

export interface RigidBodyConfig {
    rigidBodyType: RigidBodyType;
    layersToCollide?: string[];
    gravity?: number;
}

export class RigidBody extends EngineComponent {
    private physicsManager: PhysicsManager = container.getSingleton<PhysicsManager>("PhysicsManager");

    public readonly rigidBodyType: RigidBodyType;
    private data: RigidBodyData;

    constructor(config: RigidBodyConfig) {
        super();

        this.type = ComponentTypes.RigidBody;
        this.allowMultiple = false;

        this.rigidBodyType = config.rigidBodyType;

        this.data = {
            layersToCollider: config.layersToCollide ?? [],
            gravity: new Vector2(0, config.gravity ?? defaultGravity),
            velocity: new Vector2(),
            colliders: [],
            gameObject: null,
        };
    }

    public set velocity(velocity: Vector2) {
        this.data.velocity.set(velocity.x, velocity.y);
    }

    public get velocity(): Vector2 {
        return this.data.velocity;
    }

    public set gravity(gravity: number) {
        this.data.gravity.set(0, Math.abs(gravity));
    }

    public get gravity(): number {
        return this.data.gravity.y;
    }

    protected start(): void {
        if (this.getColliders().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }

        this.data.gameObject = this.gameObject;
        this.data.colliders = this.getColliders();

        if (this.rigidBodyType === RigidBodyType.Dynamic) {
            this.physicsManager.addRigidBodyData(this.data);
        }
    }

    private getColliders(): ICollider[] {
        return this.gameObject
            .getComponents()
            .reduce<ICollider[]>(
                (colliders, component: Component) =>
                    component instanceof AbstractColliderComponent && component.physics
                        ? [...colliders, ...component.colliders]
                        : colliders,
                []
            );
    }
}
