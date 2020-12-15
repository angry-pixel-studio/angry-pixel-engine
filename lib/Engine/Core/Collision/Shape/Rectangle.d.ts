import { Shape } from "./Shape";
export declare class Rectangle extends Shape {
    private _refDirection;
    private _rotationMatrix;
    constructor(x1: number, y1: number, x2: number, y2: number);
    update(): void;
    clone(): Rectangle;
}
