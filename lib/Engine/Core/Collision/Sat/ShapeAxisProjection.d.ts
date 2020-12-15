import { Vector2 } from "../../../Math/Vector2";
export declare class ShapeAxisProjection {
    private _min;
    private _max;
    private _collisionVertex;
    constructor(min: number, max: number, collisionVertex: Vector2);
    get min(): number;
    get max(): number;
    get collisionVertex(): Vector2;
}
