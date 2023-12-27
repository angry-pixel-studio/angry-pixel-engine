import { IRenderData } from "./RenderData";
import { Slice } from "./SpriteRenderData";

export interface IVideoRenderData extends IRenderData {
    video: HTMLVideoElement;
    width: number;
    height: number;
    slice?: Slice;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    rotation?: number;
    alpha?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
}
