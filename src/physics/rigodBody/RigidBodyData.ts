import { Vector2 } from "../../math/Vector2";
import { ICollider } from "../collision/collider/ICollider";

export interface RigidBodyData {
    position: Vector2;
    gravity: number;
    velocity: Vector2;
    layersToCollider: string[];
    colliders: ICollider[];
}
