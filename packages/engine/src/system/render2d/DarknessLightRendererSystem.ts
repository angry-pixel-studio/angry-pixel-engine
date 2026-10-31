import { Transform } from "@component/gameLogic/Transform";
import { LightRenderer } from "@component/render2d/LightRenderer";
import { DarknessRenderer } from "@component/render2d/DarknessRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { Entity, EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEM_SYMBOLS.DarknessLightRendererSystem)
export class DarknessLightRendererSystem implements System {
    private readonly lightRenderers: LightRenderer[] = [];

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.lightRenderers.length = 0;
        this.entityManager.search(LightRenderer, this.processLightRenderer);
        this.entityManager.search(DarknessRenderer, this.processDarknessRenderer);
    }

    private readonly processLightRenderer = (lightRenderer: LightRenderer, entity: Entity): void => {
        this.updateLightRendererBoundingBox(entity, lightRenderer);
        this.lightRenderers.push(lightRenderer);
    };

    private readonly processDarknessRenderer = (darknessRenderer: DarknessRenderer, entity: Entity): void => {
        this.updateDarknessRendererBoundingBox(entity, darknessRenderer);

        darknessRenderer._renderData.layer = darknessRenderer.layer;
        darknessRenderer._renderData.color = darknessRenderer.color;
        darknessRenderer._renderData.opacity = darknessRenderer.opacity;
        darknessRenderer._renderData.width = darknessRenderer._boundingBox.width;
        darknessRenderer._renderData.height = darknessRenderer._boundingBox.height;
        darknessRenderer._renderData.position = darknessRenderer._boundingBox.center;
        darknessRenderer._renderData.rotation = 0;

        this.updateLights(darknessRenderer);

        this.renderManager.addRenderData(darknessRenderer._renderData);
    };

    private updateLights(darknessRenderer: DarknessRenderer): void {
        const lights = darknessRenderer._renderData.lights;
        let count = 0;

        for (let i = 0; i < this.lightRenderers.length; i++) {
            const lightRenderer = this.lightRenderers[i];

            if (
                lightRenderer.layer !== darknessRenderer.layer ||
                !lightRenderer._boundingBox.intersects(darknessRenderer._boundingBox)
            ) {
                continue;
            }

            // light objects are reused between frames, only new ones are allocated
            if (count === lights.length) {
                lights.push({
                    position: undefined,
                    radius: 0,
                    smooth: false,
                    steps: 0,
                    intensity: 0,
                    color: undefined,
                });
            }

            const light = lights[count++];
            light.position = lightRenderer._boundingBox.center;
            light.radius = lightRenderer._boundingBox.width / 2;
            light.smooth = lightRenderer.smooth;
            light.steps = lightRenderer.steps;
            light.intensity = lightRenderer.intensity;
            light.color = lightRenderer.color;
        }

        lights.length = count;
    }

    private updateLightRendererBoundingBox(entity: Entity, lightRenderer: LightRenderer): void {
        const transform = this.entityManager.getComponent(entity, Transform);
        if (!transform) throw new Error("LightRenderer component needs a Transform");

        const scaledRadius =
            lightRenderer.radius * Math.max(Math.abs(transform.localScale.x), Math.abs(transform.localScale.y));

        lightRenderer._boundingBox.set(
            transform.localPosition.x - scaledRadius,
            transform.localPosition.y - scaledRadius,
            scaledRadius * 2,
            scaledRadius * 2,
        );
    }

    private updateDarknessRendererBoundingBox(entity: Entity, darknessRenderer: DarknessRenderer): void {
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
