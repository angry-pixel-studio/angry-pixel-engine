import { Transform } from "@component/gameLogic/Transform";
import { TextRenderer } from "@component/render2d/TextRenderer";
import { SYSTEMS } from "@config/systemTypes";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { TextRenderData } from "@webgl";

@injectable(SYSTEMS.TextRendererSystem)
export class TextRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TextRenderer).forEach(({ entity, component: textRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("TextRenderer component needs a Transform");

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
            textRenderer._renderData.text = this.crop(textRenderer);
            textRenderer._renderData.orientation = textRenderer.orientation;
            textRenderer._renderData.color = textRenderer.color;
            textRenderer._renderData.lineSeparation = textRenderer.lineSeparation;
            textRenderer._renderData.letterSpacing = textRenderer.letterSpacing;
            textRenderer._renderData.smooth = textRenderer.smooth;
            textRenderer._renderData.rotation = transform.localRotation + textRenderer.rotation;
            textRenderer._renderData.opacity = textRenderer.opacity;
            textRenderer._renderData.bitmap.charRanges = textRenderer.charRanges;
            textRenderer._renderData.bitmap.margin = textRenderer.bitmapMargin;
            textRenderer._renderData.bitmap.spacing = textRenderer.bitmapSpacing;

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

    private crop({ fontSize, height, text, letterSpacing, width, lineSeparation }: TextRenderer): string {
        if (fontSize > height) return "";

        const croppedText: string[] = [];
        let croppedHeight = 0;

        for (const line of text.split("\n")) {
            const newLines = line.split(/(\s+)/).reduce(
                (lines, word) => {
                    const i = lines.length - 1;
                    const currentLine = lines[i] + word;
                    if (currentLine.length * (fontSize + letterSpacing) > width) lines.push(word);
                    else lines[i] = currentLine;
                    return lines;
                },
                [""],
            );

            for (const newLine of newLines) {
                croppedHeight += fontSize + lineSeparation;
                if (croppedHeight > height) return croppedText.join("\n");

                croppedText.push(newLine);
            }
        }

        return croppedText.join("\n");
    }
}
