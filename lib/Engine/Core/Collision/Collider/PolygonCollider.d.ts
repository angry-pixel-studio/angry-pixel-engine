import { GameObject } from "../../../GameObject";
import { Vector2 } from "../../../Helper/Vector2";
import { ICollider, ColliderType } from "./ICollider";
export declare class PolygonCollider implements ICollider {
    readonly type: ColliderType;
    readonly gameObject: GameObject;
    private _coordinates;
    private _points;
    private realPoints;
    constructor(position: Vector2, points: Vector2[], gameObject: GameObject);
    set points(points: Vector2[]);
    get points(): Vector2[];
    set coordinates(coordinates: Vector2);
    get coordinates(): Vector2;
    get bottomLeftPoint(): Vector2;
    get bottomRightPoint(): Vector2;
    get topLeftPoint(): Vector2;
    get topRightPoint(): Vector2;
    private createRealPoints;
    private updateRealPoints;
    hasCollision(collider: ICollider): boolean;
    private lineIntersection;
}
