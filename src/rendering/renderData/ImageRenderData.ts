import { RenderData, RenderDataType } from "./RenderData";

export interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ImageRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Image;
    public image: HTMLImageElement;
    public width: number;
    public height: number;
    public slice: Slice;
    public flipHorizontal: boolean;
    public flipVertical: boolean;
    public rotation: number;
    public smooth: boolean;
    public alpha: number;
    public maskColor: string;
    public maskColorMix: number;
    public tintColor: string;
}
