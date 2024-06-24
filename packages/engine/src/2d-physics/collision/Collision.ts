import { ICollider } from "../component/Collider";
import { ICollisionResolution } from "./resolver/ICollisionResolver";

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
