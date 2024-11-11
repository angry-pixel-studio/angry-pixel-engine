import { Vector2 } from "@math";

/**
 * The type of the rigid body to create:
 * - **Dynamic:** This type of body is affected by gravity and velocity and can be moved by other rigid bodies.
 * - **Kinematic:** This type of body is not affected by gravity and cannot be moved by other rigid bodies, but can be velocity applied.
 * - **Static:** This type of body is immobile, is not affected by velocity or gravity and cannot be moved by other rigid bodies.
 * @category Components
 * @public
 */
export enum RigidBodyType {
    Dynamic,
    Kinematic,
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
    rigidBodyType: RigidBodyType.Kinematic,
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
     * - **Dynamic:** This type of body is affected by gravity and velocity and can be moved by other rigid bodies.
     * - **Kinematic:** This type of body is not affected by gravity and cannot be moved by other rigid bodies, but can be velocity applied.
     * - **Static:** This type of body is immobile, is not affected by velocity or gravity and cannot be moved by other rigid bodies.
     * @public
     */
    type: RigidBodyType;
    /**
     * Velocity applied to the x-axis and y-axis expressed in pixels per second. For Dynamic and Kinematic bodies.
     * @public
     */
    velocity: Vector2;
    /**
     * Gravity expressed in pixels per second squared. Only for Dynamic bodies.
     * @public
     */
    gravity: number;
    /**
     * Acceleration expressed in pixels per second squared. For Dynamic and Kinematic bodies.
     * @public
     */
    acceleration: Vector2;
}

/**
 * The RigidBody component puts the entity under simulation of the physics engine, where it will interact with other objects that have a RigidBody.\
 * There are three types of bodies:
 * - **Dynamic:** This type of body is affected by gravity and velocity and can be moved by other rigid bodies.
 * - **Kinematic:** This type of body is not affected by gravity and cannot be moved by other rigid bodies, but can be velocity applied.\
 *   This type of body consumes less processing resources than the Dynamic.
 * - **Static:** This type of body is immobile, is not affected by velocity or gravity and cannot be moved by other rigid bodies.\
 *   This is the body type that consumes the least processing resources.
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
    rigidBodyType: RigidBodyType.Kinematic,
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

    constructor(options?: Partial<RigidBodyOptions>) {
        Object.assign(this, options);
    }
}
