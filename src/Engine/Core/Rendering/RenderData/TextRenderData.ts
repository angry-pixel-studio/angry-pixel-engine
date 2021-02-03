import { RenderData, RenderDataType } from "./RenderData";

export class TextRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Text;
    public width: number = null;
    public height: number = null;
    public color: string = null;
    public text: string | string[] = null;
    public fontFamily: string = null;
    public fontUrl: string = null;
    public textSize: number = null;
    public lineSeparation: number = null;
    public bold: boolean = false;
    public italic: boolean = false;
}
