import { Transform } from "@component/gameLogic/Transform";
import { TextRenderer } from "@component/render2d/TextRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { AssetManager } from "@manager/AssetManager";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@angry-pixel/math";
import { TextRenderData } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.TextRendererSystem)
export class TextRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TextRenderer).forEach(({ entity, component: textRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("TextRenderer component needs a Transform");

            if (typeof textRenderer.font === "string") {
                const font = this.assetManager.getFont(textRenderer.font);
                if (font) textRenderer.font = font;
            }

            if (
                textRenderer.text.length === 0 ||
                (textRenderer.font instanceof FontFace && textRenderer.font.status !== "loaded")
            ) {
                return;
            }

            this.scaledOffset.set(
                textRenderer.offset.x * transform.localScale.x,
                textRenderer.offset.y * transform.localScale.y,
            );
            Vector2.add(textRenderer._renderData.position, transform.localPosition, this.scaledOffset);

            textRenderer._renderData.layer = textRenderer.layer;
            textRenderer._renderData.font = textRenderer.font;
            textRenderer._renderData.fontSize = textRenderer.fontSize;
            textRenderer._renderData.text = textRenderer.text;
            textRenderer._renderData.color = textRenderer.color;
            textRenderer._renderData.lineHeight = textRenderer.lineHeight ?? textRenderer.fontSize;
            textRenderer._renderData.letterSpacing = textRenderer.letterSpacing;
            textRenderer._renderData.smooth = textRenderer.smooth;
            textRenderer._renderData.rotation = transform.localRotation + textRenderer.rotation;
            textRenderer._renderData.opacity = textRenderer.opacity;
            textRenderer._renderData.boundingBox = { width: textRenderer.width, height: textRenderer.height };
            textRenderer._renderData.alignment = textRenderer.alignment;

            const { charRanges, fontSize, spacing } = textRenderer.textureAtlas;

            if (charRanges) textRenderer._renderData.textureAtlas.charRanges = textRenderer.textureAtlas.charRanges;
            if (fontSize) textRenderer._renderData.textureAtlas.fontSize = textRenderer.textureAtlas.fontSize;
            if (spacing) textRenderer._renderData.textureAtlas.spacing = textRenderer.textureAtlas.spacing;

            textRenderer._renderData.flipHorizontally = textRenderer.flipHorizontally;
            textRenderer._renderData.flipVertically = textRenderer.flipVertically;

            textRenderer._renderData.shadow = textRenderer.shadow;

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(textRenderer._renderData, transform);
            }

            this.renderManager.addRenderData(textRenderer._renderData);
        });
    }

    private translateRenderPosition(renderData: TextRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
