import { RenderData, RenderDataType } from "./RenderData";

export type Pivot = "left" | "center" | "right";

export class TextRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Text;
    public color: string = null;
    public text: string = null;
    public fontFamily: string = null;
    public fontUrl: string = null;
    public fontSize: number = null;
    public lineSeparation: number = null;
    public letterSpacing: number = null;
    public pivot: Pivot = null;
}
