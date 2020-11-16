import { IContextRenderer } from "../IContextRenderer";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { WebGLImageRenderer } from "./WebGLImageRenderer";

export class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private imageRenderer: WebGLImageRenderer;

    public constructor(canvas: HTMLCanvasElement, imageRenderer: WebGLImageRenderer) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");
        this.imageRenderer = imageRenderer;
    }

    clearCanvas(color: string): void {
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

    render(renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(renderData as ImageRenderData);
        }
    }

    private renderImage(renderData: ImageRenderData): void {
        this.imageRenderer.renderImage(
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
}
