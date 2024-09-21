import { IRenderManager, ISpriteRenderData, RenderDataType, RenderLocation } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { SpriteRenderer } from "../../component/renderer/SpriteRenderer";
import { Transform } from "../../component/Transform";
import { System } from "../../../ecs/SystemManager";
import { Entity, EntityManager } from "../../../ecs/EntityManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../config/types";

export class SpriteRendererSystem implements System {
    private readonly renderData: Map<Entity, ISpriteRenderData> = new Map();
    private entitiesUpdated: Entity[];
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
    ) {}

    public onUpdate(): void {
        this.entitiesUpdated = [];

        this.entityManager.search(SpriteRenderer).forEach(({ entity, component: spriteRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("SpriteRenderer component needs a Transform");

            // The complete property determines if the image was loaded
            if (!spriteRenderer.image || !spriteRenderer.image.complete) return;

            const renderData = this.getOrCreate(entity);

            this.scaledOffset.set(
                spriteRenderer.offset.x * transform.localScale.x,
                spriteRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(renderData.position, transform.localPosition, this.scaledOffset);

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            renderData.layer = spriteRenderer.layer;
            renderData.image = spriteRenderer.image;
            renderData.width =
                (spriteRenderer.width ?? spriteRenderer.slice?.width ?? spriteRenderer.image.naturalWidth) *
                Math.abs(spriteRenderer.scale.x * transform.localScale.x);
            renderData.height =
                (spriteRenderer.height ?? spriteRenderer.slice?.height ?? spriteRenderer.image.naturalHeight) *
                Math.abs(spriteRenderer.scale.y * transform.localScale.y);
            renderData.slice = spriteRenderer.slice;
            renderData.flipHorizontal = spriteRenderer.flipHorizontally !== transform.scale.x < 0;
            renderData.flipVertical = spriteRenderer.flipVertically !== transform.scale.y < 0;
            renderData.rotation = transform.localRotation + spriteRenderer.rotation;
            renderData.smooth = spriteRenderer.smooth;
            renderData.alpha = spriteRenderer.opacity; // TODO: unify names
            renderData.maskColor = spriteRenderer.maskColor;
            renderData.maskColorMix = spriteRenderer.maskColorMix;
            renderData.tintColor = spriteRenderer.tintColor;

            this.entitiesUpdated.push(entity);
        });

        for (const entity of this.renderData.keys()) {
            if (!this.entitiesUpdated.includes(entity)) this.renderData.delete(entity);
            else this.renderManager.addRenderData(this.renderData.get(entity));
        }
    }

    private getOrCreate(entity: Entity): ISpriteRenderData {
        if (!this.renderData.has(entity)) {
            this.renderData.set(entity, {
                type: RenderDataType.Sprite,
                location: RenderLocation.WorldSpace, // TODO: remove this from the renderer
                layer: undefined,
                image: undefined,
                width: undefined,
                height: undefined,
                position: new Vector2(),
            });
        }

        return this.renderData.get(entity);
    }

    private translateRenderPosition(renderData: ISpriteRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
