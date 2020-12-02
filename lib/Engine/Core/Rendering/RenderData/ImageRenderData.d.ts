import { Rectangle } from "../../../Math/Rectangle";
import { RenderData, RenderDataType } from "./RenderData";
export declare class ImageRenderData extends RenderData {
    type: RenderDataType;
    image: HTMLImageElement;
    width: number;
    height: number;
    slice: Rectangle;
    flipHorizontal: boolean;
    flipVertical: boolean;
    rotation: number;
    smooth: boolean;
    alpha: number;
}
