import { Rectangle, Vector2 } from "@angry-pixel/math";
import { IShape, ShapeType } from "./IShape";

export class Polygon implements IShape {
    public readonly type: ShapeType = ShapeType.Polygon;
    public readonly vertices: Vector2[] = [];
    public readonly boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);

    public rotation: number = 0;
    protected _projectionAxes: Vector2[] = [];
    protected _position: Vector2 = new Vector2();

    private boxMinX: number = Number.MAX_SAFE_INTEGER;
    private boxMinY: number = Number.MAX_SAFE_INTEGER;
    private boxMaxX: number = -Number.MAX_SAFE_INTEGER;
    private boxMaxY: number = -Number.MAX_SAFE_INTEGER;

    constructor(public vertexModel: Vector2[]) {
        for (let i = 0; i < this.vertexModel.length; i++) {
            this.vertices.push(new Vector2());
            this._projectionAxes.push(new Vector2());
        }
    }

    public set position(value: Vector2) {
        this._position.copy(value);
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get projectionAxes(): Vector2[] {
        return this._projectionAxes;
    }

    public update(): void {
        this.updateVertices();
        this.updateBoundingBox();
        this.updateProjectionAxes();
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
        this.boxMinX = this.vertices[0].x;
        this.boxMinY = this.vertices[0].y;
        this.boxMaxX = this.vertices[0].x;
        this.boxMaxY = this.vertices[0].y;

        this.vertices.forEach((vertex: Vector2) => {
            this.boxMinX = Math.min(vertex.x, this.boxMinX);
            this.boxMinY = Math.min(vertex.y, this.boxMinY);

            this.boxMaxX = Math.max(vertex.x, this.boxMaxX);
            this.boxMaxY = Math.max(vertex.y, this.boxMaxY);
        });

        this.boundingBox.set(this.boxMinX, this.boxMinY, this.boxMaxX - this.boxMinX, this.boxMaxY - this.boxMinY);
    }

    protected updateProjectionAxes(): void {
        for (let i = 0; i < this.vertices.length; i++) {
            Vector2.normal(
                this._projectionAxes[i],
                Vector2.subtract(this._projectionAxes[i], this.vertices[i + 1] ?? this.vertices[0], this.vertices[i]),
            );
        }
    }
}
