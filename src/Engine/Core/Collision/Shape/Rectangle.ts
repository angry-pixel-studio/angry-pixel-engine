import { Matrix2 } from "../../../Math/Matrix2";
import { Vector2 } from "../../../Math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Rectangle extends Shape {
    private _refDirection: Vector2;
    private _rotationMatrix: Matrix2 = new Matrix2();

    private vertexHelper: Vector2[] = [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, 1), new Vector2(1, -1)];
    private cacheVector: Vector2 = new Vector2();

    constructor(x1: number, y1: number, x2: number, y2: number) {
        super();

        this._type = ShapeType.Rectangle;

        this._vertex[0] = new Vector2(x1, y1);
        this._vertex[1] = new Vector2(x1, y2);
        this._vertex[2] = new Vector2(x2, y2);
        this._vertex[3] = new Vector2(x2, y1);

        Vector2.unit(this._direction, Vector2.subtract(new Vector2(), this._vertex[1], this._vertex[0]));
        this._refDirection = this._direction.clone();
        this._height = Vector2.subtract(new Vector2(), this._vertex[1], this._vertex[0]).magnitude;
        this._width = Vector2.subtract(new Vector2(), this._vertex[2], this._vertex[1]).magnitude;

        Vector2.add(this._position, this._vertex[0], Vector2.scale(new Vector2(), this._direction, this._height / 2));
        Vector2.add(
            this._position,
            this._position,
            Vector2.scale(new Vector2(), Vector2.normal(new Vector2(), this._direction), this._width / 2)
        );

        this._angle = 0;
    }

    public update(): void {
        this._rotationMatrix.rotate(this.angle);
        this._direction = this._rotationMatrix.multiplyVector2(this._refDirection);

        this.vertexHelper.forEach((v: Vector2, i: number) => {
            Vector2.add(
                this._vertex[i],
                this._position,
                Vector2.scale(
                    this.cacheVector,
                    Vector2.normal(this.cacheVector, this._direction),
                    (v.x * this._width) / 2
                )
            );
            Vector2.add(
                this._vertex[i],
                this._vertex[i],
                Vector2.scale(this.cacheVector, this._direction, (v.y * this._height) / 2)
            );
        });
    }

    public clone(): Rectangle {
        return new Rectangle(this._vertex[0].x, this._vertex[0].y, this._vertex[2].x, this._vertex[2].y);
    }
}
