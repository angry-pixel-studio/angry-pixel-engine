import { EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { Vector2 } from "@angry-pixel/math";
import { BaseCollider } from "./collider/Collider";
export { RigidBodyType } from "@angry-pixel/2d-physics";
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
    constructor() {
        super(...arguments);
        /** @internal */
        this.allowMultiple = false;
    }
    /** Velocity applied to the x-axis and y-axis expressed in pixels per second. */
    get velocity() {
        return this.rigidBody.velocity;
    }
    /** Velocity applied to the x-axis and y-axis expressed in pixels per second. */
    set velocity(velocity) {
        this.rigidBody.velocity.copy(velocity);
    }
    /** Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies */
    get gravity() {
        return this.rigidBody.gravity;
    }
    /** Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies */
    set gravity(gravity) {
        this.rigidBody.gravity = Math.abs(gravity);
    }
    /**
     * The type determines how it will respond to physics and collisions.
       - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
       - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
       - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
     */
    get rigidBodyType() {
        return this.rigidBody.type;
    }
    init({ rigidBodyType, gravity }) {
        var _a;
        if (this.getColliderIds().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }
        this.rigidBody = this.physicsManager.addRigidBody({
            type: rigidBodyType,
            colliderIds: this.getColliderIds(),
            gravity: (_a = Math.abs(gravity)) !== null && _a !== void 0 ? _a : 0,
            velocity: new Vector2(),
            position: new Vector2(),
        });
    }
    update() {
        if (this.getColliderIds().length === 0) {
            throw new Exception("RigidBody needs at least one Collider with physics");
        }
        this.rigidBody.colliderIds = this.getColliderIds();
        // setted by reference, so any change made by the RigidBodyManager will impact in the object position
        this.rigidBody.position = this.gameObject.transform.parent
            ? this.gameObject.transform.innerPosition
            : this.gameObject.transform.position;
    }
    getColliderIds() {
        return this.gameObject
            .getComponents()
            .filter((component) => component instanceof BaseCollider && component.physics)
            .reduce((ids, component) => [...ids, ...component.colliders.map((c) => c.id)], []);
    }
    onActiveChange() {
        this.rigidBody.active = this.active;
    }
    onDestroy() {
        this.physicsManager.removeRigidBody(this.rigidBody);
    }
}
//# sourceMappingURL=RigidBody.js.map