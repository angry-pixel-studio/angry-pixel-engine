import { Rectangle } from "../../../math/Rectangle";
import { Vector2 } from "../../../math/Vector2";
import { Shape, ShapeType } from "./Shape";

export class Polygon implements Shape {
    protected _type: ShapeType = ShapeType.Polygon;
    protected _vertices: Vector2[] = [];
    protected _boundingBox: Rectangle = new Rectangle(0, 0, 0, 0);
    protected _projectionAxes: Vector2[] = [];
    protected _position: Vector2 = new Vector2();
    protected _angle: number = 0;
    protected _vertexModel: Vector2[];

    private boxMinX: number = Number.MAX_SAFE_INTEGER;
    private boxMinY: number = Number.MAX_SAFE_INTEGER;
    private boxMaxX: number = -Number.MAX_SAFE_INTEGER;
    private boxMaxY: number = -Number.MAX_SAFE_INTEGER;

    constructor(vertexModel: Vector2[]) {
        this._vertexModel = vertexModel;

        for (let i = 0; i < this._vertexModel.length; i++) {
            this._vertices.push(new Vector2());
            this._projectionAxes.push(new Vector2());
        }
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
        this.updateVertices();
        this.updateBoundingBox();
        this.updateProjectionAxes();
    }

    protected updateVertices(): void {
        for (let i = 0; i < this._vertexModel.length; i++) {
            this._vertices[i].set(
                this._vertexModel[i].x * Math.cos(this._angle) -
                    this._vertexModel[i].y * Math.sin(this._angle) +
                    this._position.x,
                this._vertexModel[i].x * Math.sin(this._angle) +
                    this._vertexModel[i].y * Math.cos(this._angle) +
                    this._position.y
            );
        }
    }

    protected updateBoundingBox(): void {
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
        for (let i = 0; i < this._vertices.length; i++) {
            Vector2.normal(
                this.projectionAxes[i],
                Vector2.subtract(this.projectionAxes[i], this._vertices[i + 1] ?? this._vertices[0], this._vertices[i])
            );
        }
    }
}
