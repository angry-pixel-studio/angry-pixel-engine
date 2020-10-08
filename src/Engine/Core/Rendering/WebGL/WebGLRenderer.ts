import Rectangle from "../../../Helper/Rectangle";
import Vector2 from "../../../Helper/Vector2";
import IContextRenderer from "../IContextRenderer";
import ImageRenderData from "../RenderData/ImageRenderData";
import RenderData, { RenderDataType } from "../RenderData/RenderData";
import ImageRenderer from "./ImageRenderer";
import ProgramFactory from "./ProgramFactory";
import ShaderLoader from "./ShaderLoader";
import TextureFactory from "./TextureFactory";

export default class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private imageRenderer: ImageRenderer;

    private renderPosition: Vector2 = new Vector2(0, 0);
    private cacheRect: Rectangle = new Rectangle(0, 0, 0, 0);

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");

        const programFactory: ProgramFactory = new ProgramFactory(this.gl, new ShaderLoader(this.gl));
        const textureFactory: TextureFactory = new TextureFactory(this.gl);

        this.imageRenderer = new ImageRenderer(this.gl, programFactory, textureFactory);
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

    render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(renderData as ImageRenderData, renderData.ui === true ? viewportRect : worldSpaceViewRect);
        }
    }

    private renderImage(renderData: ImageRenderData, viewRect: Rectangle): void {
        if (this.isInsideViewRect(renderData, viewRect) === false) {
            return;
        }

        this.updateRenderPosition(renderData, viewRect);

        this.imageRenderer.renderImage(
            renderData.image,
            this.renderPosition,
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

    private isInsideViewRect(renderData: ImageRenderData, viewRect: Rectangle): boolean {
        this.cacheRect.set(
            renderData.position.x - renderData.width / 2,
            renderData.position.y + renderData.height / 2,
            renderData.width,
            renderData.height
        );

        return viewRect.overlappingRectangle(this.cacheRect);
    }

    private updateRenderPosition(renderData: RenderData, viewRect: Rectangle) {
        this.renderPosition.x = Number((renderData.position.x - viewRect.x - viewRect.width / 2).toFixed(0));
        this.renderPosition.y = Number((renderData.position.y - viewRect.y + viewRect.height / 2).toFixed(0));
    }
}
