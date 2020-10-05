import RenderData, { RenderDataType } from "./RenderData";

export default class TextRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Text;
    public color: string = null;
    public text: string = null;
    public font: string = null;
    public textSize: number = null;
    public lineSeparation: number = null;
    public bold: boolean = false;
    public italic: boolean = false;
}
