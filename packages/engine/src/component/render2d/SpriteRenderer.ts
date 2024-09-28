import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, Slice, SpriteRenderData } from "@webgl";

/**
 * @public
 * @category Components
 */
export interface SpriteRendererOptions {
    image: HTMLImageElement;
    layer: string;
    slice: Slice;
    smooth: boolean;
    offset: Vector2;
    flipHorizontally: boolean;
    flipVertically: boolean;
    rotation: number;
    opacity: number;
    maskColor: string;
    maskColorMix: number;
    tintColor: string;
    scale: Vector2;
    width: number;
    height: number;
}

/**
 * @public
 * @category Components
 */
export class SpriteRenderer {
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** The image to render */
    image: HTMLImageElement;
    /** Cut the image based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** TRUE for smooth pixels (not recommended for pixel art) */
    smooth: boolean = false;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** Flip the image horizontally */
    flipHorizontally: boolean = false;
    /** Flip the image vertically */
    flipVertically: boolean = false;
    /** Image rotation in radians */
    rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    opacity: number = 1;
    /** Define a mask color for the image */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** Define a color for tinting the sprite image */
    tintColor: string;
    /** Scale the image based on a vector */
    scale: Vector2 = new Vector2(1, 1);
    /** Overwrite the original image width */
    width: number;
    /** Overwrite the original image height */
    height: number;
    /** @internal */
    _renderData: SpriteRenderData = {
        type: RenderDataType.Sprite,
        position: new Vector2(),
        layer: undefined,
        image: undefined,
        width: undefined,
        height: undefined,
    };

    constructor(options?: Partial<SpriteRendererOptions>) {
        Object.assign(this, options);
    }
}
