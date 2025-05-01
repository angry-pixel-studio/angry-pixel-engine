import { Transform } from "@component/gameLogic/Transform";
import { VideoRenderer } from "@component/render2d/VideoRenderer";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { RenderManager } from "@manager/RenderManager";
import { TimeManager } from "@manager/TimeManager";
import { Vector2 } from "@math";
import { VideoRenderData } from "@webgl";

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

@injectable(SYSTEM_TYPES.VideoRendererSystem)
export class VideoRendererSystem implements System {
    // auxiliars
    private scaledOffset: Vector2 = new Vector2();
    private canPlay: boolean = true;
    private userInputErrorCatched: boolean = false;

    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.RenderManager) private readonly renderManager: RenderManager,
        @inject(DEPENDENCY_TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(DEPENDENCY_TYPES.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onCreate(): void {
        // pauses video when document is not visible
        document.addEventListener("visibilitychange", () => {
            this.entityManager.search(VideoRenderer).forEach(({ component: { video, playing } }) => {
                if (!video || typeof video === "string") return;
                if (document.hidden) video.pause();
                else if (!document.hidden && playing) video.play();
            });
        });
    }

    private catchUserInput(): void {
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.canPlay = false;
        this.userInputErrorCatched = true;
        userInputEventNames.forEach((eventName) => window.addEventListener(eventName, this.userInputEventHandler));
    }

    // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
    private userInputEventHandler = (): void => {
        userInputEventNames.forEach((eventName) => {
            window.removeEventListener(eventName, this.userInputEventHandler);
        });

        this.canPlay = true;
    };

    public onUpdate(): void {
        this.entityManager.search(VideoRenderer).forEach(({ entity, component: videoRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("VideoRenderer component needs a Transform");

            if (typeof videoRenderer.video === "string") {
                videoRenderer.video = this.assetManager.getVideo(videoRenderer.video);
                if (!videoRenderer.video) throw new Error(`Asset ${videoRenderer.video} not found`);
            }

            if (!videoRenderer.video || !videoRenderer.video.duration) return;

            this.checkVideoState(videoRenderer);

            this.scaledOffset.set(
                videoRenderer.offset.x * transform.localScale.x,
                videoRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(videoRenderer._renderData.position, transform.localPosition, this.scaledOffset);
            videoRenderer._renderData.layer = videoRenderer.layer;
            videoRenderer._renderData.video = videoRenderer.video;
            videoRenderer._renderData.width =
                (videoRenderer.width ?? videoRenderer.video.videoWidth) * Math.abs(transform.localScale.x);
            videoRenderer._renderData.height =
                (videoRenderer.height ?? videoRenderer.video.videoHeight) * Math.abs(transform.localScale.y);
            videoRenderer._renderData.rotation = transform.localRotation + videoRenderer.rotation;
            videoRenderer._renderData.slice = videoRenderer.slice;
            videoRenderer._renderData.flipHorizontal = videoRenderer.flipHorizontally;
            videoRenderer._renderData.flipVertical = videoRenderer.flipVertically;
            videoRenderer._renderData.opacity = videoRenderer.opacity;
            videoRenderer._renderData.maskColor = videoRenderer.maskColor;
            videoRenderer._renderData.maskColorMix = videoRenderer.maskColorMix;
            videoRenderer._renderData.tintColor = videoRenderer.tintColor;

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(videoRenderer._renderData, transform);
            }

            this.renderManager.addRenderData(videoRenderer._renderData);
        });
    }

    private translateRenderPosition(renderData: VideoRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }

    private checkVideoState(videoRenderer: VideoRenderer): void {
        const { video, action, loop, volume } = videoRenderer;

        if (typeof video === "string") return;

        // new video source
        if (video.src !== videoRenderer._currentVideoSrc) {
            videoRenderer._currentVideoSrc = video.src;
            videoRenderer.playing = false;
            video.currentTime = 0;
        }

        video.loop = loop;
        video.volume = volume;
        video.playbackRate = videoRenderer.fixedToTimeScale
            ? this.timeManager.timeScale < 0.0625
                ? 0
                : Math.min(this.timeManager.timeScale, 16)
            : 1;

        if (action === "play" && !videoRenderer.playing && !videoRenderer._playPromisePendind && this.canPlay) {
            videoRenderer._playPromisePendind = true;
            video
                .play()
                .then(() => {
                    videoRenderer._playPromisePendind = false;
                    videoRenderer.playing = true;
                })
                .catch(() => {
                    videoRenderer._playPromisePendind = false;
                    if (!this.userInputErrorCatched) this.catchUserInput();
                });
        }

        if (action === "play" && video.ended) {
            videoRenderer.action = "stop";
            videoRenderer.playing = false;
        }

        if (action === "stop" && video.currentTime > 0) {
            video.pause();
            video.currentTime = 0;
            videoRenderer.playing = false;
        }

        if (action === "pause" && !video.paused) video.pause();
    }

    public onDisabled(): void {
        this.entityManager.search(VideoRenderer).forEach(({ component: videoRenderer }) => {
            if (videoRenderer.video && typeof videoRenderer.video !== "string") {
                videoRenderer.video.pause();
                videoRenderer.video.currentTime = 0;
            }
        });
    }

    public onDestroy(): void {
        this.onDisabled();
    }
}
