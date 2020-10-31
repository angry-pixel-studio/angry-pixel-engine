import { RenderData, RenderDataType } from "./RenderData";
export declare const GEOMETRIC_RECTANGLE = "Rectangle";
export declare const GEOMETRIC_POLYGON = "Polygon";
export declare class GeometricRenderData extends RenderData {
    type: RenderDataType;
    color: string;
    geometric: any;
    geometricType: string;
    geometricUsePosition: boolean;
}
