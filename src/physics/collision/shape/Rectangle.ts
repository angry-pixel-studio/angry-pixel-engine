import { Vector2 } from "../../../math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Rectangle extends Shape {
    private cacheVector: Vector2 = new Vector2();
    private axes: Vector2[] = [];

    constructor(position: Vector2, width: number, height: number, angle: number = 0) {
        super();

        this._type = ShapeType.Rectangle;

        this._position.set(position.x, position.y);
        this._width = width;
        this._height = height;
        this._angle = angle;

        this._model = [
            new Vector2(-width / 2, -height / 2),
            new Vector2(-width / 2, height / 2),
            new Vector2(width / 2, height / 2),
            new Vector2(width / 2, -height / 2),
        ];

        this._vertices = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];

        this.axes = [new Vector2(), new Vector2()];

        this.update();
    }

    public update(): void {
        this.updateModel();

        for (let i = 0; i < this._model.length; i++) {
            this._vertices[i].set(
                this._model[i].x * Math.cos(this._angle) - this._model[i].y * Math.sin(this._angle) + this._position.x,
                this._model[i].x * Math.sin(this._angle) + this._model[i].y * Math.cos(this._angle) + this._position.y
            );
        }

        this.updateDirection();
        this.updateAxes();
    }

    private updateModel(): void {
        this._model[0].set(-this._width / 2, -this._height / 2);
        this._model[1].set(-this._width / 2, this._height / 2);
        this._model[2].set(this._width / 2, this._height / 2);
        this._model[3].set(this._width / 2, -this._height / 2);
    }

    private updateDirection(): void {
        Vector2.unit(this._direction, Vector2.subtract(this.cacheVector, this._vertices[1], this._vertices[0]));
    }

    private updateAxes(): void {
        Vector2.normal(this.axes[0], this._direction);
        this.axes[1].set(this._direction.x, this._direction.y);
    }

    public clone(): Rectangle {
        return new Rectangle(this._position, this._width, this._height, this._angle);
    }

    public getAxes(): Vector2[] {
        return this.axes;
    }
}
