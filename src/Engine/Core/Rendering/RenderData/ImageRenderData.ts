import { RenderData, RenderDataType } from "./RenderData";

export interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ImageRenderData extends RenderData {
    public type: RenderDataType = RenderDataType.Image;
    public image: HTMLImageElement = null;
    public width: number = 0;
    public height: number = 0;
    public slice: Slice = null;
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = 0;
    public smooth: boolean = true;
    public alpha: number = 1;
    public maskColor: string = null;
    public maskColorMix: number = null;
}
