import { Rectangle } from "@angry-pixel/math";
import { BroadPhaseMethods } from "./collision/broadPhase/IBroadPhaseResolver";
import { ColliderFactory } from "./collision/ColliderFactory";
import { CollisionManager, CollisionMatrix } from "./collision/CollisionManager";
import { AABBMethod } from "./collision/method/AABBMethod";
import { CollisionMethods } from "./collision/method/ICollisionMethod";
import { SatMethod } from "./collision/method/SatMethod";
import { AABBResolver } from "./collision/resolver/AABBResolver";
import { CircumferenceAABBResolver } from "./collision/resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "./collision/resolver/CircumferenceResolver";
import { SatResolver } from "./collision/resolver/SatResolver";
import { IPhysicsManager, PhysicsManager } from "./PhysicsManager";
import { RigidBodyFactory } from "./rigidBody/RigidBodyFactory";
import { RigidBodyManager } from "./rigidBody/RigidBodyManager";

export { IPhysicsManager } from "./PhysicsManager";
export { IColliderDto } from "./collision/ColliderFactory";
export { CollisionMatrix } from "./collision/CollisionManager";
export { ICollider } from "./collision/ICollider";
export { ICollision } from "./collision/ICollision";
export { ICollisionResolution } from "./collision/ICollisionResolution";
export { CollisionMethods } from "./collision/method/ICollisionMethod";
export { Circumference } from "./collision/shape/Circumference";
export { Line } from "./collision/shape/Line";
export { Polygon } from "./collision/shape/Polygon";
export { Rectangle } from "./collision/shape/Rectangle";
export { IRigidBodyDto } from "./rigidBody/RigidBodyFactory";
export { IRigidBody, RigidBodyType } from "./rigidBody/IRigidBody";
export { BroadPhaseMethods } from "./collision/broadPhase/IBroadPhaseResolver";

export interface PhysicsManagerOptions {
    collisionMethod?: CollisionMethods;
    collisionMatrix?: CollisionMatrix;
    collisionArea?: Rectangle;
    collisionBroadPhaseMethod?: BroadPhaseMethods;
}

export const physicsManagerFactory = ({
    collisionArea,
    collisionMatrix,
    collisionMethod,
    collisionBroadPhaseMethod,
}: PhysicsManagerOptions = {}): IPhysicsManager => {
    const circumferenceResolver = new CircumferenceResolver();

    const selectedMethod =
        collisionMethod === CollisionMethods.AABB
            ? new AABBMethod(new AABBResolver(), new CircumferenceAABBResolver(), circumferenceResolver)
            : new SatMethod(circumferenceResolver, new SatResolver());

    const collisionManager = new CollisionManager(
        selectedMethod,
        collisionBroadPhaseMethod,
        collisionArea,
        collisionMatrix
    );
    const colliderFactory = new ColliderFactory();
    const rigidBodyManager = new RigidBodyManager(collisionManager);
    const rigidBodyFactory = new RigidBodyFactory();

    return new PhysicsManager(collisionManager, colliderFactory, rigidBodyManager, rigidBodyFactory);
};
