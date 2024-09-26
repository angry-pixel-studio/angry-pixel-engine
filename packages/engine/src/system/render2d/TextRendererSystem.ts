import { Transform } from "@component/gameLogic/Transform";
import { TextRenderer } from "@component/render2d/TextRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { RenderDataType, TextRenderData } from "@webgl";

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

            const renderData: TextRenderData = {
                type: RenderDataType.Text,
                layer: textRenderer.layer,
                position: Vector2.add(textRenderer._position, transform.localPosition, this.scaledOffset),
                font: textRenderer.font,
                fontSize: textRenderer.fontSize,
                text: this.crop(textRenderer),
                orientation: textRenderer.orientation,
                color: textRenderer.color,
                lineSeparation: textRenderer.lineSeparation,
                letterSpacing: textRenderer.letterSpacing,
                smooth: textRenderer.smooth,
                rotation: transform.localRotation + textRenderer.rotation,
                opacity: textRenderer.opacity,
                bitmap: {
                    fontSize: undefined,
                    charRanges: textRenderer.charRanges,
                    margin: textRenderer.bitmapMargin,
                    spacing: textRenderer.bitmapSpacing,
                },
            };

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            this.renderManager.addRenderData(renderData);
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
