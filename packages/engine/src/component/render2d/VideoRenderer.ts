import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, Slice, VideoRenderData } from "@webgl";

/**
 * VideoRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const videoRenderer = new VideoRenderer({
 *   video: this.assetManager.getVideo("video.mp4"),
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
 *   volume: 1,
 *   loop: false,
 *   fixedToTimeScale: false
 * });
 * ```
 */
export interface VideoRendererOptions {
    action: "play" | "pause" | "stop";
    fixedToTimeScale: boolean;
    flipHorizontally: boolean;
    flipVertically: boolean;
    height: number;
    layer: string;
    loop: boolean;
    maskColor: string;
    maskColorMix: number;
    offset: Vector2;
    opacity: number;
    rotation: number;
    slice: Slice;
    tintColor: string;
    video: HTMLVideoElement | string;
    volume: number;
    width: number;
}

/**
 * The VideoRenderer component renders video content to the screen.\
 * It supports features like video playback control, scaling, rotation, flipping, opacity, color masking and tinting.\
 * Videos can be rendered with custom dimensions, positioned with offsets, and sliced to show specific regions.\
 * The component provides control over looping, volume, time scaling, and can be assigned to specific render layers.\
 * Videos can be paused, played, and stopped programmatically.
 * @public
 * @category Components
 * @example
 * ```js
 * const videoRenderer = new VideoRenderer({
 *   video: this.assetManager.getVideo("video.mp4"),
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
 *   volume: 1,
 *   loop: false,
 *   fixedToTimeScale: false
 * });
 * videoRenderer.play();
 * ```
 */
export class VideoRenderer {
    /** The action to perform with the video */
    action: "play" | "pause" | "stop";
    /** TRUE If the playback rate is fixed to the TimeManager time scale, default FALSE */
    fixedToTimeScale: boolean = false;
    /** Flip the video horizontally */
    flipHorizontally: boolean;
    /** Flip the video vertically */
    flipVertically: boolean;
    /** Overwrite the original video height */
    height: number;
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** TRUE to play the video in loop */
    loop: boolean = false;
    /** Define a mask color for the video */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** READONLY, TRUE if the video is playing */
    playing: boolean = false;
    /** Video rotation (degrees or radians) */
    rotation: number = 0;
    /** Cut the video based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** Define a color for tinting the video */
    tintColor: string;
    /**The video element to render */
    video: HTMLVideoElement | string;
    /** The volume of the video (between 1 and 0) */
    volume: number = 1;
    /** Overwrite the original video width */
    width: number;

    /* @internal */
    _currentVideoSrc: string = undefined;

    /* @internal */
    _playPromisePendind: boolean = false;

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

    /**
     * Play the video source.
     */
    public play(videoSource?: HTMLVideoElement): void {
        if (videoSource) this.video = videoSource;
        this.action = "play";
    }

    /**
     * Pause the video source.
     */
    public pause(): void {
        this.action = "pause";
    }

    /**
     * Stop the video source.
     */
    public stop(): void {
        this.action = "stop";
    }
}
