import { RenderComponent } from "../../core/Component";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { IVideoRenderData, RenderDataType, RenderLocation, Slice } from "@angry-pixel/2d-renderer";

const userInputEventNames = [
    "click",
    "contextmenu",
    "auxclick",
    "dblclick",
    "mousedown",
    "mouseup",
    "pointerup",
    "touchend",
    "keydown",
    "keyup",
];

/**
 * VideoRenderer configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(VideoRenderer, {
 *   video: this.assetManager.getVideo("video.mp4"),
 *   width: 1920,
 *   height: 1080,
 *   offset: new Vector2(0, 0),
 *   flipHorizontal:  false,
 *   flipVertical: false,
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   tintColor: "#00FF00",
 *   layer: "Video",
 *   slice: {x: 0, y:0, width: 1920, height: 1080},
 *   volume: 1,
 *   loop: false,
 * });
 * ```
 */
export interface VideoRendererOptions {
    /**The video element to render */
    video: HTMLVideoElement;
    /** Overwrite the original video width */
    width?: number;
    /** Overwrite the original video height */
    height?: number;
    /** X-axis and Y-axis offset */
    offset?: Vector2;
    /** Video rotation (degrees or radians) */
    rotation?: Rotation;
    /** Flip the video horizontally */
    flipHorizontal?: boolean;
    /** Flip the video vertically */
    flipVertical?: boolean;
    /** Change the opacity between 1 and 0 */
    opacity?: number;
    /** Define a mask color for the video */
    maskColor?: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix?: number;
    /** Define a color for tinting the video */
    tintColor?: string;
    /** The render layer */
    layer?: string;
    /** Cut the video based on straight coordinates starting from the top left downward */
    slice?: Slice;
    /** The volume of the video. Values between 1 and 0 */
    volume?: number;
    /** TRUE if the video will play in loop */
    loop?: boolean;
}

/**
 * The VideoRenderer component plays and renders a video element, and allows configuring options such as its dimensions, coloring, etc.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(VideoRenderer, {
 *   video: this.assetManager.getVideo("video.mp4"),
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(VideoRenderer, {
 *   video: this.assetManager.getVideo("video.mp4"),
 *   width: 1920,
 *   height: 1080,
 *   offset: new Vector2(0, 0),
 *   flipHorizontal:  false,
 *   flipVertical: false,
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   tintColor: "#00FF00",
 *   layer: "Video",
 *   slice: {x: 0, y:0, width: 1920, height: 1080},
 *   volume: 1,
 *   loop: false,
 * });
 * ```
 */
export class VideoRenderer extends RenderComponent {
    /**The video element to render */
    public video: HTMLVideoElement;
    /** Overwrite the original video width */
    public width: number;
    /** Overwrite the original video height */
    public height: number;
    /** X-axis and Y-axis offset */
    public offset: Vector2;
    /** Video rotation (degrees or radians) */
    public rotation: Rotation;
    /** Flip the video horizontally */
    public flipHorizontal: boolean;
    /** Flip the video vertically */
    public flipVertical: boolean;
    /** Change the opacity between 1 and 0 */
    public opacity: number;
    /** Define a mask color for the video */
    public maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    public maskColorMix: number;
    /** Define a color for tinting the video */
    public tintColor: string;
    /** The render layer */
    public layer: string;
    /** Cut the video based on straight coordinates starting from the top left downward */
    public slice?: Slice;

    private renderData: IVideoRenderData;
    private innerPosition: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();

    private _loop: boolean;
    private _volume: number;
    private _playing: boolean = false;
    private _paused: boolean = false;

    /** The volume of the video */
    public set volume(volume: number) {
        this._volume = volume;
        if (this.video) this.video.volume = volume;
    }

    /** The volume of the video */
    public get volume(): number {
        return this._volume;
    }

    /** TRUE if the video will play in loop */
    public set loop(loop: boolean) {
        this._loop = loop;
        if (this.video) this.video.loop = loop;
    }

