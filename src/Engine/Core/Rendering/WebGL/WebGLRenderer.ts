import { CameraData } from "../CameraData";
import { IContextRenderer } from "../IContextRenderer";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { TextRenderData } from "../RenderData/TextRenderData";
import { ProgramFactory } from "./ProgramFactory";
import { fragmentShader } from "./Shader/Image/fragmentShader";
import { vertexShader } from "./Shader/Image/vertexShader";
import { TextureManager } from "./TextureManager";
import { WebGLImageRenderer } from "./WebGLImageRenderer";

export class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;
    private textureManager: TextureManager;
    private imageRenderer: WebGLImageRenderer;

    public constructor(
        canvas: HTMLCanvasElement,
        programFactory: ProgramFactory,
        textureManager: TextureManager,
        imageRenderer: WebGLImageRenderer
    ) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl2");

        this.textureManager = textureManager;
        this.program = programFactory.create(this.gl, vertexShader, fragmentShader);
        this.imageRenderer = imageRenderer;

        this.imageRenderer.setProgram(this.program);
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
            this.textureManager.getOrCreateTextureFromImage(renderData.image, renderData.smooth),
            renderData.image,
            renderData.positionInViewport,
            renderData.width,
            renderData.height,
            renderData.slice,
            renderData.rotation,
            renderData.flipHorizontal,
            renderData.flipVertical,
            renderData.alpha
        );
    }

    private renderText(camera: CameraData, renderData: TextRenderData): void {
        // do shomething
    }
}
