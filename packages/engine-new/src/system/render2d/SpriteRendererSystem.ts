import { Transform } from "component/gameLogic/Transform";
import { SpriteRenderer } from "component/render2d/SpriteRenderer";
import { TYPES } from "config/types";
import { EntityManager, System } from "ecs";
import { inject } from "ioc";
import { RenderManager } from "manager/RenderManager";
import { Vector2 } from "math";
import { RenderDataType, SpriteRenderData } from "webgl";

export class SpriteRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(SpriteRenderer).forEach(({ component: spriteRenderer, entity }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("SpriteRenderer component needs a Transform");

            // The complete property determines if the image was loaded
            if (!spriteRenderer.image || !spriteRenderer.image.complete) return;

            this.scaledOffset.set(
                spriteRenderer.offset.x * transform.localScale.x,
                spriteRenderer.offset.y * transform.localScale.y,
            );

            const renderData: SpriteRenderData = {
                ...spriteRenderer,
                type: RenderDataType.Sprite,
                position: Vector2.add(spriteRenderer._position, transform.localPosition, this.scaledOffset),
                width:
                    (spriteRenderer.width ?? spriteRenderer.slice?.width ?? spriteRenderer.image.naturalWidth) *
                    Math.abs(spriteRenderer.scale.x * transform.localScale.x),
                height:
                    (spriteRenderer.height ?? spriteRenderer.slice?.height ?? spriteRenderer.image.naturalHeight) *
                    Math.abs(spriteRenderer.scale.y * transform.localScale.y),
                flipHorizontally: spriteRenderer.flipHorizontally !== transform.scale.x < 0,
                flipVertically: spriteRenderer.flipVertically !== transform.scale.y < 0,
                rotation: transform.localRotation + spriteRenderer.rotation,
            };

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            this.renderManager.addRenderData(renderData);
        });
    }

    private translateRenderPosition(renderData: SpriteRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
