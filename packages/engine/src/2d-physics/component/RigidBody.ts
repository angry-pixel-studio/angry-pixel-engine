import { Vector2 } from "../../math";

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

export interface IRigidBody {
    type: RigidBodyType;
    gravity: number;
    velocity: Vector2;
    acceleration: Vector2;
}
