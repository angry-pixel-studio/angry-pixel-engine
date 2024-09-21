import { IRenderManager, IVideoRenderData, RenderDataType, RenderLocation } from "../../../2d-renderer";
import { Entity, EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { Vector2 } from "../../../math";
import { Transform } from "../../component/Transform";
import { VideoRenderer } from "../../component/renderer/VideoRenderer";
import { TYPES } from "../../config/types";
import { ITimeManager } from "../../manager/TimeManager";

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

export class VideoRendererSystem implements System {
    private readonly renderData: Map<Entity, IVideoRenderData> = new Map();
    private entitiesUpdated: Entity[];
    private scaledOffset: Vector2 = new Vector2();
    private canPlay: boolean;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
        @inject(TYPES.TimeManager) private readonly timeManager: ITimeManager,
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
        this.entitiesUpdated = [];

        this.entityManager.search(VideoRenderer).forEach(({ entity, component: videoRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("VideoRenderer component needs a Transform");

            if (!videoRenderer.video || !videoRenderer.video.duration) return;

            const renderData = this.getOrCreate(entity);

            this.checkVideoState(videoRenderer);

            this.scaledOffset.set(
                videoRenderer.offset.x * transform.localScale.x,
                videoRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(renderData.position, transform.localPosition, this.scaledOffset);

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            renderData.layer = videoRenderer.layer;
            renderData.video = videoRenderer.video;
            renderData.width =
                (videoRenderer.width ?? videoRenderer.video.videoWidth) * Math.abs(transform.localScale.x);
            renderData.height =
                (videoRenderer.height ?? videoRenderer.video.videoHeight) * Math.abs(transform.localScale.y);
            renderData.rotation = transform.localRotation + videoRenderer.rotation;
            renderData.slice = videoRenderer.slice;
            renderData.flipHorizontal = videoRenderer.flipHorizontally;
            renderData.flipVertical = videoRenderer.flipVertically;
            renderData.alpha = videoRenderer.opacity; // TODO: unify names
            renderData.maskColor = videoRenderer.maskColor;
            renderData.maskColorMix = videoRenderer.maskColorMix;
            renderData.tintColor = videoRenderer.tintColor;

            this.entitiesUpdated.push(entity);
        });

        for (const entity of this.renderData.keys()) {
            if (!this.entitiesUpdated.includes(entity)) this.renderData.delete(entity);
            else this.renderManager.addRenderData(this.renderData.get(entity));
        }
    }

    private getOrCreate(entity: Entity): IVideoRenderData {
        if (!this.renderData.has(entity)) {
            this.renderData.set(entity, {
                type: RenderDataType.Video,
                location: RenderLocation.WorldSpace, // TODO: remove this from the renderer
                layer: undefined,
                video: undefined,
                width: undefined,
                height: undefined,
                position: new Vector2(),
            });
        }

        return this.renderData.get(entity);
    }

    private translateRenderPosition(renderData: IVideoRenderData, transform: Transform): void {
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
