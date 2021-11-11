import { Rectangle } from "../../math/Rectangle";
import { Vector2 } from "../../math/Vector2";
import { ShapeType } from "../../physics/collision/shape/Shape"; // TODO: resolve dependency
import { CameraData } from "../CameraData";
import { ContextRenderer } from "../ContextRenderer";
import { ColliderRenderData } from "../renderData/ColliderRenderData";
import { GeometricRenderData } from "../renderData/GeometricRenderData";
import { ImageRenderData } from "../renderData/ImageRenderData";
import { RenderData, RenderDataType } from "../renderData/RenderData";
import { TextRenderData } from "../renderData/TextRenderData";
import { TilemapRenderData, TileRenderData } from "../renderData/TilemapRenderData";

export class Context2DRenderer implements ContextRenderer {
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

    public render(camera: CameraData, renderData: RenderData): void {
        switch (renderData.type) {
            case RenderDataType.Image:
                this.renderImage(renderData as ImageRenderData, camera.zoom);
                break;
            case RenderDataType.Tilemap:
                this.renderTilemap(renderData as TilemapRenderData, camera.zoom);
                break;
            case RenderDataType.Text:
                this.renderText(renderData as TextRenderData);
                break;
            case RenderDataType.Geometric:
                this.renderGeometric(renderData as GeometricRenderData, camera.zoom);
                break;
            case RenderDataType.Collider:
                this.renderCollider(renderData as ColliderRenderData, camera.zoom);
                break;
        }
    }

    private renderImage(renderData: ImageRenderData, zoom: number): void {
        this.updateRenderPosition(renderData);

        this.imagePosition.set(0, 0);
        this.canvasContext.save();

        this.applyZoom(renderData, zoom);

        if (renderData.rotation !== 0) {
            this.canvasContext.translate(
                renderData.positionInViewport.x + renderData.width / 2,
                renderData.positionInViewport.y + renderData.height / 2
            );
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-renderData.rotation);
        } else {
            this.canvasContext.translate(renderData.positionInViewport.x, renderData.positionInViewport.y);
            this.imagePosition.set(
                renderData.flipHorizontal ? -renderData.width : this.imagePosition.x,
                renderData.flipVertical ? -renderData.height : this.imagePosition.y
            );
        }

        this.canvasContext.globalAlpha = renderData.alpha;
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

    private renderTilemap(renderData: TilemapRenderData, zoom: number): void {
        renderData.tilesToRender.forEach((data: TileRenderData) => {
            this.canvasContext.save();
            this.applyZoom(renderData, zoom);

            this.imagePosition.set(0, 0);

            this.canvasContext.translate(
                this.canvas.width / 2 + data.positionInViewport.x - renderData.tileWidth / 2,
                this.canvas.height / 2 - data.positionInViewport.y - renderData.tileHeight / 2
            );
            this.imagePosition.set(
                data.flipHorizontal ? -data.tile.width : this.imagePosition.x,
                data.flipVertical ? -data.tile.height : this.imagePosition.y
            );

            this.canvasContext.globalAlpha = renderData.alpha;
            this.canvasContext.imageSmoothingEnabled = renderData.smooth;
            this.canvasContext.scale(data.flipHorizontal ? -1 : 1, data.flipVertical ? -1 : 1);

            this.canvasContext.drawImage(
                renderData.image,
                data.tile.x,
                data.tile.y,
                data.tile.width,
                data.tile.height,
                this.imagePosition.x,
                this.imagePosition.y,
                renderData.tileWidth,
                renderData.tileHeight
            );
            this.canvasContext.restore();
        });
    }

    private renderText(renderData: TextRenderData): void {
        this.updateRenderPosition(renderData);

        this.canvasContext.save();

        this.canvasContext.font = renderData.fontSize + "px " + renderData.fontFamily;
        this.canvasContext.fillStyle = renderData.color;
        this.canvasContext.textBaseline = "middle";

        if (renderData.text.split("\n").length > 1) {
            renderData.text.split("\n").forEach((text: string, index: number) => {
                this.canvasContext.fillText(
                    text,
                    renderData.positionInViewport.x,
                    renderData.positionInViewport.y + (renderData.lineSeparation + renderData.fontSize) * index
                );
            });
        } else {
            this.canvasContext.fillText(
                renderData.text,
                renderData.positionInViewport.x,
                renderData.positionInViewport.y
            );
        }

        this.canvasContext.restore();
    }

    private renderGeometric(renderData: GeometricRenderData, zoom: number): void {
        this.canvasContext.save();

        this.applyZoom(renderData, zoom);

        this.updateRenderPosition(renderData);

        if (renderData.geometricType === "Rectangle") {
            this.canvasContext.strokeStyle = renderData.color;
            this.canvasContext.strokeRect(
                renderData.positionInViewport.x - renderData.getGeometric<Rectangle>().width / 2,
                renderData.positionInViewport.y - renderData.getGeometric<Rectangle>().height / 2,
                renderData.getGeometric<Rectangle>().width,
                renderData.getGeometric<Rectangle>().height
            );
        }

        this.canvasContext.restore();
    }

    private renderCollider(renderData: ColliderRenderData, zoom: number): void {
        this.canvasContext.save();

        this.applyZoom(renderData, zoom);

        this.updateRenderPosition(renderData);

        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = renderData.color;

        if (renderData.shape.angle !== 0) {
            this.canvasContext.translate(renderData.positionInViewport.x, renderData.positionInViewport.y);
            this.canvasContext.rotate(-renderData.shape.angle);
            this.imagePosition.set(-renderData.shape.width / 2, -renderData.shape.height / 2);
        } else {
            this.canvasContext.translate(
                renderData.positionInViewport.x - renderData.shape.width / 2,
                renderData.positionInViewport.y - renderData.shape.height / 2
            );
            this.imagePosition.set(0, 0);
        }

        switch (renderData.shape.type) {
            case ShapeType.Rectangle:
                this.canvasContext.strokeRect(
                    this.imagePosition.x,
                    this.imagePosition.y,
                    renderData.shape.width,
                    renderData.shape.height
                );
        }

        this.canvasContext.restore();
    }

    private applyZoom(renderData: RenderData, zoom: number): void {
        if (!renderData.ui) {
            this.canvasContext.setTransform(
                zoom,
                0,
                0,
                zoom,
                (this.canvas.width * (1 - zoom)) / 2, // todo: use camera viewport
                (this.canvas.height * (1 - zoom)) / 2
            );
        }
    }

    private updateRenderPosition(renderData: RenderData) {
        if (renderData.type === RenderDataType.Image) {
            this.centerImage(renderData as ImageRenderData);
        }

        renderData.positionInViewport.set(
            Number((renderData.positionInViewport.x + this.canvas.width / 2).toFixed(0)),
            Number((this.canvas.height / 2 - renderData.positionInViewport.y).toFixed(0))
        );
    }

    private centerImage(renderData: ImageRenderData) {
        renderData.positionInViewport.set(
            renderData.positionInViewport.x - Math.floor(renderData.width / 2),
            renderData.positionInViewport.y + Math.floor(renderData.height / 2)
        );
    }
}
