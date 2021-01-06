import { Vector2 } from "../../Math/Vector2";

export class TileData {
    private _position: Vector2 = new Vector2();
    private _width: number;
    private _height: number;

    constructor(position: Vector2, width: number, height: number) {
        this._position.set(position.x, position.y);
        this._width = width;
        this._height = height;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}
