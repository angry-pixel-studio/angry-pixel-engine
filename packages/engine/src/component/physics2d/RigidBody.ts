import { Vector2 } from "@math";

/**
 * The type of the rigid body to create:
 * - Dynamic: This type of body is affected by gravity and velocity.
 * - Static: This type of body is immovable, is unaffected by velocity and gravity.
 * @category Components
 * @public
 */
export enum RigidBodyType {
    Dynamic,
    Static,
}

/**
 * RigidBody configuration options
 * @public
 * @category Components
 * @example
 * ```js
  const rigidBody = new RigidBody({
    rigidBodyType: RigidBodyType.Dynamic,
    gravity: 10,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0)
  });
 * ```
 * @example
 * ```js
  const rigidBody = new RigidBody({
    rigidBodyType: RigidBodyType.Static,
  });
 * ```
 */
export interface RigidBodyOptions {
    /**
     * The type of the rigid body to create:
     * - Dynamic: This type of body is affected by gravity and velocity.
     * - Static: This type of body is immovable, is unaffected by velocity and gravity.
     * @public
     */
    type: RigidBodyType;
    /**
     * Velocity applied to the x-axis and y-axis expressed in pixels per second. Only for Dynamic bodies
     * @public
     */
    velocity: Vector2;
    /**
     * Gravity expressed in pixels per second squared. Only for Dynamic bodies
     * @public
     */
    gravity: number;
    /**
     * Acceleration expressed in pixels per second squared. Only for Dynamic bodies
     * @public
     */
    acceleration: Vector2;
}

/**
 * The RigidBody component puts the entity under simulation of the physics engine, where it will interact with other objects that have a RigidBody.\
 * There are two types of bodies:
 * - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with other rigid bodies.
 * - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
 * @public
 * @category Components
 * @example
 * ```js
  const rigidBody = new RigidBody({
    rigidBodyType: RigidBodyType.Dynamic,
    gravity: 10,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0)
  });
 * ```
 * @example
 * ```js
  const rigidBody = new RigidBody({
    rigidBodyType: RigidBodyType.Static,
  });
 * ```
 */
export class RigidBody {
    /**
     * The type of the rigid body to create:
     * - Dynamic: This type of body is affected by gravity and velocity.
     * - Static: This type of body is immovable, is unaffected by velocity and gravity.
     * @public
     */
    type: RigidBodyType = RigidBodyType.Dynamic;
    /**
     * Velocity applied to the x-axis and y-axis expressed in pixels per second. Only for Dynamic bodies
     * @public
     */
    velocity: Vector2 = new Vector2();
    /**
     * Gravity expressed in pixels per second squared. Only for Dynamic bodies
     * @public
     */
    gravity: number = 0;
    /**
     * Acceleration expressed in pixels per second squared. Only for Dynamic bodies
     * @public
     */
    acceleration: Vector2 = new Vector2();

    /** @internal */
    _accelerationWithGravity: Vector2 = new Vector2();

    constructor(options?: Partial<RigidBodyOptions>) {
        Object.assign(this, options);
    }
}
