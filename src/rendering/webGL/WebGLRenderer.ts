import { CameraData } from "../CameraData";
import { ContextRenderer } from "../ContextRenderer";
import { ImageRenderData } from "../renderData/ImageRenderData";
import { RenderData, RenderDataType } from "../renderData/RenderData";
import { TextRenderData } from "../renderData/TextRenderData";
import { TextureManager } from "./TextureManager";
import { ImageRenderer } from "./renderer/ImageRenderer";

import { FontAtlas, FontAtlasFactory } from "../FontAtlasFactory";
import { hexToRgba } from "./Utils";
import { ProgramManager } from "./ProgramManager";
import { TextRenderer } from "./renderer/TextRenderer";
import { GeometricRenderer } from "./renderer/GeometricRenderer";
import { TilemapRenderData } from "../renderData/TilemapRenderData";
import { TilemapRenderer } from "./renderer/TilemapRenderer";
import { MaskRenderer } from "./renderer/MaskRenderer";
import { MaskRenderData } from "../renderData/MaskRenderData";
import { GeometricRenderData } from "../renderData/GeometricRenderData";

export enum WebGLContextVersion {
    LegacyWebGL = "webgl",
    WebGL2 = "webgl2",
}

export type LastRender = "image" | "text" | "geometric" | "tilemap" | "mask";

export class WebGLRenderer implements ContextRenderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly gl: WebGLRenderingContext;

    private readonly textureManager: TextureManager;
    private readonly fontAtlasFactory: FontAtlasFactory;

    private readonly imageRenderer: ImageRenderer;
    private readonly textRenderer: TextRenderer;
    private readonly geometricRenderer: GeometricRenderer;
    private readonly tilemapRenderer: TilemapRenderer;
    private readonly maskRenderer: MaskRenderer;

    // cache
    private lastRender: LastRender;

    public constructor(
        contextVersion: WebGLContextVersion,
        canvas: HTMLCanvasElement,
        programManager: ProgramManager,
        textureManager: TextureManager,
        fontAtlasFactory: FontAtlasFactory,
        imageRenderer: ImageRenderer,
        tilemapRenderer: TilemapRenderer,
        textRenderer: TextRenderer,
        geometricRenderer: GeometricRenderer,
        maskRenderer: MaskRenderer
    ) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext(contextVersion) as WebGLRenderingContext;
        programManager.loadProgram();

        this.textureManager = textureManager;

        this.imageRenderer = imageRenderer;
        this.tilemapRenderer = tilemapRenderer;
        this.textRenderer = textRenderer;
        this.geometricRenderer = geometricRenderer;
        this.maskRenderer = maskRenderer;

        this.fontAtlasFactory = fontAtlasFactory;
    }

    public clearCanvas(color: string): void {
        const rgb = hexToRgba(color);

        this.gl.clearColor(rgb.r, rgb.g, rgb.b, rgb.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public render(camera: CameraData, renderData: RenderData): void {
        if (renderData.type === RenderDataType.Image) {
            this.renderImage(camera, renderData as ImageRenderData);
            this.lastRender = "image";
        }
        if (renderData.type === RenderDataType.Tilemap) {
            this.renderTilemap(camera, renderData as TilemapRenderData);
            this.lastRender = "tilemap";
        }
        if (renderData.type === RenderDataType.Text) {
            this.renderText(camera, renderData as TextRenderData);
            this.lastRender = "text";
        }
        if (renderData.type === RenderDataType.Geometric) {
            this.geometricRenderer.render(camera.viewportRect, renderData as GeometricRenderData, this.lastRender);
            this.lastRender = "geometric";
        }
        if (renderData.type === RenderDataType.Mask) {
            this.renderMask(camera, renderData as MaskRenderData);
            this.lastRender = "mask";
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

    private renderTilemap(camera: CameraData, renderData: TilemapRenderData): void {
        this.tilemapRenderer.render(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.textureManager.getOrCreateTextureFromImage(renderData.image, renderData.smooth),
            renderData,
            this.lastRender
        );
    }

    private renderText(camera: CameraData, renderData: TextRenderData): void {
        if (this.fontAtlasFactory.loadingFontAtlas(renderData.fontFamily)) return;

        if (!this.fontAtlasFactory.hasFontAtlas(renderData.fontFamily)) {
            this.fontAtlasFactory.asyncCreate(
                renderData.charRanges,
                renderData.fontFamily,
                renderData.fontUrl,
                renderData.bitmapSize
            );
        } else {
            this.fontAtlasLoaded(this.fontAtlasFactory.getFontAtlas(renderData.fontFamily), camera, renderData);
        }
    }

    private renderMask(camera: CameraData, renderData: MaskRenderData): void {
        this.maskRenderer.render(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            renderData,
            this.lastRender
        );
    }

    private fontAtlasLoaded(fontAtlas: FontAtlas, camera: CameraData, renderData: TextRenderData): void {
        this.textRenderer.render(
            renderData.ui === true ? camera.originalViewportRect : camera.viewportRect,
            this.textureManager.getOrCreateTextureFromCanvas(
                renderData.fontFamily,
                fontAtlas.canvas,
                renderData.smooth
            ),
            fontAtlas,
            renderData,
            this.lastRender
        );
    }
}
