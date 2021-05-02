import { Vector2 } from "../../../Math/Vector2";

export class ShapeAxisProjection {
    public min: number;
    public max: number;
    private _collisionVertex: Vector2 = new Vector2();

    public get collisionVertex(): Vector2 {
        return this._collisionVertex;
    }

    public set collisionVertex(collisionVertex: Vector2) {
        this._collisionVertex.set(collisionVertex.x, collisionVertex.y);
    }
}
