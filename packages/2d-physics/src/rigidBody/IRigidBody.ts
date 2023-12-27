import { Vector2 } from "@angry-pixel/math";

/**
 * The type of the rigid body to create.
 * - Dynamic: This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
 * - Kinematic: This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
 * - Static: This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.
 * @category Components
 * @public
 */
export enum RigidBodyType {
    Static,
    Dynamic,
    Kinematic,
}

export interface IRigidBody {
    id: number;
    active: boolean;
    type: RigidBodyType;
    colliderIds: number[];
    position: Vector2;
    gravity: number;
    velocity: Vector2;
    onResolve?: (rigidBody: IRigidBody) => void;
}
