import { RenderData, RenderDataType } from "./RenderData";
export interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class ImageRenderData extends RenderData {
    type: RenderDataType;
    image: HTMLImageElement;
    width: number;
    height: number;
    slice: Slice;
    flipHorizontal: boolean;
    flipVertical: boolean;
    rotation: number;
    smooth: boolean;
    alpha: number;
}
