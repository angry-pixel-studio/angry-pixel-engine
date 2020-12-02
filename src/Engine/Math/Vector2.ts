export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get magnitude(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }

    public set(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public substract(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    public mult(n: number) {
        return new Vector2(this.x * n, this.y * n);
    }

    public normal() {
        return new Vector2(-this.y, this.x).unit();
    }

    public unit() {
        if (this.magnitude === 0) {
            return new Vector2(0, 0);
        } else {
            return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
        }
    }

    public static dot(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    public static cross(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.y - v1.y * v2.x;
    }
}
