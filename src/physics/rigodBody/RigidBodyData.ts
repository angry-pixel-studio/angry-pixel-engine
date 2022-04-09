import { Vector2 } from "../../math/Vector2";
import { ColliderData } from "../collision/ColliderData";

export interface RigidBodyData {
    position: Vector2;
    gravity: number;
    velocity: Vector2;
    layersToCollider: string[];
    colliders: ColliderData[];
    cacheVelocity?: Vector2;
}
