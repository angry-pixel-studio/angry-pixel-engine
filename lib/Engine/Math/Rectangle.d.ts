import { Vector2 } from "./Vector2";
export declare class Rectangle {
    private _position;
    private _center;
    private _width;
    private _height;
    constructor(x: number, y: number, width: number, height: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get x1(): number;
    get y1(): number;
    get position(): Vector2;
    set position(position: Vector2);
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    get center(): Vector2;
    set(x: number, y: number, width: number, height: number): void;
    updateFromRect(rect: Rectangle): void;
    overlappingRectangle(rect: Rectangle): boolean;
}