    /** TRUE if the video will play in loop */
    public get loop(): boolean {
        return this._loop;
    }

    /** TRUE if the video is playing */
    public get playing(): boolean {
        return this._playing;
    }

    /** TRUE if the video is paused */
    public get paused(): boolean {
        return this._paused;
    }

    protected init(config: VideoRendererOptions): void {
        this.video = config.video;
        this.width = config.width ?? this.video.videoWidth;
        this.height = config.height ?? this.video.videoHeight;
        this.offset = config.offset ?? new Vector2();
        this.rotation = config.rotation ?? new Rotation();
        this.flipHorizontal = config.flipHorizontal ?? false;
        this.flipVertical = config.flipVertical ?? false;
        this.opacity = config.opacity ?? 1;
        this.maskColor = config.maskColor;
        this.maskColorMix = config.maskColorMix ?? 0;
        this.tintColor = config.tintColor;
        this.layer = config.layer;
        this.slice = config.slice;
        this._volume = config.volume ?? 1;
        this._loop = config.loop ?? false;

        this.renderData = {
            type: RenderDataType.Video,
            location: RenderLocation.WorldSpace,
            layer: "",
            position: new Vector2(),
            video: this.video,
            width: this.width,
            height: this.height,
        };
    }

    /**
     * Play the loaded video
     */
    public play(): void {
        if (!this.video && this.video.duration) return;

        if (this._playing && this._paused === false) {
            return;
        }

        if (this._paused) {
            this._paused = false;
            this.video.play();
            return;
        }

        this.video.loop = this._loop;
        this.video.volume = this._volume;

        this.video.addEventListener("ended", this.videoEventHandler);

        this._playing = true;

        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        const promise = this.video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                userInputEventNames.forEach((eventName) =>
                    window.addEventListener(eventName, this.userInputEventHandler),
                );
            });
        }
    }

    /**
     * Stop playing the current video
     */
    public stop(): void {
        if (this._playing) {
            this.video.pause();
            this.video.currentTime = 0;
            this.video.removeEventListener("ended", this.videoEventHandler);

            this._playing = false;
            this._paused = false;
        }
    }

    /**
     * Plause the current video
     */
    public pause(): void {
        if (this._playing && this._paused === false) {
            this.video.pause();
            this._paused = true;
        }
    }

    private videoEventHandler = (e: Event): void => {
        if (e.type === "ended") {
            this._playing = false;
            this.video.removeEventListener("ended", this.videoEventHandler);
        }
    };

    // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        if (this.video && this._playing) this.video.play();
    };

    protected update(): void {
        if (this.video && this.video.duration) {
            this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
            this.renderData.layer = this.layer ?? this.gameObject.layer;
            this.renderData.video = this.video;
            this.renderData.width = this.width * Math.abs(this.gameObject.transform.scale.x);
            this.renderData.height = this.height * Math.abs(this.gameObject.transform.scale.y);
            this.renderData.slice = this.slice;
            this.renderData.flipHorizontal = this.flipHorizontal !== this.gameObject.transform.scale.x < 0;
            this.renderData.flipVertical = this.flipVertical !== this.gameObject.transform.scale.y < 0;
            this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
            this.renderData.alpha = this.opacity;
            this.renderData.maskColor = this.maskColor;
            this.renderData.maskColorMix = this.maskColorMix;
            this.renderData.tintColor = this.tintColor;

            this.calculateRenderPosition();
            this.renderManager.addRenderData(this.renderData);
        }
    }

    private calculateRenderPosition(): void {
        this.scaledOffset.set(
            this.offset.x * this.gameObject.transform.scale.x,
            this.offset.y * this.gameObject.transform.scale.y,
        );
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.scaledOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition();
        }
    }

    private translateRenderPosition(): void {
        Vector2.subtract(this.innerPosition, this.renderData.position, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.renderData.position.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle),
        );
    }

    protected onActiveChange(): void {
        if (this.active === false) {
            this.stop();
        }
    }

    protected onDestroy(): void {
        this.stop();
    }
}
