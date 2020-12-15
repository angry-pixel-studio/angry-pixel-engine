import { Vector2 } from "../../../Math/Vector2";

export class SatData {
    private _penetration: number;
    private _direction: Vector2;
    private _contactVertex: Vector2;

    constructor(penetration: number, direction: Vector2, contactVertex: Vector2) {
        this._penetration = penetration;
        this._direction = direction;
        this._contactVertex = contactVertex;
    }

    public get penetration(): number {
        return this._penetration;
    }

    public get direction(): Vector2 {
        return this._direction;
    }

    public get contactVertex(): Vector2 {
        return this._contactVertex;
    }
}
