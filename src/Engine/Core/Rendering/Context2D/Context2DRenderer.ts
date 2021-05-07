import { Rectangle } from "../../../Math/Rectangle";
import { Vector2 } from "../../../Math/Vector2";
import { ShapeType } from "../../Collision/Shape/Shape";
import { CameraData } from "../CameraData";
import { IContextRenderer } from "../IContextRenderer";
import { ColliderRenderData } from "../RenderData/ColliderRenderData";
import { GeometricRenderData } from "../RenderData/GeometricRenderData";
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

    public render(camera: CameraData, renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(renderData as ImageRenderData, camera.zoom);
        }

        if (renderData.type === RenderDataType.Text) {
            this.renderText(renderData as TextRenderData);
        }

        if (renderData.type === RenderDataType.Geometric) {
            this.renderGeometric(renderData as GeometricRenderData, camera.zoom);
        }

        if (renderData.type === RenderDataType.Collider) {
            this.renderCollider(renderData as ColliderRenderData, camera.zoom);
        }
    }

    private renderImage(renderData: ImageRenderData, zoom: number): void {
        this.updateRenderPosition(renderData);

        this.imagePosition.set(0, 0);
        this.canvasContext.save();

        if (renderData.ui !== true) {
            this.canvasContext.setTransform(
                zoom,
                0,
                0,
                zoom,
                (this.canvas.width * (1 - zoom)) / 2, // todo: use camera viewport
                (this.canvas.height * (1 - zoom)) / 2
            );
        }

        if (renderData.rotation) {
            this.canvasContext.translate(
                renderData.positionInViewport.x + renderData.width / 2,
                renderData.positionInViewport.y + renderData.height / 2
            );
            this.imagePosition.set(-renderData.width / 2, -renderData.height / 2);
            this.canvasContext.rotate(-(renderData.rotation * Math.PI) / 180);
        } else {
            this.canvasContext.translate(renderData.positionInViewport.x, renderData.positionInViewport.y);
            this.imagePosition.set(
                renderData.flipHorizontal ? -renderData.width : this.imagePosition.x,
                renderData.flipVertical ? -renderData.height : this.imagePosition.y
            );
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

        this.canvasContext.font = renderData.fontSize + "px " + renderData.fontFamily;
        this.canvasContext.fillStyle = renderData.color;
        this.canvasContext.textBaseline = "middle";
        this.canvasContext.textAlign = renderData.pivot;

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

        if (renderData.ui !== true) {
            this.canvasContext.setTransform(
                zoom,
                0,
                0,
                zoom,
                (this.canvas.width * (1 - zoom)) / 2, // todo: use camera viewport
                (this.canvas.height * (1 - zoom)) / 2
            );
        }

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

        if (renderData.ui !== true) {
            this.canvasContext.setTransform(
                zoom,
                0,
                0,
                zoom,
                (this.canvas.width * (1 - zoom)) / 2, // todo: use camera viewport
                (this.canvas.height * (1 - zoom)) / 2
            );
        }

        this.updateRenderPosition(renderData);

        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = renderData.color;

        const shape = renderData.shape.clone();
        shape.position = renderData.positionInViewport;
        shape.update();

        switch (shape.type) {
            case ShapeType.Rectangle:
                this.canvasContext.moveTo(shape.vertices[0].x, shape.vertices[0].y);
                [1, 2, 3, 0].forEach((index: number) => {
                    this.canvasContext.lineTo(shape.vertices[index].x, shape.vertices[index].y);
                });
        }

        this.canvasContext.strokeStyle = renderData.color;
        this.canvasContext.stroke();

        this.canvasContext.closePath();
        this.canvasContext.restore();
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
