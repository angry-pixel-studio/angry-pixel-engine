import { EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { Vector2 } from "angry-pixel-math";
import { BaseCollider } from "./collider/Collider";
import { InitOptions } from "../core/GameActor";
import { IRigidBody, RigidBodyType } from "angry-pixel-2d-physics";

export { RigidBodyType } from "angry-pixel-2d-physics";

/**
 * RigidBody configuration options
 * @public
 * @category Components
 */
export interface RigidBodyOptions extends InitOptions {
    /** 
     * The type determines how it will respond to physics and collisions.
       - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
       - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
       - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
     */
    rigidBodyType: RigidBodyType;
    /** Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies */
    gravity?: number;
}

/**
 * The RigidBody component puts the object under simulation of the physics engine, where it will interact with other objects that have a RigidBody.
 * The RigidBody component requires the object to have at least one collider.
 *
 * There are three types of bodies:
 * - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
 * - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
 * - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
 * @public
 * @category Components
 * @example
 * ```js
  const body = this.addComponent(RigidBody, {
    rigidBodyType: RigidBodyType.Dynamic,
    gravity: 10
  });
  body.velocity = 200;
 * ```
 * @example
 * ```js
  const body = this.addComponent(RigidBody, {
    rigidBodyType: RigidBodyType.Kinematic,
  });
  body.velocity = 200;
 * ```
 * @example
 * ```js
  const body = this.addComponent(RigidBody, {
    rigidBodyType: RigidBodyType.Static,
  });
 * ```
 */
export class RigidBody extends EngineComponent {
    /** @private */
    public readonly allowMultiple: boolean = false;

    private rigidBody: IRigidBody;

    /** Velocity applied to the x-axis and y-axis expressed in pixels per second. */
    public get velocity(): Vector2 {
        return this.rigidBody.velocity;
    }

    /** Velocity applied to the x-axis and y-axis expressed in pixels per second. */
    public set velocity(velocity: Vector2) {
        this.rigidBody.velocity.copy(velocity);
    }

    /** Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies */
    public get gravity(): number {
        return this.rigidBody.gravity;
    }

    /** Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies */
    public set gravity(gravity: number) {
        this.rigidBody.gravity = Math.abs(gravity);
    }

    /** 
     * The type determines how it will respond to physics and collisions.
       - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
       - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
       - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
     */
    public get rigidBodyType(): RigidBodyType {
        return this.rigidBody.type;
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
            .filter((component) => component instanceof BaseCollider && component.physics)
            .reduce((ids, component) => [...ids, ...(component as BaseCollider).colliders.map((c) => c.id)], []);
    }

    protected onActiveChange(): void {
        this.rigidBody.active = this.active;
    }

    protected onDestroy(): void {
        this.physicsManager.removeRigidBody(this.rigidBody);
    }
}
