import { Component, EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { container } from "../core/Game";
import { Vector2 } from "angry-pixel-math";
import { Collider } from "./collider/Collider";
import { RigidBodyManager, RigidBodyType } from "../physics/rigodBody/RigidBodyManager";
import { RigidBodyData } from "../physics/rigodBody/RigidBodyData";
import { ColliderData } from "../physics/collision/ColliderData";
import { InitOptions } from "../core/GameActor";

const defaultGravity: number = 10;

export { RigidBodyType } from "../physics/rigodBody/RigidBodyManager";

export interface RigidBodyOptions extends InitOptions {
    rigidBodyType: RigidBodyType;
    gravity?: number;
}

export class RigidBody extends EngineComponent {
    public readonly allowMultiple: boolean = false;

    private rigidBodyManager: RigidBodyManager = container.getSingleton<RigidBodyManager>("RigidBodyManager");

    private data: RigidBodyData;

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

    public get rigidBodyType(): RigidBodyType {
        return this.data.type;
    }

    protected init({ rigidBodyType, gravity }: RigidBodyOptions): void {
        this.data = {
            type: rigidBodyType,
            position: null,
            gravity: Math.abs(gravity) ?? defaultGravity,
            velocity: new Vector2(),
            colliders: [],
        };
    }

    protected start(): void {
        if (this.getColliders().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }
    }

    protected update(): void {
        if (this.data.type !== RigidBodyType.Static) {
            // setted by reference, so any change made by the RigidBodyManager will impact in the object position
            this.data.position = this.gameObject.transform.parent
                ? this.gameObject.transform.innerPosition
                : this.gameObject.transform.position;

            this.data.colliders = this.getColliders();

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
