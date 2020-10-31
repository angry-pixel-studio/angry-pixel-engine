import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Helper/Vector2";
import { ICollider, ColliderType } from "./ICollider";
export declare class RectangleCollider implements ICollider {
    readonly type: ColliderType;
    readonly gameObject: GameObject;
    readonly points: Vector2[];
    private _coordinates;
    private _width;
    private _height;
    constructor(coordinates: Vector2, width: number, height: number, gameObject: GameObject);
    set coordinates(coordinates: Vector2);
    get coordinates(): Vector2;
    set width(width: number);
    get width(): number;
    set height(height: number);
    get height(): number;
    get bottomLeftPoint(): Vector2;
    get bottomRightPoint(): Vector2;
    get topLeftPoint(): Vector2;
    get topRightPoint(): Vector2;
    hasCollision(collider: ICollider): boolean;
    private updatePoints;
}
