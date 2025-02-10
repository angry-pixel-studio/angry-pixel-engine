import { Vector2 } from "./Vector2";

/**
 * Represents an axis aligned rectangle
 * @category Math
 * @public
 */
export class Rectangle {
    public width: number = 0;
    public height: number = 0;

    private _position: Vector2 = new Vector2();
    private _center: Vector2 = new Vector2();

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
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
        return this._position.x + this.width;
    }

    public get y1(): number {
        return this._position.y + this.height;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
    }

    public get center(): Vector2 {
        this._center.set(this.x + this.width / 2, this.y + this.height / 2);
        return this._center;
    }

    /**
     * Set the rectangle
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    public set(x: number, y: number, width: number, height: number): void {
        this._position.set(x, y);
        this.width = width;
        this.height = height;
    }

    /**
     * Compare if two rectangles are equals
     *
     * @param rectangle The rectangle to compare
     * @returns TRUE if the rectangles are equals, FALSE if not
     */
    public equals(rectangle: Rectangle): boolean {
        return (
            this.position.equals(rectangle.position) &&
            this.width === rectangle.width &&
            this.height === rectangle.height
        );
    }

    /**
     * Copy the target rectangle properties
     *
     * @param rect The rectangle to copy from
     */
    public copy(rect: Rectangle): void {
        this.set(rect.x, rect.y, rect.width, rect.height);
    }

    /**
     * Check if the target rectangle is overlapping
     *
     * @param rect The target rectangle
     * @returns TRUE or FALSE
     */
    public intersects(rect: Rectangle): boolean {
        return !(this.x1 < rect.x || this.x > rect.x1 || this.y1 < rect.y || this.y > rect.y1);
    }

    /**
     * Check if the target rectangle is contained
     *
     * @param rect The target rectangle
     * @returns TRUE or FALSE
     */
    public contains(rect: Rectangle): boolean;
    /**
     * Check if the target vector is contained
     *
     * @param vector The target vector
     * @returns TRUE or FALSE
     */
    public contains(vector: Vector2): boolean;
    public contains(object: Rectangle | Vector2): boolean {
        if (object instanceof Rectangle) {
            return object.x1 <= this.x1 && object.x >= this.x && object.y1 <= this.y1 && object.y >= this.y;
        } else if (object instanceof Vector2) {
            return !(object.x < this.x || object.y < this.y || object.x >= this.x1 || object.y >= this.y1);
        }

        return false;
    }

    public toString(): string {
        return `(${this.position.x}, ${this.position.y}, ${this.width}, ${this.height})`;
    }
}
