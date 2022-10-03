import { Rectangle } from "../../math/Rectangle";
import { Vector2 } from "../../math/Vector2";
import { RenderData, RenderDataType } from "./RenderData";

export enum GeometricShape {
    Polygon,
    Circumference,
    Line,
}

export class GeometricRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Geometric;
    public color: string;
    public shape: GeometricShape;
    public vertexModel: Vector2[];
    public angle: number;
    public radius: number;
    public boundingBox: Rectangle;
}
