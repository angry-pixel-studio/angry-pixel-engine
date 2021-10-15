import { Vector2 } from "../../../Math/Vector2";
import { RenderData, RenderDataType } from "./RenderData";

export type Orientation = "rightUp" | "rightDown" | "center";

export class TextRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Text;
    public color: string;
    public text: string;
    public fontFamily: string;
    public fontUrl: string;
    public fontSize: number;
    public lineSeparation: number;
    public letterSpacing: number;
    public bitmapSize: number;
    public charRanges: number[];
    public smooth: boolean;
    public bitmapOffset: Vector2;
    public width: number;
    public height: number;
    public rotation: number;
    public opacity: number;
    public orientation: Orientation;
}
