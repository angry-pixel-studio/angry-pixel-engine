import { Vector2 } from "./Vector2";
export declare class Matrix2 {
    private _data;
    constructor(data?: number[][]);
    get data(): number[][];
    set data(data: number[][]);
    multiplyVector2(vector: Vector2): Vector2;
    rotate(angle: number): void;
}
