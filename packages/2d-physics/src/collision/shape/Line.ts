import { Rectangle, Vector2 } from "@angry-pixel/math";
import { IShape, ShapeType } from "./IShape";

export class Line implements IShape {
    public readonly type: ShapeType = ShapeType.Polygon;
    public readonly vertices: Vector2[] = [new Vector2(), new Vector2()];
    public readonly projectionAxes: Vector2[] = [new Vector2()];
    public readonly boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);

    public rotation: number = 0;
    private _position: Vector2 = new Vector2();

    constructor(public vertexModel: [Vector2, Vector2]) {}

    public update(): void {
        this.updateVertices();
        this.updateBoundingBox();
        this.updateProjectionAxes();
    }

    public set position(value: Vector2) {
        this._position.copy(value);
    }

    public get position(): Vector2 {
        return this._position;
    }

    private updateVertices(): void {
        for (let i = 0; i < this.vertexModel.length; i++) {
            this.vertices[i].set(
                this.vertexModel[i].x * Math.cos(this.rotation) -
                    this.vertexModel[i].y * Math.sin(this.rotation) +
                    this._position.x,
                this.vertexModel[i].x * Math.sin(this.rotation) +
                    this.vertexModel[i].y * Math.cos(this.rotation) +
                    this._position.y,
            );
        }
    }

    private updateBoundingBox(): void {
        this.boundingBox.x = Math.min(this.vertices[0].x, this.vertices[1].x);
        this.boundingBox.y = Math.min(this.vertices[0].y, this.vertices[1].y);
        this.boundingBox.width = Math.max(this.vertices[0].x, this.vertices[1].x) - this.boundingBox.x;
        this.boundingBox.height = Math.max(this.vertices[0].y, this.vertices[1].y) - this.boundingBox.y;
    }

    private updateProjectionAxes(): void {
        Vector2.normal(
            this.projectionAxes[0],
            Vector2.subtract(this.projectionAxes[0], this.vertices[1], this.vertices[0]),
        );
    }
}
