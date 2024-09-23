import { IMaskRenderData, IRenderManager, RenderDataType, RenderLocation } from "../../../2d-renderer";

import { Vector2 } from "../../../math";
import { MaskRenderer } from "../../component/renderer/MaskRenderer";
import { Transform } from "../../component/Transform";
import { System } from "../../../ecs/SystemManager";
import { Entity, EntityManager } from "../../../ecs/EntityManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../../config/types";

export class MaskRendererSystem implements System {
    private readonly renderData: Map<Entity, IMaskRenderData> = new Map();
    private entitiesUpdated: Entity[];
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
    ) {}

    public onCreate(): void {}

    public onUpdate(): void {
        this.entitiesUpdated = [];

        this.entityManager.search(MaskRenderer).forEach(({ entity, component: maskRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("MaskRenderer component needs a Transform");

            const renderData = this.getOrCreate(entity);

            this.scaledOffset.set(
                maskRenderer.offset.x * transform.localScale.x,
                maskRenderer.offset.y * transform.localScale.y,
            );
            Vector2.add(renderData.position, transform.localPosition, this.scaledOffset);

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            renderData.shape = maskRenderer.shape;
            renderData.layer = maskRenderer.layer;
            renderData.width = maskRenderer.width * Math.abs(transform.localScale.x);
            renderData.height = maskRenderer.height * Math.abs(transform.localScale.y);
            renderData.rotation = transform.localRotation + maskRenderer.rotation;
            renderData.radius =
                maskRenderer.radius * Math.abs(Math.max(transform.localScale.x, transform.localScale.y));
            renderData.color = maskRenderer.color;
            renderData.alpha = maskRenderer.opacity; // TODO: unify names

            this.entitiesUpdated.push(entity);
        });

        for (const entity of this.renderData.keys()) {
            if (!this.entitiesUpdated.includes(entity)) this.renderData.delete(entity);
            else this.renderManager.addRenderData(this.renderData.get(entity));
        }
    }

    private getOrCreate(entity: Entity): IMaskRenderData {
        if (!this.renderData.has(entity)) {
            this.renderData.set(entity, {
                type: RenderDataType.Mask,
                location: RenderLocation.WorldSpace, // TODO: remove this from the renderer
                layer: undefined,
                position: new Vector2(),
                color: undefined,
                shape: undefined,
            });
        }

        return this.renderData.get(entity);
    }

    private translateRenderPosition(renderData: IMaskRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
