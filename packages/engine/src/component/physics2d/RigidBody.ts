import { Vector2 } from "@math";

/**
 * The type of the rigid body to create:
 * - Dynamic: This type of body is affected by gravity and velopcity.
 * - Static: This type of body is immovable, is unaffected by velocity and gravity.
 * @category Components
 * @public
 */
export enum RigidBodyType {
    Dynamic,
    Static,
}

/**
 * @public
 * @category Components
 */
export interface RigidBodyOptions {
    type: RigidBodyType;
    velocity: Vector2;
    gravity: number;
    acceleration: Vector2;
}

/**
 * @public
 * @category Components
 */
export class RigidBody {
    type: RigidBodyType = RigidBodyType.Dynamic;
    velocity: Vector2 = new Vector2();
    gravity: number = 0;
    acceleration: Vector2 = new Vector2();

    constructor(options?: Partial<RigidBodyOptions>) {
        Object.assign(this, options);
    }
}
