import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Math/Vector2";
import { Rectangle } from "../Shape/Rectangle";
import { ICollider } from "./ICollider";
export declare class RectangleCollider implements ICollider {
    readonly gameObject: GameObject;
    readonly shape: Rectangle;
    private _quadVertex;
    private _position;
    private _width;
    private _height;
    constructor(position: Vector2, width: number, height: number, gameObject: GameObject);
    set position(coordinates: Vector2);
    get position(): Vector2;
    set width(width: number);
    get width(): number;
    set height(height: number);
    get height(): number;
    get bottomLeftQuadVertex(): Vector2;
    get bottomRightQuadvertex(): Vector2;
    get topLeftQuadVertex(): Vector2;
    get topRightQuadVertex(): Vector2;
    private updateShape;
    private updateQuadVertex;
}
