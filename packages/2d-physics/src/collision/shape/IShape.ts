import { Rectangle, Vector2 } from "@angry-pixel/math";

export enum ShapeType {
    Polygon,
    Circumference,
    Line,
}

export interface IShape {
    type: ShapeType;
    position: Vector2;
    rotation: number;
    boundingBox: Rectangle;
    vertices: Vector2[];
    projectionAxes: Vector2[];
    update(): void;
}
