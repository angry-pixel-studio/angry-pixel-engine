import { Vector2 } from "../../../Math/Vector2";

export class ShapeAxisProjection {
    private _min: number;
    private _max: number;
    private _collisionVertex: Vector2 = new Vector2();

    constructor(min: number, max: number, collisionVertex: Vector2) {
        this._min = min;
        this._max = max;
        this._collisionVertex.set(collisionVertex.x, collisionVertex.y);
    }

    public get min(): number {
        return this._min;
    }

    public get max(): number {
        return this._max;
    }

    public get collisionVertex(): Vector2 {
        return this._collisionVertex;
    }
}
