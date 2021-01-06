import { Vector2 } from "../../Math/Vector2";
export declare class TileData {
    private _position;
    private _width;
    private _height;
    constructor(position: Vector2, width: number, height: number);
    get position(): Vector2;
    get width(): number;
    get height(): number;
}
