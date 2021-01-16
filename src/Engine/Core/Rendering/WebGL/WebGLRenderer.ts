import { Vector2 } from "../../../Math/Vector2";
import { CameraData } from "../CameraData";
import { IContextRenderer } from "../IContextRenderer";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { TextRenderData } from "../RenderData/TextRenderData";
import { WebGLImageRenderer } from "./WebGLImageRenderer";

export class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private imageRenderer: WebGLImageRenderer;

    private canvas2D: HTMLCanvasElement;
    private context2D: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement, imageRenderer: WebGLImageRenderer) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");
        this.imageRenderer = imageRenderer;

        this.canvas2D = document.createElement("canvas");
        this.context2D = this.canvas2D.getContext("2d");
        //document.getElementById("app").appendChild(this.canvas2D);
    }

    public clearCanvas(color: string): void {
        const rgb = this.hexToRgb(color);

        this.gl.clearColor(rgb.r, rgb.g, rgb.b, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result: string[] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result
            ? {
                  r: parseInt(result[1], 16) / 256,
                  g: parseInt(result[2], 16) / 256,
                  b: parseInt(result[3], 16) / 256,
              }
            : null;
    }

    public render(camera: CameraData, renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(camera, renderData as ImageRenderData);
        } else if (renderData.type === RenderDataType.Text) {
            this.renderText(camera, renderData as TextRenderData);
        }
    }

    private renderImage(camera: CameraData, renderData: ImageRenderData): void {
        this.imageRenderer.renderImage(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            renderData.image,
            renderData.viewportPosition,
            renderData.width,
            renderData.height,
            renderData.slice,
            renderData.rotation,
            renderData.flipHorizontal,
            renderData.flipVertical,
            renderData.alpha,
            renderData.smooth
        );
    }

    private renderText(camera: CameraData, renderData: TextRenderData): void {
        const font = [
            renderData.bold ? "bold" : "",
            renderData.italic ? "italic" : "",
            renderData.textSize + "px",
            renderData.font,
        ];

        const canvasDimnensions = this.calculateTextCanvasDimensions(renderData);

        this.canvas2D.width = canvasDimnensions.width;
        this.canvas2D.height = canvasDimnensions.height;

        this.context2D.font = font.join(" ");
        this.context2D.fillStyle = renderData.color;
        this.context2D.textBaseline = "middle";

        this.context2D.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);

        if (Array.isArray(renderData.text)) {
            renderData.text.forEach((text: string, index: number) => {
                this.context2D.fillText(
                    text,
                    0,
                    this.canvas2D.height / 2 + (renderData.lineSeparation + renderData.textSize) * index
                );
            });
        } else {
            this.context2D.fillText(renderData.text, 0, 0);
        }

        this.imageRenderer.renderCanvas(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.context2D.canvas,
            renderData.viewportPosition,
            this.canvas2D.width,
            this.canvas2D.height
        );
    }

    private calculateTextCanvasDimensions(renderData: TextRenderData): { width: number; height: number } {
        const dimensions = { width: 0, height: 0 };

        const font = [
            renderData.bold ? "bold" : "",
            renderData.italic ? "italic" : "",
            renderData.textSize + "px",
            renderData.font,
        ];

        this.context2D.font = font.join(" ");
        this.context2D.textBaseline = "middle";

        if (Array.isArray(renderData.text)) {
            renderData.text.forEach((text: string, index: number) => {
                dimensions.width = Math.max(this.context2D.measureText(text).width, dimensions.width);
                dimensions.height += (renderData.lineSeparation + renderData.textSize) * (index + 1);
            });
        } else {
            dimensions.width = this.context2D.measureText(renderData.text).width;
            dimensions.height = renderData.textSize;
        }

        return dimensions;
    }
}
