import { IPhysicsManager, PhysicsManager, PhysicsManagerOptions } from "./PhysicsManager";
import { BroadPhaseMethods } from "./collision/broadPhase/IBroadPhaseResolver";
import { CollisionMethods } from "./collision/method/ICollisionMethod";

export { IPhysicsManager, PhysicsManagerOptions };

export { ICollision } from "./collision/Collision";
export { BroadPhaseMethods } from "./collision/broadPhase/IBroadPhaseResolver";
export { CollisionMethods } from "./collision/method/ICollisionMethod";
export { ICollisionResolution } from "./collision/resolver/ICollisionResolver";

export { ICollider } from "./component/Collider";
export { IRigidBody, RigidBodyType } from "./component/RigidBody";
export { IShape, Circumference, Polygon } from "./component/Shape";
export { ITransform } from "./component/Transform";

export { CollisionMatrix } from "./system/ResolveCollisionSystem";

export const physicsManagerFactory = (
    options: PhysicsManagerOptions = {
        collisionBroadPhaseMethod: BroadPhaseMethods.QuadTree,
        collisionMatrix: [],
        collisionMethod: CollisionMethods.SAT,
    },
): IPhysicsManager => new PhysicsManager(options);
