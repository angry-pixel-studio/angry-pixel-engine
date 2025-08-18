import { Vector2 } from "@angry-pixel/math";

/**
 * The type of the rigid body to create:
 * - **Dynamic:** This type of body is affected by gravity and velocity and can be moved by other rigid bodies.
 * - **Kinematic:** This type of body is not affected by gravity and cannot be moved by other rigid bodies, but can be velocity applied.
 * - **Static:** This type of body is immobile, is not affected by velocity or gravity and cannot be moved by other rigid bodies.
 * @category Components Configuration
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
 * @category Components Configuration
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
 * The RigidBody component enables physics simulation for an entity, allowing it to interact with other physics-enabled objects in the game world.\
 * It defines how the entity behaves under forces like gravity, collisions, and applied velocities. The component supports three types of bodies:
 * 
 * - **Dynamic:** Fully physics-simulated bodies that respond to forces, collisions, gravity, and can be moved by other rigid bodies.
 *   Best for objects that need realistic physical behavior like players, projectiles, or items.
 * 
 * - **Kinematic:** Bodies that can move with applied velocities but are not affected by gravity or collisions from other bodies.
 *   Ideal for moving platforms, enemies with predefined paths, or objects that need controlled movement without full physics simulation.
 *   More performance efficient than Dynamic bodies.
 * 
 * - **Static:** Immobile bodies that act as solid, unmovable obstacles. They don't respond to any forces or collisions.
 *   Perfect for level geometry, walls, or any unchanging collision objects.
 *   The most performance efficient option as they require minimal physics calculations.
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
     * - Kinematic: This type of body is not affected by gravity and cannot be moved by other rigid bodies, but can be velocity applied.
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
    static componentName: string = "RigidBody";

    constructor(options?: Partial<RigidBodyOptions>) {
        Object.assign(this, options);
    }
}
