import { EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { Vector2 } from "angry-pixel-math";
import { Collider } from "./collider/Collider";
import { InitOptions } from "../core/GameActor";
import { IPhysicsManager, IRigidBody, RigidBodyType } from "angry-pixel-2d-physics";

export { RigidBodyType } from "angry-pixel-2d-physics";

export interface RigidBodyOptions extends InitOptions {
    rigidBodyType: RigidBodyType;
    gravity?: number;
}

export class RigidBody extends EngineComponent {
    public readonly allowMultiple: boolean = false;

    private physicsManager: IPhysicsManager = this.container.getSingleton<IPhysicsManager>("PhysicsManager");
    private rigidBody: IRigidBody;

    public get velocity(): Vector2 {
        return this.rigidBody.velocity;
    }

    public set velocity(velocity: Vector2) {
        this.rigidBody.velocity.copy(velocity);
    }

    public get gravity(): number {
        return this.rigidBody.gravity;
    }

    public set gravity(gravity: number) {
        this.rigidBody.gravity = Math.abs(gravity);
    }

    protected init({ rigidBodyType, gravity }: RigidBodyOptions): void {
        if (this.getColliderIds().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }

        this.rigidBody = this.physicsManager.addRigidBody({
            type: rigidBodyType,
            colliderIds: this.getColliderIds(),
            gravity: Math.abs(gravity) ?? 0,
            velocity: new Vector2(),
            position: new Vector2(),
        });
    }

    protected update(): void {
        if (this.getColliderIds().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }

        this.rigidBody.colliderIds = this.getColliderIds();
        // setted by reference, so any change made by the RigidBodyManager will impact in the object position
        this.rigidBody.position = this.gameObject.transform.parent
            ? this.gameObject.transform.innerPosition
            : this.gameObject.transform.position;
    }

    private getColliderIds(): number[] {
        return this.gameObject
            .getComponents()
            .filter((component) => component instanceof Collider && component.physics)
            .reduce((ids, component) => [...ids, ...(component as Collider).colliders.map((c) => c.id)], []);
    }

    protected onActiveChange(): void {
        this.rigidBody.active = this.active;
    }

    protected onDestroy(): void {
        this.physicsManager.removeRigidBody(this.rigidBody);
    }
}
