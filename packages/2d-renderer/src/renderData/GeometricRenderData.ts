import { Vector2 } from "@angry-pixel/math";
import { IRenderData } from "./RenderData";

export enum GeometricShape {
    Polygon,
    Circumference,
    Line,
}

export interface IGeometricRenderData extends IRenderData {
    color: string;
    shape: GeometricShape;
    vertexModel?: Vector2[];
    rotation?: number;
    radius?: number;
}
