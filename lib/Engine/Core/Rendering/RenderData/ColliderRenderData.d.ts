import { Shape } from "../../Collision/Shape/Shape";
import { RenderData, RenderDataType } from "./RenderData";
export declare class ColliderRenderData extends RenderData {
    type: RenderDataType;
    color: string;
    shape: Shape;
}
