export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        this._y = y;
    }

    public get magnitude(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }

    public set(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public substract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public mult(number: number) {
        return new Vector2(this.x * number, this.y * number);
    }

    public normal() {
        return new Vector2(-this.y, this.x).unit();
    }

    public unit() {
        if (this.magnitude === 0) {
            return new Vector2(0, 0);
        } else {
            return new Vector2(Math.round(this.x / this.magnitude), Math.round(this.y / this.magnitude));
        }
    }

    public clone(): Vector2 {
        return new Vector2(this._x, this._y);
    }

    public static dot(vector1: Vector2, vector2: Vector2): number {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    public static cross(vector1: Vector2, vector2: Vector2): number {
        return vector1.x * vector2.y - vector1.y * vector2.x;
    }
}
