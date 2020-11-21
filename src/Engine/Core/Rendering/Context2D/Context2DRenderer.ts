import { Rectangle } from "../../../Libs/Geometric/Shapes/Rectangle";
import { Vector2 } from "../../../Helper/Vector2";
import { IContextRenderer } from "../IContextRenderer";
import { GeometricRenderData, GEOMETRIC_POLYGON, GEOMETRIC_RECTANGLE } from "../RenderData/GeometricRenderData";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { TextRenderData } from "../RenderData/TextRenderData";

export class Context2DRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement = null;
    private canvasContext: CanvasRenderingContext2D = null;

    private imagePosition: Vector2 = new Vector2(0, 0);

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
    }

    public clearCanvas(color: string | null = null): void {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (color !== null) {
            this.canvasContext.fillStyle = color;
            this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public render(renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(renderData as ImageRenderData);
        }

        if (renderData.type === RenderDataType.Text) {
            this.renderText(renderData as TextRenderData);
        }

        if (renderData.type === RenderDataType.Geometric) {
            this.renderGeometric(renderData as GeometricRenderData);
        }
    }

    private renderImage(renderData: ImageRenderData): void {
        this.updateRenderPosition(renderData);

        this.imagePosition.set(0, 0);
        this.canvasContext.save();

        if (renderData.rotation) {
            this.canvasContext.translate(
                renderData.viewportPosition.x + renderData.width / 2,
                renderData.viewportPosition.y + renderData.height / 2
            );
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-(renderData.rotation * Math.PI) / 180);
        } else {
            this.canvasContext.translate(renderData.viewportPosition.x, renderData.viewportPosition.y);
            this.imagePosition.x = renderData.flipHorizontal ? -renderData.width : this.imagePosition.x;
            this.imagePosition.y = renderData.flipVertical ? -renderData.height : this.imagePosition.y;
        }

        this.canvasContext.imageSmoothingEnabled = renderData.smooth;

        this.canvasContext.scale(renderData.flipHorizontal ? -1 : 1, renderData.flipVertical ? -1 : 1);

        if (renderData.slice !== undefined && renderData.slice !== null) {
            this.canvasContext.drawImage(
                renderData.image,
                renderData.slice.x,
                renderData.slice.y,
                renderData.slice.width,
                renderData.slice.height,
                this.imagePosition.x,
                this.imagePosition.y,
                renderData.width,
                renderData.height
            );
        } else {
            this.canvasContext.drawImage(
                renderData.image,
                this.imagePosition.x,
                this.imagePosition.y,
                renderData.width,
                renderData.height
            );
        }

        this.canvasContext.restore();
    }

    private renderText(renderData: TextRenderData): void {
        this.updateRenderPosition(renderData);

        this.canvasContext.save();

        const font = [
            renderData.bold ? "bold" : "",
            renderData.italic ? "italic" : "",
            renderData.textSize + "px",
            renderData.font,
        ];

        this.canvasContext.font = font.join(" ");
        this.canvasContext.fillStyle = renderData.color;
        this.canvasContext.textBaseline = "middle";

        if (Array.isArray(renderData.text)) {
            renderData.text.forEach((text: string, index: number) => {
                this.canvasContext.fillText(
                    text,
                    renderData.viewportPosition.x,
                    renderData.viewportPosition.y + (renderData.lineSeparation + renderData.textSize) * index
                );
            });
        } else {
            this.canvasContext.fillText(renderData.text, renderData.viewportPosition.x, renderData.viewportPosition.y);
        }

        this.canvasContext.restore();
    }

    private renderGeometric(renderData: GeometricRenderData): void {
        this.canvasContext.save();

        this.updateRenderPosition(renderData);

        switch (renderData.geometricType) {
            case GEOMETRIC_RECTANGLE:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.strokeRect(
                    renderData.viewportPosition.x,
                    renderData.viewportPosition.y,
                    renderData.geometric.width,
                    renderData.geometric.height
                );
                break;
            case GEOMETRIC_POLYGON:
                break;
        }

        this.canvasContext.restore();
    }

    private updateRenderPosition(renderData: RenderData) {
        if (renderData.type === RenderDataType.Image) {
            this.centerImage(renderData as ImageRenderData);
        }

        renderData.viewportPosition.x = Number((renderData.viewportPosition.x + this.canvas.width / 2).toFixed(0));
        renderData.viewportPosition.y = Number((this.canvas.height / 2 - renderData.viewportPosition.y).toFixed(0));
    }

    private centerImage(renderData: ImageRenderData) {
        renderData.viewportPosition.x -= Math.floor(renderData.width / 2);
        renderData.viewportPosition.y += Math.floor(renderData.height / 2);
    }
}
