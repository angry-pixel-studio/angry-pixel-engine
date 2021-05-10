import { Vector2 } from "../../Math/Vector2";

export class CollisionData {
    private _penetration: number;
    private _direction: Vector2 = new Vector2();

    constructor(penetration: number, direction: Vector2) {
        this._penetration = penetration;
        this._direction.set(direction.x, direction.y);
    }

    public get penetration(): number {
        return this._penetration;
    }

    public get direction(): Vector2 {
        return this._direction;
    }
}
