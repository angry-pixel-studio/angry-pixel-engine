import { Vector2 } from "../../../Math/Vector2";
export declare class SatData {
    private _penetration;
    private _direction;
    private _contactVertex;
    constructor(penetration: number, direction: Vector2, contactVertex: Vector2);
    get penetration(): number;
    get direction(): Vector2;
    get contactVertex(): Vector2;
}
