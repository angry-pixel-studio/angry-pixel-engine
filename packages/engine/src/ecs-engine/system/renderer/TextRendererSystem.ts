import { IRenderManager, ITextRenderData, RenderDataType, RenderLocation } from "../../../2d-renderer";
import { Entity, EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { Vector2 } from "../../../math";
import { Transform } from "../../component/Transform";
import { TextRenderer } from "../../component/renderer/TextRenderer";

export class TextRendererSystem implements System {
    private readonly renderData: Map<Entity, ITextRenderData> = new Map();
    private entitiesUpdated: Entity[];
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        private entityManager: EntityManager,
        private renderManager: IRenderManager,
    ) {}

    public onUpdate(): void {
        this.entitiesUpdated = [];

        this.entityManager.search(TextRenderer).forEach(({ entity, component: textRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("TextRenderer component needs a Transform");

            if (
                textRenderer.text.length === 0 ||
                (textRenderer.font instanceof FontFace && textRenderer.font.status !== "loaded")
            ) {
                return;
            }

            const renderData = this.getOrCreate(entity);

            this.scaledOffset.set(
                textRenderer.offset.x * transform.localScale.x,
                textRenderer.offset.y * transform.localScale.y,
            );
            Vector2.add(renderData.position, transform.localPosition, this.scaledOffset);

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(renderData, transform);
            }

            renderData.layer = textRenderer.layer;
            renderData.font = textRenderer.font;
            renderData.fontSize = textRenderer.fontSize;
            renderData.text = this.crop(textRenderer);
            renderData.orientation = textRenderer.orientation;
            renderData.color = textRenderer.color;
            renderData.lineSeparation = textRenderer.lineSeparation;
            renderData.letterSpacing = textRenderer.letterSpacing;
            renderData.smooth = textRenderer.smooth;
            renderData.rotation = transform.localRotation + textRenderer.rotation;
            renderData.alpha = textRenderer.opacity; // unify names

            renderData.bitmap.charRanges = textRenderer.charRanges;
            renderData.bitmap.margin = textRenderer.bitmapMargin;
            renderData.bitmap.spacing = textRenderer.bitmapSpacing;

            this.entitiesUpdated.push(entity);
        });

        for (const entity of this.renderData.keys()) {
            if (!this.entitiesUpdated.includes(entity)) this.renderData.delete(entity);
            else this.renderManager.addRenderData(this.renderData.get(entity));
        }
    }

    private getOrCreate(entity: Entity): ITextRenderData {
        if (!this.renderData.has(entity)) {
            this.renderData.set(entity, {
                type: RenderDataType.Text,
                location: RenderLocation.WorldSpace, // TODO: remove this from the renderer
                layer: undefined,
                position: new Vector2(),
                font: undefined,
                fontSize: undefined,
                text: undefined,
                bitmap: {
                    charRanges: undefined,
                    margin: undefined,
                    spacing: undefined,
                },
            });
        }

        return this.renderData.get(entity);
    }

    private translateRenderPosition(renderData: ITextRenderData, transform: Transform): void {
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
