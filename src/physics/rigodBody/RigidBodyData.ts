import { Vector2 } from "../../math/Vector2";
import { ColliderData } from "../collision/ColliderData";
import { RigidBodyType } from "./RigidBodyManager";

export interface RigidBodyData {
    type: RigidBodyType;
    position: Vector2;
    gravity: number;
    velocity: Vector2;
    colliders: ColliderData[];
    cacheVelocity?: Vector2;
}
