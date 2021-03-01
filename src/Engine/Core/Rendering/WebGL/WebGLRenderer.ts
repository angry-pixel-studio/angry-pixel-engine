import { CameraData } from "../CameraData";
import { IContextRenderer } from "../IContextRenderer";
import { ImageRenderData } from "../RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "../RenderData/RenderData";
import { TextRenderData } from "../RenderData/TextRenderData";
import { TextureManager } from "./TextureManager";
import { ImageRenderer } from "./Renderer/ImageRenderer";

import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { hexToRgb } from "./Utils";
import { ColliderRenderData } from "../RenderData/ColliderRenderData";
import { ProgramManager } from "./ProgramManager";
import { TextRenderer } from "./Renderer/TextRenderer";
import { GeometricRenderer } from "./Renderer/GeometricRenderer";

export enum WebGLContextVersion {
    LegacyWebGL = "webgl",
    WebGL2 = "webgl2",
}

export type LastRender = "image" | "text" | "geometric";

export class WebGLRenderer implements IContextRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    private textureManager: TextureManager;
    private fontAtlasFactory: FontAtlasFactory;

    private imageRenderer: ImageRenderer;
    private textRenderer: TextRenderer;
    private geometricRenderer: GeometricRenderer;

    // cache
    private lastRender: LastRender;
    private fontAtlas: Map<symbol, FontAtlas> = new Map<symbol, FontAtlas>();

    public constructor(
        contextVersion: WebGLContextVersion,
        canvas: HTMLCanvasElement,
        programManager: ProgramManager,
        textureManager: TextureManager,
        fontAtlasFactory: FontAtlasFactory,
        imageRenderer: ImageRenderer,
        textRenderer: TextRenderer,
        geometricRenderer: GeometricRenderer
    ) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext(contextVersion) as WebGLRenderingContext;
        programManager.loadProgram();

        this.textureManager = textureManager;

        this.imageRenderer = imageRenderer;
        this.textRenderer = textRenderer;
        this.geometricRenderer = geometricRenderer;

        this.fontAtlasFactory = fontAtlasFactory;
    }

    public clearCanvas(color: string): void {
        const rgb = hexToRgb(color);

        this.gl.clearColor(rgb.r, rgb.g, rgb.b, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public render(camera: CameraData, renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(camera, renderData as ImageRenderData);
            this.lastRender = "image";
        }
        if (renderData.type === RenderDataType.Text) {
            this.renderText(camera, renderData as TextRenderData);
            this.lastRender = "text";
        }
        if (renderData.type === RenderDataType.Collider) {
            this.geometricRenderer.renderCollider(
                camera.viewportRect,
                renderData as ColliderRenderData,
                this.lastRender
            );
            this.lastRender = "geometric";
        }
    }

    private renderImage(camera: CameraData, renderData: ImageRenderData): void {
        this.imageRenderer.render(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.textureManager.getOrCreateTextureFromImage(renderData.image, renderData.smooth),
            renderData,
            this.lastRender
        );
    }

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
        this.textRenderer.render(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.textureManager.getOrCreateTextureFromCanvas(renderData.fontFamily, fontAtlas.canvas, true),
            fontAtlas,
            renderData,
            this.lastRender
        );
    }
}
