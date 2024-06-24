import { IRenderData } from "./RenderData";

export interface ISpriteRenderData extends IRenderData {
    image: HTMLImageElement;
    width: number;
    height: number;
    smooth?: boolean;
    slice?: Slice;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    rotation?: number;
    alpha?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
}

/**
 * Cut the image based on straight coordinates starting from the top left downward.
 * @category Components
 * @public
 */
export interface Slice {
    /** Top left x coordinate */
    x: number;
    /** Top left y coordinate */
    y: number;
    /** The width to slice */
    width: number;
    /** The height to slice */
    height: number;
}
