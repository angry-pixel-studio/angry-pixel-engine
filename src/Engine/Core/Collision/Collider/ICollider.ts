import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Math/Vector2";
import { Shape } from "../Shape/Shape";

export interface ICollider {
    position: Vector2;
    readonly shape: Shape;
    readonly gameObject: GameObject;
    readonly physics: boolean;
    readonly bottomLeftQuadVertex: Vector2;
    readonly bottomRightQuadVertex: Vector2;
    readonly topLeftQuadVertex: Vector2;
    readonly topRightQuadVertex: Vector2;
}
