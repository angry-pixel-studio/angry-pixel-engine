import { Rectangle } from "../../../math/Rectangle";
import { Vector2 } from "../../../math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Circumference implements Shape {
    public readonly type: ShapeType = ShapeType.Circumference;
    public readonly vertices: Vector2[] = [new Vector2(), new Vector2()];
    public readonly projectionAxes: Vector2[] = [new Vector2()];
    public readonly boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);
    public readonly angle: number = 0;
    public readonly vertexModel: Vector2[] = [];

    public radius: number = 0;

    protected _position: Vector2 = new Vector2();

    constructor(radius: number) {
        this.vertices = [new Vector2(), new Vector2()];
        this.radius = radius;
    }

    public set position(value: Vector2) {
        this._position.copy(value);
    }

    public get position(): Vector2 {
        return this._position;
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
