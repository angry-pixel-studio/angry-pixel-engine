import { Transform } from "@component/gameLogic/Transform";
import { LightRenderer } from "@component/render2d/LightRenderer";
import { ShadowRenderer } from "@component/render2d/ShadowRenderer";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { Entity, EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Light } from "@webgl";

@injectable(SYSTEM_TYPES.ShadowLightRendererSystem)
export class ShadowLightRendererSystem implements System {
    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        const lightRenderers = this.entityManager.search(LightRenderer);
        lightRenderers.forEach(({ entity, component }) => this.updateLightRendererBoundingBox(entity, component));

        this.entityManager.search(ShadowRenderer).forEach(({ entity, component: shadowRenderer }) => {
            this.updatShadowRendererBoundingBox(entity, shadowRenderer);

            shadowRenderer._renderData.layer = shadowRenderer.layer;
            shadowRenderer._renderData.color = shadowRenderer.color;
            shadowRenderer._renderData.opacity = shadowRenderer.opacity;
            shadowRenderer._renderData.width = shadowRenderer._boundingBox.width;
            shadowRenderer._renderData.height = shadowRenderer._boundingBox.height;
            shadowRenderer._renderData.position = shadowRenderer._boundingBox.center;
            shadowRenderer._renderData.rotation = 0;
            shadowRenderer._renderData.lights = [];

            shadowRenderer._renderData.lights = lightRenderers
                .filter(
                    ({ component: lightRenderer }) =>
                        lightRenderer.layer === shadowRenderer.layer &&
                        lightRenderer._boundingBox.intersects(shadowRenderer._boundingBox),
                )
                .map<Light>(({ component: { _boundingBox, smooth, intensity } }) => ({
                    position: _boundingBox.center,
                    radius: _boundingBox.width / 2,
                    smooth,
                    intensity,
                }));

            this.renderManager.addRenderData(shadowRenderer._renderData);
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
