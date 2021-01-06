import { Vector2 } from "./Vector2";

export class Rectangle {
    private _position: Vector2 = new Vector2();
    private _center: Vector2 = new Vector2();
    private _width: number = 0;
    private _height: number = 0;

    constructor(x: number, y: number, width: number, height: number) {
        this.set(x, y, width, height);
    }

    public get x(): number {
        return this._position.x;
    }

    public set x(value: number) {
        this._position.set(value, this._position.y);
    }

    public get y(): number {
        return this._position.y;
    }

    public set y(value: number) {
        this._position.set(this._position.x, value);
    }

    public get x1(): number {
        return this._position.x + this._width;
    }

    public get y1(): number {
        return this._position.y + this._height;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
    }

    public get width(): number {
        return this._width;
    }

    public set width(width: number) {
        this._width = width;
    }

    public get height(): number {
        return this._height;
    }

    public set height(height: number) {
        this._height = height;
    }

    public get center(): Vector2 {
        this._center.set(this.x + this.width / 2, this.y + this.height / 2);
        return this._center;
    }

    public set(x: number, y: number, width: number, height: number): void {
        this._position.set(x, y);
        this._width = width;
        this._height = height;
    }

    public updateFromRect(rect: Rectangle): void {
        this.set(rect.x, rect.y, rect.width, rect.height);
    }

    public overlappingRectangle(rect: Rectangle): boolean {
        return this.x1 >= rect.x && this.x <= rect.x1 && this.y1 >= rect.y && this.y <= rect.y1;
    }
}
