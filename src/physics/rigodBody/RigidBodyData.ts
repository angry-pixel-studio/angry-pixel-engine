import { Vector2 } from "angry-pixel-math";
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
