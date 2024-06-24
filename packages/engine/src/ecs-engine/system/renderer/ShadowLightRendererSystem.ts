import { IShadowRenderData, IRenderManager, Light, RenderDataType, RenderLocation } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { Entity, IEntityManager, SearchResult } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { LightRenderer } from "../../component/renderer/LightRenderer";
import { Transform } from "../../component/Transform";
import { ShadowRenderer } from "../../component/renderer/ShadowRenderer";

export class ShadowLightRendererSystem extends System {
    // cache
    private renderData: Map<Entity, IShadowRenderData> = new Map();

    constructor(
        private entityManager: IEntityManager,
        private renderManager: IRenderManager,
    ) {
        super();
        this.group = SystemGroup.Render;
    }

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
                    ({ component: { _boundingBox, radius, smooth, intensity } }) =>
                        ({
                            position: _boundingBox.center,
                            radius,
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
        const { localPosition, localScale } = this.entityManager.getComponent(entity, Transform);
        const scaledRadius = lightRenderer.radius * Math.abs(Math.max(localScale.x, localScale.y));

        lightRenderer._boundingBox.set(
            localPosition.x - scaledRadius / 2,
            localPosition.y - scaledRadius / 2,
            scaledRadius,
            scaledRadius,
        );
    }

    private updatShadowRendererBoundingBox(entity: Entity, lightRenderer: ShadowRenderer): void {
        const { localPosition, localScale } = this.entityManager.getComponent(entity, Transform);
        const scaledWidth = lightRenderer.width * Math.abs(Math.max(localScale.x, localScale.y));
        const scaledHeight = lightRenderer.height * Math.abs(Math.max(localScale.x, localScale.y));

        lightRenderer._boundingBox.set(
            localPosition.x - scaledWidth / 2,
            localPosition.y - scaledHeight / 2,
            scaledWidth,
            scaledHeight,
        );
    }
}
