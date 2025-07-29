import { RenderComponent } from "../../core/Component";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
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
    constructor() {
        super(...arguments);
        this.innerPosition = new Vector2();
        this.scaledOffset = new Vector2();
        this._playing = false;
        this._paused = false;
        this.videoEventHandler = (e) => {
            if (e.type === "ended") {
                this._playing = false;
                this.video.removeEventListener("ended", this.videoEventHandler);
            }
        };
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.userInputEventHandler = () => {
            userInputEventNames.forEach((eventName) => {
                window.removeEventListener(eventName, this.userInputEventHandler);
            });
            if (this.video && this._playing)
                this.video.play();
        };
    }
    /** The volume of the video */
    set volume(volume) {
        this._volume = volume;
        if (this.video)
            this.video.volume = volume;
    }
    /** The volume of the video */
    get volume() {
        return this._volume;
    }
    /** TRUE if the video will play in loop */
    set loop(loop) {
        this._loop = loop;
        if (this.video)
            this.video.loop = loop;
    }
    /** TRUE if the video will play in loop */
    get loop() {
        return this._loop;
    }
    /** TRUE if the video is playing */
    get playing() {
        return this._playing;
    }
    /** TRUE if the video is paused */
    get paused() {
        return this._paused;
    }
    init(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.video = config.video;
        this.width = (_a = config.width) !== null && _a !== void 0 ? _a : this.video.videoWidth;
        this.height = (_b = config.height) !== null && _b !== void 0 ? _b : this.video.videoHeight;
        this.offset = (_c = config.offset) !== null && _c !== void 0 ? _c : new Vector2();
        this.rotation = (_d = config.rotation) !== null && _d !== void 0 ? _d : new Rotation();
        this.flipHorizontal = (_e = config.flipHorizontal) !== null && _e !== void 0 ? _e : false;
        this.flipVertical = (_f = config.flipVertical) !== null && _f !== void 0 ? _f : false;
        this.opacity = (_g = config.opacity) !== null && _g !== void 0 ? _g : 1;
        this.maskColor = config.maskColor;
        this.maskColorMix = (_h = config.maskColorMix) !== null && _h !== void 0 ? _h : 0;
        this.tintColor = config.tintColor;
        this.layer = config.layer;
        this.slice = config.slice;
        this._volume = (_j = config.volume) !== null && _j !== void 0 ? _j : 1;
        this._loop = (_k = config.loop) !== null && _k !== void 0 ? _k : false;
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
    play() {
        if (!this.video && this.video.duration)
            return;
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
                userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
            });
        }
    }
    /**
     * Stop playing the current video
     */
    stop() {
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
    pause() {
        if (this._playing && this._paused === false) {
            this.video.pause();
            this._paused = true;
        }
    }
    update() {
        var _a;
        if (this.video && this.video.duration) {
            this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
            this.renderData.layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
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
    calculateRenderPosition() {
        this.scaledOffset.set(this.offset.x * this.gameObject.transform.scale.x, this.offset.y * this.gameObject.transform.scale.y);
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.scaledOffset);
        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition();
        }
    }
    translateRenderPosition() {
        Vector2.subtract(this.innerPosition, this.renderData.position, this.gameObject.transform.position);
        const translatedAngle = Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.renderData.position.set(this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle), this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle));
    }
    onActiveChange() {
        if (this.active === false) {
            this.stop();
        }
    }
    onDestroy() {
        this.stop();
    }
}
//# sourceMappingURL=VideoRenderer.js.map