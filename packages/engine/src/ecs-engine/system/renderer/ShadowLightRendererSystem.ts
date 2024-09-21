import { IShadowRenderData, IRenderManager, Light, RenderDataType, RenderLocation } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { LightRenderer } from "../../component/renderer/LightRenderer";
import { Transform } from "../../component/Transform";
import { ShadowRenderer } from "../../component/renderer/ShadowRenderer";
import { System } from "../../../ecs/SystemManager";
import { Entity, EntityManager, SearchResult } from "../../../ecs/EntityManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../config/types";

export class ShadowLightRendererSystem implements System {
    // cache
    private renderData: Map<Entity, IShadowRenderData> = new Map();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
    ) {}

    public onEnable(): void {
        this.renderData.clear();
    }

    public onUpdate(): void {
        const lightRenderers: SearchResult<LightRenderer>[] = this.entityManager.search(LightRenderer);
        lightRenderers.forEach(({ entity, component }) => this.updateLightRendererBoundingBox(entity, component));

        this.entityManager.search(ShadowRenderer).forEach(({ entity, component: shadowRenderer }, index) => {
            this.updatShadowRendererBoundingBox(entity, shadowRenderer);
            const renderData = this.getOrCreate(entity);

            renderData.layer = shadowRenderer.layer;
            renderData.color = shadowRenderer.color;
            renderData.opacity = shadowRenderer.opacity;
            renderData.width = shadowRenderer._boundingBox.width;
            renderData.height = shadowRenderer._boundingBox.height;
            renderData.position.copy(shadowRenderer._boundingBox.center);

            renderData.lights = lightRenderers
                .filter(
                    ({ component: lightRenderer }) =>
                        lightRenderer.layer === shadowRenderer.layer &&
                        lightRenderer._boundingBox.overlaps(shadowRenderer._boundingBox),
                )
                .map(
                    ({ component: { _boundingBox, smooth, intensity } }) =>
                        ({
                            position: _boundingBox.center,
                            radius: _boundingBox.width / 2,
                            smooth,
                            intensity,
                        }) as Light,
                );

            this.renderManager.addRenderData(renderData);
        });
    }

    private getOrCreate(entity: Entity): IShadowRenderData {
        if (!this.renderData.has(entity)) {
            this.renderData.set(entity, {
                type: RenderDataType.Shadow,
                color: "",
                height: 0,
                layer: "",
                lights: [],
                location: RenderLocation.WorldSpace,
                opacity: 0,
                position: new Vector2(),
                rotation: 0,
                width: 0,
            });
        }

        return this.renderData.get(entity);
    }

    private updateLightRendererBoundingBox(entity: Entity, lightRenderer: LightRenderer): void {
        const transform = this.entityManager.getComponent(entity, Transform);
        if (!transform) throw new Error("LightRenderer component needs a Transform");

        const scaledRadius = lightRenderer.radius * Math.abs(Math.max(transform.localScale.x, transform.localScale.y));

        lightRenderer._boundingBox.set(
            transform.localPosition.x - scaledRadius,
            transform.localPosition.y - scaledRadius,
            scaledRadius * 2,
            scaledRadius * 2,
        );
    }

    private updatShadowRendererBoundingBox(entity: Entity, shadowRenderer: ShadowRenderer): void {
        const transform = this.entityManager.getComponent(entity, Transform);
        if (!transform) throw new Error("ShadowRenderer component needs a Transform");

        const scaledWidth = shadowRenderer.width * Math.abs(transform.localScale.x);
        const scaledHeight = shadowRenderer.height * Math.abs(transform.localScale.y);

        shadowRenderer._boundingBox.set(
            transform.localPosition.x - scaledWidth / 2,
            transform.localPosition.y - scaledHeight / 2,
            scaledWidth,
            scaledHeight,
        );
    }
}
