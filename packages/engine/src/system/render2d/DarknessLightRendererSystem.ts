import { Transform } from "@component/gameLogic/Transform";
import { LightRenderer } from "@component/render2d/LightRenderer";
import { DarknessRenderer } from "@component/render2d/DarknessRenderer";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { Entity, EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Light } from "@webgl";

@injectable(SYSTEM_TYPES.DarknessLightRendererSystem)
export class DarknessLightRendererSystem implements System {
    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        const lightRenderers = this.entityManager.search(LightRenderer);
        lightRenderers.forEach(({ entity, component }) => this.updateLightRendererBoundingBox(entity, component));

        this.entityManager.search(DarknessRenderer).forEach(({ entity, component: darknessRenderer }) => {
            this.updatDarknessRendererBoundingBox(entity, darknessRenderer);

            darknessRenderer._renderData.layer = darknessRenderer.layer;
            darknessRenderer._renderData.color = darknessRenderer.color;
            darknessRenderer._renderData.opacity = darknessRenderer.opacity;
            darknessRenderer._renderData.width = darknessRenderer._boundingBox.width;
            darknessRenderer._renderData.height = darknessRenderer._boundingBox.height;
            darknessRenderer._renderData.position = darknessRenderer._boundingBox.center;
            darknessRenderer._renderData.rotation = 0;
            darknessRenderer._renderData.lights = [];

            darknessRenderer._renderData.lights = lightRenderers
                .filter(
                    ({ component: lightRenderer }) =>
                        lightRenderer.layer === darknessRenderer.layer &&
                        lightRenderer._boundingBox.intersects(darknessRenderer._boundingBox),
                )
                .map<Light>(({ component: { _boundingBox, smooth, intensity } }) => ({
                    position: _boundingBox.center,
                    radius: _boundingBox.width / 2,
                    smooth,
                    intensity,
                }));

            this.renderManager.addRenderData(darknessRenderer._renderData);
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

    private updatDarknessRendererBoundingBox(entity: Entity, darknessRenderer: DarknessRenderer): void {
        const transform = this.entityManager.getComponent(entity, Transform);
        if (!transform) throw new Error("DarknessRenderer component needs a Transform");

        const scaledWidth = darknessRenderer.width * Math.abs(transform.localScale.x);
        const scaledHeight = darknessRenderer.height * Math.abs(transform.localScale.y);

        darknessRenderer._boundingBox.set(
            transform.localPosition.x - scaledWidth / 2,
            transform.localPosition.y - scaledHeight / 2,
            scaledWidth,
            scaledHeight,
        );
    }
}
