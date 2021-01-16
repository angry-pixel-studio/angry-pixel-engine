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

    /**
     * Get the magnitude of the vector
     *
     * @returns The magnitude of the vector
     */
    public get magnitude(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }

    /**
     * Set the vector
     *
     * @param x
     * @param y
     */
    public set(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    /**
     * Compare if two vector are equals
     *
     * @param vector The vector to compare
     * @returns True if the vectors are equals, false if not
     */
    public equals(vector: Vector2): boolean {
        return this._x === vector.x && this._y === vector.y;
    }

    /**
     * Colne a vector into a new instace
     *
     * @returns The cloned vector
     */
    public clone(): Vector2 {
        return new Vector2(this._x, this._y);
    }

    /**
     * Calculates a + b
     *
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
     * Calculates a - b
     *
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     */
    public static subtract(out: Vector2, a: Vector2, b: Vector2): Vector2 {
        out.set(a.x - b.x, a.y - b.y);

        return out;
    }

    /**
     * Returns the unit vector
     *
     * @param out The output vector
     * @param a The vector to get the unit
     * @returns The output vector
     */
    public static unit(out: Vector2, a: Vector2): Vector2 {
        a.magnitude === 0 ? out.set(0, 0) : out.set(a.x / a.magnitude, a.y / a.magnitude);

        return out;
    }

    /**
     * Normalize a vector
     *
     * @param out The output vector
     * @param a The vector to normalize
     * @returns The output vector
     */
    public static normal(out: Vector2, a: Vector2): Vector2 {
        out.set(-a.y, a.x);

        return this.unit(out, out);
    }

    /**
     * Scale a vector
     *
     * @param out The output vector
     * @param a The vector to scale
     * @param scalar The scalar value
     * @returns The output vector
     */
    public static scale(out: Vector2, a: Vector2, scalar: number): Vector2 {
        out.set(a.x * scalar, a.y * scalar);

        return out;
    }

    /**
     * Calculates the dot product of two vectors and returns a scalar value
     *
     * @param a The first operand
     * @param b The second operand
     * @returns The dot product result
     */
    public static dot(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Calculates the cross product of two vectors and returns a scalar value
     *
     * @param a The first operand
     * @param b The second operand
     * @returns The cross produc result
     */
    public static cross(a: Vector2, b: Vector2): number {
        return a.x * b.y - a.y * b.x;
    }
}
