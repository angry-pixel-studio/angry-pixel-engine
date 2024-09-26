import { Transform } from "@component/gameLogic/Transform";
import { MaskRenderer } from "@component/render2d/MaskRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { MaskRenderData, RenderDataType } from "@webgl";

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

            const renderData: MaskRenderData = {
                ...maskRenderer,
                type: RenderDataType.Sprite,
                position: Vector2.add(maskRenderer._position, transform.localPosition, this.scaledOffset),
                width: maskRenderer.width * Math.abs(transform.localScale.x),
                height: maskRenderer.height * Math.abs(transform.localScale.y),
                rotation: transform.localRotation + maskRenderer.rotation,
            };

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            this.renderManager.addRenderData(renderData);
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
