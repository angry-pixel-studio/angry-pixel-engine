import { Rectangle } from "../../../Libs/Geometric/Shapes/Rectangle";
import { RenderData, RenderDataType } from "./RenderData";

export class ImageRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Image;
    public image: HTMLImageElement = null;
    public width: number = 0;
    public height: number = 0;
    public slice: Rectangle = null;
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = null;
    public smooth: boolean = true;
    public alpha: number = 1;
}
