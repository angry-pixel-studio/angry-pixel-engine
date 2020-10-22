import RenderData, { RenderDataType } from "./RenderData";

export const GEOMETRIC_RECTANGLE = "Rectangle";
export const GEOMETRIC_POLYGON = "Polygon";

export default class GeometricRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Geometric;
    public color: string = null;
    public geometric: any = null;
    public geometricType: string = null;
    public geometricUsePosition: boolean = false;
}
