import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, Slice, VideoRenderData } from "@webgl";

/**
 * @public
 * @category Components
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
    video: HTMLVideoElement;
    volume: number;
    width: number;
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
    video: HTMLVideoElement;
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
