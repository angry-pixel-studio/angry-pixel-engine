import { RenderComponent } from "../../core/Component";
import { Rotation, Vector2 } from "angry-pixel-math";
import { IVideoRenderData, RenderDataType, RenderLocation, Slice } from "angry-pixel-2d-renderer";

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

export interface VideoRendererOptions {
    video: HTMLVideoElement;
    width?: number;
    height?: number;
    offset?: Vector2;
    rotation?: Rotation;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
    layer?: string;
    slice?: Slice;
    volume?: number;
    loop?: boolean;
}

export class VideoRenderer extends RenderComponent {
    public video: HTMLVideoElement;
    public width: number;
    public height: number;
    public offset: Vector2;
    public flipHorizontal: boolean;
    public flipVertical: boolean;
    public rotation: Rotation;
    public opacity: number;
    public maskColor: string;
    public maskColorMix: number;
    public tintColor: string;
    public layer: string;
    public slice?: Slice;

    private renderData: IVideoRenderData;
    private innerPosition: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();

    private _loop: boolean;
    private _volume: number;
    private _playing: boolean = false;
    private _paused: boolean = false;

    public set volume(volume: number) {
        this._volume = volume;
        if (this.video) this.video.volume = volume;
    }

    public get volume(): number {
        return this._volume;
    }

    public set loop(loop: boolean) {
        this._loop = loop;
        if (this.video) this.video.loop = loop;
    }

    public get loop(): boolean {
        return this._loop;
    }

    public get playing(): boolean {
        return this._playing;
    }

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
                    window.addEventListener(eventName, this.userInputEventHandler)
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
            this.offset.y * this.gameObject.transform.scale.y
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
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
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
