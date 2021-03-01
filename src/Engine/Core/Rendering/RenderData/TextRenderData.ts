import { RenderData, RenderDataType } from "./RenderData";

export type Pivot = "left" | "center" | "right";

export class TextRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Text;
    public color: string = null;
    public text: string | string[] = null;
    public fontFamily: string = null;
    public fontUrl: string = null;
    public fontSize: number = null;
    public lineSeparation: number = null;
    public letterSpacing: number = null;
    public bold: boolean = false;
    public italic: boolean = false;
    public pivot: Pivot = null;
}
