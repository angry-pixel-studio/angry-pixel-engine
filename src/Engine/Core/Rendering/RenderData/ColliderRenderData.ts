import { Shape } from "../../Collision/Shape/Shape";
import { RenderData, RenderDataType } from "./RenderData";

export class ColliderRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Collider;
    public color: string = null;
    public shape: Shape = null;
}
