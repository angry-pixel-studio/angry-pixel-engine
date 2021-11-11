import { GameObject } from "../../../core/GameObject";
import { Vector2 } from "../../../math/Vector2";
import { Shape } from "../shape/Shape";

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
