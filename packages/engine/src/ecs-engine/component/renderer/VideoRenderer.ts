import { Slice } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { defaultRenderLayer } from "../Camera";

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
    public video: HTMLVideoElement;
    /** Overwrite the original video width */
    public width: number;
    /** Overwrite the original video height */
    public height: number;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** Video rotation (degrees or radians) */
    public rotation: number = 0;
    /** Flip the video horizontally */
    public flipHorizontally: boolean;
    /** Flip the video vertically */
    public flipVertically: boolean;
    /** Change the opacity between 1 and 0 */
    public opacity: number;
    /** Define a mask color for the video */
    public maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    public maskColorMix: number;
    /** Define a color for tinting the video */
    public tintColor: string;
    /** The render layer */
    public layer: string = defaultRenderLayer;
    /** Cut the video based on straight coordinates starting from the top left downward */
    public slice?: Slice;
    /** TRUE to play the video in loop */
    public loop: boolean = false;
    /** The volume of the video (between 1 and 0) */
    public volume: number = 1;
    /** TRUE to play the video. If the video stops playing it becomes FALSE */
    public play: boolean = false;
    /** TRUE to pause the video */
    public pause: boolean = false;
}
