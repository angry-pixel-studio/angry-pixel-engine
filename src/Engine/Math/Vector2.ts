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

    public equals(vector: Vector2): boolean {
        return this._x === vector.x && this._y === vector.y;
    }

    public clone(): Vector2 {
        return new Vector2(this._x, this._y);
    }

    /**
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     */
    public static add(out: Vector2, a: Vector2, b: Vector2): Vector2 {
        out.set(a.x + b.x, a.y + b.y);

        return out;
    }

    /**
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     */
    public static substract(out: Vector2, a: Vector2, b: Vector2): Vector2 {
        out.set(a.x - b.x, a.y - b.y);

        return out;
    }

    /**
     * @param out The output vector
     * @param a The vector to get the unit
     * @returns The output vector
     */
    public static unit(out: Vector2, a: Vector2): Vector2 {
        a.magnitude === 0 ? out.set(0, 0) : out.set(a.x / a.magnitude, a.y / a.magnitude);

        return out;
    }

    /**
     * @param out The output vector
     * @param a The vector to normalize
     * @returns The output vector
     */
    public static normal(out: Vector2, a: Vector2): Vector2 {
        out.set(-a.y, a.x);

        return this.unit(out, out);
    }

    public mult(number: number) {
        return new Vector2(this.x * number, this.y * number);
    }

    /**
     * @param a The first operand
     * @param b The second operand
     * @returns The dot product result
     */
    public static dot(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * @param a The first operand
     * @param b The second operand
     * @returns The cross produc result
     */
    public static cross(a: Vector2, b: Vector2): number {
        return a.x * b.y - a.y * b.x;
    }
}
