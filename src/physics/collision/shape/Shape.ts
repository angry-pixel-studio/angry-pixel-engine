import { Rectangle, Vector2 } from "angry-pixel-math";

export enum ShapeType {
    Polygon,
    Circumference,
    Line,
}

export interface Shape {
    readonly vertices: Vector2[];
    readonly type: ShapeType;
    readonly boundingBox: Rectangle;
    readonly projectionAxes: Vector2[];

    vertexModel: Vector2[];
    position: Vector2;
    angle: number;

    update(): void;
}
