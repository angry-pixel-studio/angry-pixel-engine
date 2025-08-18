import { Vector2 } from "@angry-pixel/math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, Slice, SpriteRenderData } from "@angry-pixel/webgl";

/**
 * SpriteRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const spriteRenderer = new SpriteRenderer({
 *   image: this.assetManager.getImage("image.png"),
 *   width: 1920,
 *   height: 1080,
 *   offset: new Vector2(0, 0),
 *   flipHorizontally: false,
 *   flipVertically: false,
 *   rotation: 0,
 *   opacity: 1,
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   tintColor: "#00FF00",
 *   layer: "Default",
 *   slice: {x: 0, y: 0, width: 1920, height: 1080},
 *   scale: new Vector2(1, 1),
 *   tiled: new Vector2(1, 1),
 *   smooth: false
 * });
 * ```
 */
export interface SpriteRendererOptions {
    image: HTMLImageElement | string;
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
    tiled: Vector2;
}

/**
 * The SpriteRenderer component renders 2D images (sprites) to the screen.\
 * It supports features like image slicing, scaling, rotation, flipping, opacity, color masking and tinting.\
 * Images can be rendered with custom dimensions, positioned with offsets, and even tiled across an area.\
 * The component allows control over pixel smoothing and can be assigned to specific render layers.
 * @public
 * @category Components
 * @example
 * ```js
 * const spriteRenderer = new SpriteRenderer({
 *   image: this.assetManager.getImage("image.png"),
 *   width: 1920,
 *   height: 1080,
 *   offset: new Vector2(0, 0),
 *   flipHorizontally: false,
 *   flipVertically: false,
 *   rotation: 0,
 *   opacity: 1,
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   tintColor: "#00FF00",
 *   layer: "Default",
 *   slice: {x: 0, y: 0, width: 1920, height: 1080},
 *   scale: new Vector2(1, 1),
 *   tiled: new Vector2(1, 1),
 *   smooth: false
 * });
 * ```
 */
export class SpriteRenderer {
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** The image to render */
    image: HTMLImageElement | string;
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
    /** Enable tiled draw mode */
    tiled: Vector2;
    /** @internal */
    _renderData: SpriteRenderData = {
        type: RenderDataType.Sprite,
        position: new Vector2(),
        layer: undefined,
        image: undefined,
        width: undefined,
        height: undefined,
    };

    /** @internal */
    static componentName: string = "SpriteRenderer";

    constructor(options?: Partial<SpriteRendererOptions>) {
        Object.assign(this, options);
    }
}
