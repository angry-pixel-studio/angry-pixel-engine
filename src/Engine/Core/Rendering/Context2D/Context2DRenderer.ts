import Rectangle from "../../../Libs/Geometric/Shapes/Rectangle";
import Vector2 from "../../../Helper/Vector2";
import IContextRenderer from "../IContextRenderer";
import GeometricRenderData, { GEOMETRIC_POLYGON, GEOMETRIC_RECTANGLE } from "../RenderData/GeometricRenderData";
import ImageRenderData from "../RenderData/ImageRenderData";
import RenderData, { RenderDataType } from "../RenderData/RenderData";
import TextRenderData from "../RenderData/TextRenderData";

const DEFAULT_COLOR: string = "#000000";

export default class Context2DRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement = null;
    private canvasContext: CanvasRenderingContext2D = null;

    private renderPosition: Vector2 = new Vector2(0, 0);
    private imagePosition: Vector2 = new Vector2(0, 0);
    private cacheRect: Rectangle = new Rectangle(0, 0, 0, 0);

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

    public render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(renderData as ImageRenderData, renderData.ui === true ? viewportRect : worldSpaceViewRect);
        }

        if (renderData.type === RenderDataType.Text && renderData.ui === true) {
            this.renderText(renderData as TextRenderData, viewportRect);
        }

        if (renderData.type === RenderDataType.Geometric) {
            this.renderGeometric(
                renderData as GeometricRenderData,
                renderData.ui === true ? viewportRect : worldSpaceViewRect
            );
        }
    }

    private renderImage(renderData: ImageRenderData, viewRect: Rectangle): void {
        if (this.isInsideViewRect(renderData, viewRect) === false) {
            return;
        }

        this.updateRenderPosition(renderData, viewRect);
        this.imagePosition.set(0, 0);
        this.canvasContext.save();

        if (renderData.rotation) {
            this.canvasContext.translate(
                this.renderPosition.x + renderData.width / 2,
                this.renderPosition.y + renderData.height / 2
            );
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-(renderData.rotation * Math.PI) / 180);
        } else {
            this.canvasContext.translate(this.renderPosition.x, this.renderPosition.y);
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

    private renderText(renderData: TextRenderData, viewRect: Rectangle): void {
        this.updateRenderPosition(renderData, viewRect);

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
            let first = true;
            let lineSeparation = 0;

            renderData.text.forEach((text) => {
                lineSeparation = first ? lineSeparation : renderData.lineSeparation + renderData.textSize;

                this.canvasContext.fillText(text, this.renderPosition.x, this.renderPosition.y + lineSeparation);

                first = false;
            });
        } else {
            this.canvasContext.fillText(renderData.text, this.renderPosition.x, this.renderPosition.y);
        }

        this.canvasContext.restore();
    }

    private renderGeometric(renderData: GeometricRenderData, viewRect: Rectangle): void {
        this.canvasContext.save();

        this.updateRenderPosition(renderData, viewRect);

        switch (renderData.geometricType) {
            case GEOMETRIC_RECTANGLE:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.strokeRect(
                    this.renderPosition.x,
                    this.renderPosition.y,
                    renderData.geometric.width,
                    renderData.geometric.height * -1
                );
                break;
            case GEOMETRIC_POLYGON:
                this.canvasContext.strokeStyle = renderData.color;

                this.canvasContext.beginPath();
                this.canvasContext.moveTo(
                    renderData.geometric[0].x - viewRect.x,
                    viewRect.y - renderData.geometric[0].y
                );
                this.canvasContext.lineTo(
                    renderData.geometric[1].x - viewRect.x,
                    viewRect.y - renderData.geometric[1].y
                );
                this.canvasContext.lineTo(
                    renderData.geometric[3].x - viewRect.x,
                    viewRect.y - renderData.geometric[3].y
                );
                this.canvasContext.lineTo(
                    renderData.geometric[2].x - viewRect.x,
                    viewRect.y - renderData.geometric[2].y
                );
                this.canvasContext.closePath();
                this.canvasContext.stroke();

                break;
        }

        this.canvasContext.restore();
    }

    private isInsideViewRect(renderData: ImageRenderData, viewRect: Rectangle): boolean {
        this.cacheRect.set(renderData.position.x, renderData.position.y, renderData.width, renderData.height);

        return viewRect.overlappingRectangle(this.cacheRect);
    }

    private updateRenderPosition(renderData: RenderData, viewRect: Rectangle) {
        this.renderPosition.x = renderData.position.x;
        this.renderPosition.y = renderData.position.y;

        if (renderData.type === RenderDataType.Image) {
            this.centerImage(renderData as ImageRenderData);
        }

        this.renderPosition.x = Number((this.renderPosition.x - viewRect.x).toFixed(0));
        this.renderPosition.y = Number((viewRect.y - this.renderPosition.y).toFixed(0));
    }

    private centerImage(renderData: ImageRenderData) {
        this.renderPosition.x -= Math.floor(renderData.width / 2);
        this.renderPosition.y += Math.floor(renderData.height / 2);
    }
}
