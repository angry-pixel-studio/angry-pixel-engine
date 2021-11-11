import { Shape } from "../../physics/collision/shape/Shape"; // TODO: resolve dependency
import { RenderData, RenderDataType } from "./RenderData";

export class ColliderRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Collider;
    public color: string = null;
    public shape: Shape = null;
}
