import { Matrix2 } from "../../../Math/Matrix2";
import { Vector2 } from "../../../Math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Rectangle extends Shape {
    private _refDirection: Vector2;
    private _rotationMatrix: Matrix2 = new Matrix2();

    constructor(x1: number, y1: number, x2: number, y2: number) {
        super();

        this._type = ShapeType.Rectangle;

        this._vertex[0] = new Vector2(x1, y1);
        this._vertex[1] = new Vector2(x1, y2);
        this._vertex[2] = new Vector2(x2, y2);
        this._vertex[3] = new Vector2(x2, y1);

        this._direction = Vector2.substract(this.direction, this._vertex[1], this._vertex[0]).unit();
        this._refDirection = this._direction.clone();
        this._height = Vector2.substract(new Vector2(), this._vertex[1], this._vertex[0]).magnitude;
        this._width = Vector2.substract(new Vector2(), this._vertex[2], this._vertex[1]).magnitude;

        Vector2.add(this._position, this._vertex[0], this._direction.mult(this._height / 2));
        Vector2.add(this._position, this._position, this._direction.normal().mult(this._width / 2));

        this._angle = 0;
    }

    public update(): void {
        this._rotationMatrix.rotate(this.angle);
        this._direction = this._rotationMatrix.multiplyVector2(this._refDirection);

        Vector2.add(this.vertex[0], this._position, this._direction.normal().mult(-this._width / 2));
        Vector2.add(this.vertex[0], this.vertex[0], this._direction.mult(-this._height / 2));

        Vector2.add(this.vertex[1], this._position, this._direction.normal().mult(-this._width / 2));
        Vector2.add(this.vertex[1], this.vertex[1], this._direction.mult(this._height / 2));

        Vector2.add(this.vertex[2], this._position, this._direction.normal().mult(this._width / 2));
        Vector2.add(this.vertex[2], this.vertex[2], this._direction.mult(this._height / 2));

        Vector2.add(this.vertex[3], this._position, this._direction.normal().mult(this._width / 2));
        Vector2.add(this.vertex[3], this.vertex[3], this._direction.mult(-this._height / 2));
    }

    public clone(): Rectangle {
        return new Rectangle(this.vertex[0].x, this.vertex[0].y, this.vertex[2].x, this.vertex[2].y);
    }
}
