/**
 * Represents a 2D vector and provides static methods for vector calculations.
 * @category Math
 * @public
 * @example
 * ```js
 * const v1 = new Vector2(2, 1);
 * const v2 = new Vector2(3, 2);
 * const v3 = new Vector2(); // zero vector
 *
 * Vector2.add(v3, v1, v2);
 * v3.x // 5
 * v3.y // 3
 * ```
 */
export class Vector2 {
    private _x: number;
    private _y: number;
    private _direction: Vector2;

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
     * Get the direction as an unit vector
     *
     * @returns The direction vector
     */
    public get direction(): Vector2 {
        if (!this._direction) this._direction = new Vector2();

        return Vector2.unit(this._direction, this);
    }

    /**
     * Set the vector
     *
     * @param x The x value
     * @param y The y value
     */
    public set(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    /**
     * Copy the target vector properties
     *
     * @param vector The vector to copy from
     */
    public copy(vector: Vector2): void {
        this.set(vector.x, vector.y);
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
     * Get the distance with another vector
     *
     * @param vector The vector to compare
     * @returns The magnitude of the distance
     */
    public distance(vector: Vector2): number {
        return Math.sqrt((this._x - vector.x) ** 2 + (this._y - vector.y) ** 2);
    }

    /**
     * Calculates a + b
     * @param out The output vector
     * @param a The first operand
     * @param b The second operand
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(2, 1);
     * const v2 = new Vector2(3, 2);
     * const v3 = Vector2.add(new Vector2(), v1, v2);
     * v3.x // 5
     * v3.y // 3
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * const v3 = Vector2.subtract(new Vector2(), v1, v2);
     * v3.x // 1
     * v3.y // 1
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(3, 0);
     * const v2 = Vector2.unit(new Vector2(), v1);
     * v2.x // 1
     * v2.y // 0
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(0, 2);
     * const v2 = Vector2.normal(new Vector2(), v1);
     * v2.x // -2
     * v2.y // 0
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = Vector2.scale(new Vector2(), v1, 2);
     * v2.x // 6
     * v2.y // 4
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * Vector2.dot(v1, v2); // 8
     * ```
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
     * @example
     * ```js
     * const v1 = new Vector2(3, 2);
     * const v2 = new Vector2(2, 1);
     * Vector2.cross(v1, v2); // -1
     * ```
     */
    public static cross(a: Vector2, b: Vector2): number {
        return a.x * b.y - a.y * b.x;
    }

    /**
     * Rounds a vector
     *
     * @param a The vector to round
     * @returns The output vector
     * @example
     * ```js
     * const v1 = new Vector2(3.9, 2.2);
     * const v2 = Vector2.round(new Vector2(), v1);
     * v2.x // 4
     * v2.y // 2
     * ```
     */
    public static round(out: Vector2, a: Vector2): Vector2 {
        out.set(Math.round(a.x), Math.round(a.y));

        return out;
    }
}
