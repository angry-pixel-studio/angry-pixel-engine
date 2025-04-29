import { Transform } from "@component/gameLogic/Transform";
import { SpriteRenderer } from "@component/render2d/SpriteRenderer";
import { SYSTEMS } from "@config/systemTypes";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { SpriteRenderData } from "@webgl";

@injectable(SYSTEMS.SpriteRendererSystem)
export class SpriteRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
        @inject(TYPES.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(SpriteRenderer).forEach(({ component: spriteRenderer, entity }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("SpriteRenderer component needs a Transform");

            if (typeof spriteRenderer.image === "string") {
                spriteRenderer.image = this.assetManager.getImage(spriteRenderer.image);
                if (!spriteRenderer.image) throw new Error(`Asset ${spriteRenderer.image} not found`);
            }

            // The complete property determines if the image was loaded
            if (!spriteRenderer.image || !spriteRenderer.image.complete) return;

            this.scaledOffset.set(
                spriteRenderer.offset.x * transform.localScale.x,
                spriteRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(spriteRenderer._renderData.position, transform.localPosition, this.scaledOffset);

            spriteRenderer._renderData.width =
                (spriteRenderer.width ?? spriteRenderer.slice?.width ?? spriteRenderer.image.naturalWidth) *
                Math.abs(spriteRenderer.scale.x * transform.localScale.x);

            spriteRenderer._renderData.height =
                (spriteRenderer.height ?? spriteRenderer.slice?.height ?? spriteRenderer.image.naturalHeight) *
                Math.abs(spriteRenderer.scale.y * transform.localScale.y);

            spriteRenderer._renderData.flipHorizontally = spriteRenderer.flipHorizontally !== transform.scale.x < 0;
            spriteRenderer._renderData.flipVertically = spriteRenderer.flipVertically !== transform.scale.y < 0;

            spriteRenderer._renderData.rotation = transform.localRotation + spriteRenderer.rotation;

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(spriteRenderer._renderData, transform);
            }

            spriteRenderer._renderData.image = spriteRenderer.image;
            spriteRenderer._renderData.layer = spriteRenderer.layer;
            spriteRenderer._renderData.maskColor = spriteRenderer.maskColor;
            spriteRenderer._renderData.maskColorMix = spriteRenderer.maskColorMix;
            spriteRenderer._renderData.opacity = spriteRenderer.opacity;
            spriteRenderer._renderData.slice = spriteRenderer.slice;
            spriteRenderer._renderData.smooth = spriteRenderer.smooth;
            spriteRenderer._renderData.tintColor = spriteRenderer.tintColor;
            spriteRenderer._renderData.tiled = spriteRenderer.tiled;

            this.renderManager.addRenderData(spriteRenderer._renderData);
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
