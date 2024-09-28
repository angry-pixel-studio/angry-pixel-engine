import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, Slice, VideoRenderData } from "@webgl";

/**
 * @public
 * @category Components
 */
export interface VideoRendererOptions {
    video: HTMLVideoElement;
    width: number;
    height: number;
    offset: Vector2;
    rotation: number;
    flipHorizontally: boolean;
    flipVertically: boolean;
    opacity: number;
    maskColor: string;
    maskColorMix: number;
    tintColor: string;
    layer: string;
    slice: Slice;
    loop: boolean;
    volume: number;
    play: boolean;
    pause: boolean;
}

/**
 * The VideoRenderer component plays and renders a video element,
 * and allows configuring options such as its dimensions, coloring, etc.
 * @public
 * @category Components
 * @example
 * ```js
 * videoRenderer.video = this.assetManager.getVideo("video.mp4");
 * videoRenderer.width = 1920;
 * videoRenderer.height = 1080;
 * videoRenderer.offset = new Vector2(0, 0);
 * videoRenderer.flipHorizontally =  false;
 * videoRenderer.flipVertically = false;
 * videoRenderer.rotation = 0;
 * videoRenderer.opacity = 1;
 * videoRenderer.maskColor = "#FF0000";
 * videoRenderer.maskColorMix = 0;
 * videoRenderer.tintColor = "#00FF00";
 * videoRenderer.layer = "Default";
 * videoRenderer.slice = {x: 0, y:0, width: 1920, height: 1080};
 * videoRenderer.volume = 1;
 * videoRenderer.loop = false;
 * videoRenderer.play = true;
 * videoRenderer.pause = false;
 * ```
 */
export class VideoRenderer {
    /**The video element to render */
    video: HTMLVideoElement;
    /** Overwrite the original video width */
    width: number;
    /** Overwrite the original video height */
    height: number;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** Video rotation (degrees or radians) */
    rotation: number = 0;
    /** Flip the video horizontally */
    flipHorizontally: boolean;
    /** Flip the video vertically */
    flipVertically: boolean;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** Define a mask color for the video */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** Define a color for tinting the video */
    tintColor: string;
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** Cut the video based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** TRUE to play the video in loop */
    loop: boolean = false;
    /** The volume of the video (between 1 and 0) */
    volume: number = 1;
    /** TRUE to play the video. If the video stops playing it becomes FALSE */
    play: boolean = false;
    /** TRUE to pause the video */
    pause: boolean = false;

    /** @internal */
    _renderData: VideoRenderData = {
        type: RenderDataType.Video,
        height: undefined,
        layer: undefined,
        position: new Vector2(),
        video: undefined,
        width: undefined,
        flipHorizontal: undefined,
        flipVertical: undefined,
        maskColor: undefined,
        maskColorMix: undefined,
        opacity: undefined,
        rotation: undefined,
        slice: undefined,
        tintColor: undefined,
    };

    constructor(options?: Partial<VideoRendererOptions>) {
        Object.assign(this, options);
    }
}
