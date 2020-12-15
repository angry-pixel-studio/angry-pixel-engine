import { Vector2 } from "./Vector2";

export class Matrix2 {
    private _data: number[][] = [
        [0, 0],
        [0, 0],
    ];

    constructor(data: number[][] = null) {
        this._data = data ?? this._data;
    }

    public get data(): number[][] {
        return this._data;
    }

    public set data(data: number[][]) {
        this._data = data;
    }

    public multiplyVector2(vector: Vector2): Vector2 {
        return new Vector2(
            this._data[0][0] * vector.x + this._data[0][1] * vector.y,
            this._data[1][0] * vector.x + this._data[1][1] * vector.y
        );
    }

    public rotate(angle: number): void {
        this._data[0][0] = Math.cos(angle);
        this._data[0][1] = -Math.sin(angle);
        this._data[1][0] = Math.sin(angle);
        this._data[1][1] = Math.cos(angle);
    }
}
