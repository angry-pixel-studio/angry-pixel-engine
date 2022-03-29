import { Rectangle } from "../../../math/Rectangle";
import { Vector2 } from "../../../math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Circumference implements Shape {
    protected _type: ShapeType = ShapeType.Circumference;
    protected _vertices: Vector2[] = [];
    protected _boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);
    protected _projectionAxes: Vector2[] = [];
    protected _position: Vector2 = new Vector2();
    protected _angle: number = 0;
    protected _vertexModel: Vector2[] = [];

    public radius: number = 0;

    constructor(radius: number) {
        this._vertices = [new Vector2(), new Vector2()];
        this.radius = radius;
    }

    public get type(): ShapeType {
        return this._type;
    }

    public get vertices(): Vector2[] {
        return this._vertices;
    }

    public get boundingBox(): Rectangle {
        return this._boundingBox;
    }

    public get projectionAxes(): Vector2[] {
        return this._projectionAxes;
    }

    public set position(value: Vector2) {
        this._position.copy(value);
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set angle(value: number) {
        this._angle = value;
    }

    public get angle(): number {
        return this._angle;
    }

    public get vertexModel(): Vector2[] {
        return this._vertexModel;
    }

    public set vertexModel(value: Vector2[]) {
        this._vertexModel = value;
    }

    public update(): void {
        this.updateBoundingBox();
    }

    protected updateBoundingBox(): void {
        this.boundingBox.set(
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }
}
