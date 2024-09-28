import { Transform } from "@component/gameLogic/Transform";
import { MaskRenderer } from "@component/render2d/MaskRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { MaskRenderData } from "@webgl";

@injectable(SYSTEMS.MaskRendererSystem)
export class MaskRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(MaskRenderer).forEach(({ entity, component: maskRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("MaskRenderer component needs a Transform");

            this.scaledOffset.set(
                maskRenderer.offset.x * transform.localScale.x,
                maskRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(maskRenderer._renderData.position, transform.localPosition, this.scaledOffset);
            maskRenderer._renderData.width = maskRenderer.width * Math.abs(transform.localScale.x);
            maskRenderer._renderData.height = maskRenderer.height * Math.abs(transform.localScale.y);
            maskRenderer._renderData.rotation = transform.localRotation + maskRenderer.rotation;
            maskRenderer._renderData.color = maskRenderer.color;
            maskRenderer._renderData.layer = maskRenderer.layer;
            maskRenderer._renderData.opacity = maskRenderer.opacity;
            maskRenderer._renderData.radius =
                maskRenderer.radius * Math.max(Math.abs(transform.localScale.x), Math.abs(transform.localScale.y));
            maskRenderer._renderData.shape = maskRenderer.shape;

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(maskRenderer._renderData, transform);
            }

            this.renderManager.addRenderData(maskRenderer._renderData);
        });
    }

    private translateRenderPosition(renderData: MaskRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
