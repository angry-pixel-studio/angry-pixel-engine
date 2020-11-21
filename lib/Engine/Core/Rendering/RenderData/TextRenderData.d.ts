import { RenderData, RenderDataType } from "./RenderData";
export declare class TextRenderData extends RenderData {
    type: RenderDataType;
    color: string;
    text: string | string[];
    font: string;
    textSize: number;
    lineSeparation: number;
    bold: boolean;
    italic: boolean;
}
