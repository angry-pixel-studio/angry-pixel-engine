import { ICollider } from "./ICollider";
import { ICollisionResolution } from "./ICollisionResolution";

/**
 * Represent a collision. It contains the colliders involved and the resolution data.
 * @category Components
 * @public
 */
export interface ICollision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    resolution: ICollisionResolution;
}
