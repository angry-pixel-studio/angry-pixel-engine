import { Transform } from "@component/gameLogic/Transform";
import { VideoRenderer } from "@component/render2d/VideoRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { TimeManager } from "@manager/TimeManager";
import { Vector2 } from "@math";
import { RenderDataType, VideoRenderData } from "@webgl";

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

            const renderData: VideoRenderData = {
                type: RenderDataType.Video,
                position: Vector2.add(videoRenderer._position, transform.localPosition, this.scaledOffset),
                layer: videoRenderer.layer,
                video: videoRenderer.video,
                width: (videoRenderer.width ?? videoRenderer.video.videoWidth) * Math.abs(transform.localScale.x),
                height: (videoRenderer.height ?? videoRenderer.video.videoHeight) * Math.abs(transform.localScale.y),
                rotation: transform.localRotation + videoRenderer.rotation,
                slice: videoRenderer.slice,
                flipHorizontal: videoRenderer.flipHorizontally,
                flipVertical: videoRenderer.flipVertically,
                opacity: videoRenderer.opacity,
                maskColor: videoRenderer.maskColor,
                maskColorMix: videoRenderer.maskColorMix,
                tintColor: videoRenderer.tintColor,
            };

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            this.renderManager.addRenderData(renderData);
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

    public onDisable(): void {
        this.entityManager.search(VideoRenderer).forEach(({ component: videoRenderer }) => {
            if (videoRenderer.video) {
                videoRenderer.video.pause();
                videoRenderer.video.currentTime = 0;
            }
        });
    }

    public onDestroy(): void {
        this.onDisable();
    }
}
