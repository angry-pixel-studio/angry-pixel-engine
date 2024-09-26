import { Transform } from "@component/gameLogic/Transform";
import { LightRenderer } from "@component/render2d/LightRenderer";
import { ShadowRenderer } from "@component/render2d/ShadowRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { Entity, EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Light, RenderDataType, ShadowRenderData } from "@webgl";

@injectable(SYSTEMS.ShadowLightRendererSystem)
export class ShadowLightRendererSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        const lightRenderers = this.entityManager.search(LightRenderer);
        lightRenderers.forEach(({ entity, component }) => this.updateLightRendererBoundingBox(entity, component));

        this.entityManager.search(ShadowRenderer).forEach(({ entity, component: shadowRenderer }) => {
            this.updatShadowRendererBoundingBox(entity, shadowRenderer);
            shadowRenderer._position.copy(shadowRenderer._boundingBox.center);

            const renderData: ShadowRenderData = {
                type: RenderDataType.Shadow,
                layer: shadowRenderer.layer,
                color: shadowRenderer.color,
                opacity: shadowRenderer.opacity,
                width: shadowRenderer._boundingBox.width,
                height: shadowRenderer._boundingBox.height,
                position: shadowRenderer._position,
                rotation: 0,
                lights: [],
            };

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
