import { Transform } from "@component/gameLogic/Transform";
import { VideoRenderer } from "@component/render2d/VideoRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
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

@injectable(SYSTEMS.VideoRendererSystem)
export class VideoRendererSystem implements System {
    // auxiliars
    private scaledOffset: Vector2 = new Vector2();
    private canPlay: boolean;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    public onCreate(): void {
        // see https://developer.chrome.com/blog/autoplay/#audiovideo-elements
        this.canPlay = false;
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
        const { video, play, pause, loop, volume } = videoRenderer;

        video.loop = loop;
        video.volume = volume;
        video.playbackRate = this.timeManager.timeScale < 0.0625 ? 0 : Math.min(this.timeManager.timeScale, 16);

        if (play && video.ended) videoRenderer.play = false;

        if (play && video.paused && this.canPlay) video.play();

        if (!play && video.currentTime > 0) {
            video.pause();
            video.currentTime = 0;
        }

        if (pause && !video.paused) video.pause();
        if (!pause && video.paused && play && this.canPlay) video.play();
    }

    public onDisabled(): void {
        this.entityManager.search(VideoRenderer).forEach(({ component: videoRenderer }) => {
            if (videoRenderer.video) {
                videoRenderer.video.pause();
                videoRenderer.video.currentTime = 0;
            }
        });
    }

    public onDestroy(): void {
        this.onDisabled();
    }
}
