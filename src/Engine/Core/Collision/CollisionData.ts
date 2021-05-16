import { Vector2 } from "../../Math/Vector2";

export class CollisionData {
    private _penetration: number;
    private _displacementDirection: Vector2 = new Vector2();

    constructor(penetration: number, displacementDirection: Vector2) {
        this._penetration = penetration;
        this._displacementDirection.set(displacementDirection.x, displacementDirection.y);
    }

    public get penetration(): number {
        return this._penetration;
    }

    public get displacementDirection(): Vector2 {
        return this._displacementDirection;
    }
}
