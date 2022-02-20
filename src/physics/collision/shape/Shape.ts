import { Rectangle } from "../../../math/Rectangle";
import { Vector2 } from "../../../math/Vector2";

export enum ShapeType {
    Rectangle,
    Polygon,
    Circle,
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
