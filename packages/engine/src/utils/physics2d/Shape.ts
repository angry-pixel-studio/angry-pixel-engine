import { Rectangle, Vector2 } from "@math";

export interface Shape {
    boundingBox: Rectangle;
    collider: number;
    entity: number;
    id: number;
    ignoreCollisionsWithLayers: string[];
    layer: string;
    position: Vector2;
    projectionAxes: Vector2[];
    radius: number;
    rotation: number;
    vertexModel: Vector2[];
    vertices: Vector2[];
    updateCollisions: boolean;
}

export class Polygon implements Shape {
    public boundingBox: Rectangle = new Rectangle();
    public collider: number = undefined;
    public entity: number = undefined;
    public id: number = undefined;
    public ignoreCollisionsWithLayers: string[] = undefined;
    public layer: string = undefined;
    public position: Vector2 = new Vector2();
    public projectionAxes: Vector2[] = [];
    public radius: number = 0;
    public vertices: Vector2[] = [];
    public updateCollisions: boolean = true;

    private _vertexModel: Vector2[] = [];

    public get vertexModel(): Vector2[] {
        return this._vertexModel;
    }

    public set vertexModel(vertexModel: Vector2[]) {
        this._vertexModel = vertexModel;

        if (vertexModel.length === 2) {
            this.vertices = [new Vector2(), new Vector2()];
            this.projectionAxes = [new Vector2()];
            return;
        }

        this.vertices = [];
        this.projectionAxes = [];

        this._vertexModel.forEach(() => {
            this.vertices.push(new Vector2());
            this.projectionAxes.push(new Vector2());
        });
    }

    constructor(
        vertexModel: Vector2[],
        public rotation: number = 0,
    ) {
        this.vertexModel = vertexModel;
    }
}

export class Circumference implements Shape {
    public boundingBox: Rectangle = new Rectangle();
    public collider: number = undefined;
    public entity: number = undefined;
    public id: number = undefined;
    public ignoreCollisionsWithLayers: string[] = undefined;
    public layer: string = undefined;
    public position: Vector2 = new Vector2();
    public projectionAxes: Vector2[] = [new Vector2()];
    public rotation: number = 0;
    public vertexModel: Vector2[] = [];
    public vertices: Vector2[] = [new Vector2(), new Vector2()];
    public updateCollisions: boolean = true;

    constructor(public radius: number) {}
}
