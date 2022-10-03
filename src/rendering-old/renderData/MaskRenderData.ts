import { RenderData, RenderDataType } from "./RenderData";

export class MaskRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Mask;
    public width: number;
    public height: number;
    public color: string;
    public rotation: number;
    public alpha: number;
}
