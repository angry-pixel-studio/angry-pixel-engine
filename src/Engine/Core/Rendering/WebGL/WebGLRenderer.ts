import { CameraData } from "../CameraData";
import { IContextRenderer } from "../IContextRenderer";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { TextRenderData } from "../RenderData/TextRenderData";
import { ProgramFactory } from "./ProgramFactory";
import { TextureManager } from "./TextureManager";
import { WebGLImageRenderer } from "./WebGLImageRenderer";

// shaders
import { imageFragmentShader } from "./Shader/imageFragmentShader";
import { imageVertexShader } from "./Shader/imageVertexShader";
import { imageFragmentShader as legacyImageFragmentRenderer } from "./Shader/Legacy/imageFragmentShader";
import { imageVertexShader as legacyImageVertexRenderer } from "./Shader/Legacy/imageVertexShader";
import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { hexToRgb } from "./Utils";

export enum WebGLContextVersion {
    LegacyWebGl = "webgl",
    WebGL2 = "webgl2",
}

export class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private program: WebGLProgram;
    private textureManager: TextureManager;
    private imageRenderer: WebGLImageRenderer;
    private fontAtlasFactory: FontAtlasFactory;

    public constructor(
        contextVersion: WebGLContextVersion,
        canvas: HTMLCanvasElement,
        programFactory: ProgramFactory,
        textureManager: TextureManager,
        imageRenderer: WebGLImageRenderer
    ) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext(contextVersion) as WebGLRenderingContext;

        this.program =
            contextVersion === WebGLContextVersion.WebGL2
                ? programFactory.create(this.gl, imageVertexShader, imageFragmentShader)
                : programFactory.create(this.gl, legacyImageVertexRenderer, legacyImageFragmentRenderer);

        this.textureManager = textureManager;
        this.imageRenderer = imageRenderer;

        this.imageRenderer.setProgram(this.program);

        this.fontAtlasFactory = new FontAtlasFactory();
    }

    public clearCanvas(color: string): void {
        const rgb = hexToRgb(color);

        this.gl.clearColor(rgb.r, rgb.g, rgb.b, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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

    private fontAtlas: Map<symbol, FontAtlas> = new Map<symbol, FontAtlas>();

    private renderText(camera: CameraData, renderData: TextRenderData): void {
        const symbol: symbol = Symbol.for(renderData.fontFamily);
        if (this.fontAtlas.has(symbol) === false) {
            this.fontAtlasFactory
                .create(
                    [
                        [32, 126],
                        [161, 255],
                    ],
                    renderData.fontFamily,
                    renderData.fontUrl
                )
                .then((fontAtlas: FontAtlas) => {
                    this.fontAtlas.set(symbol, fontAtlas);
                    this.fontAtlasLoaded(fontAtlas, camera, renderData);
                });
        } else {
            this.fontAtlasLoaded(this.fontAtlas.get(symbol), camera, renderData);
        }
    }

    private fontAtlasLoaded(fontAtlas: FontAtlas, camera: CameraData, renderData: TextRenderData): void {
        this.imageRenderer.renderText(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.textureManager.getOrCreateTextureFromCanvas(renderData.fontFamily, fontAtlas.canvas, true),
            fontAtlas,
            renderData
        );
    }
}
