import { Vector2, Rectangle } from "@angry-pixel/math";
import { IShape, ShapeType } from "./IShape";

export class Circumference implements IShape {
    public readonly type: ShapeType = ShapeType.Circumference;
    public readonly boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);
    public readonly vertices: Vector2[] = [new Vector2(), new Vector2()];
    public readonly projectionAxes: Vector2[] = [new Vector2()];

    public rotation: number;

    protected _position: Vector2 = new Vector2();

    public set position(value: Vector2) {
        this._position.copy(value);
    }

    public get position(): Vector2 {
        return this._position;
    }

    constructor(public radius: number) {}

    public update(): void {
        this.updateBoundingBox();
    }

    private updateBoundingBox(): void {
        this.boundingBox.set(
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }
}
