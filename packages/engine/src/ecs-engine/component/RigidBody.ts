import { RigidBodyType } from "../../2d-physics";
import { Vector2 } from "../../math";

export class RigidBody {
    type: RigidBodyType = RigidBodyType.Dynamic;
    velocity: Vector2 = new Vector2();
    gravity: number = 0;
    acceleration: Vector2 = new Vector2();
}
