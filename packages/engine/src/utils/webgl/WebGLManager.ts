import { inject, injectable } from "@ioc";
import { ContextManager } from "./ContextManager";
import { FontAtlasFactory } from "./FontAtlasFactory";
import { ProgramFactory } from "./program/ProgramFactory";
import { ProgramManager } from "./program/ProgramManager";
import { ShaderLoader } from "./program/ShaderLoader";
import { CanvasColorRenderer } from "./renderer/CanvasColorRenderer";
import { GeometricRenderer } from "./renderer/GeometricRenderer";
import { MaskRenderer } from "./renderer/MaskRenderer";
import { CameraData, RenderData, RenderDataType, Renderer } from "./renderer/Renderer";
import { ShadowRenderer } from "./renderer/ShadowRenderer";
import { SpriteRenderer } from "./renderer/SpriteRenderer";
import { TextRenderer } from "./renderer/TextRenderer";
import { TilemapRenderer } from "./renderer/TilemapRenderer";
import { VideoRenderer } from "./renderer/VideoRenderer";
import { TextureFactory } from "./texture/TextureFactory";
import { TextureManager } from "./texture/TextureManager";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";

@injectable(DEPENDENCY_TYPES.WebGLManager)
export class WebGLManager {
    private readonly renderers: Map<RenderDataType, Renderer> = new Map();
    private readonly canvasColorRenderer: CanvasColorRenderer;

    private lastRender: RenderDataType;

    constructor(@inject(DEPENDENCY_TYPES.CanvasElement) canvas: HTMLCanvasElement) {
        const contextManager = new ContextManager(canvas);
        const gl = contextManager.gl;
        const contextVersion = contextManager.contextVersion;
        const programManager = new ProgramManager(gl, contextVersion, new ProgramFactory(gl, new ShaderLoader(gl)));
        const textureManager = new TextureManager(new TextureFactory(gl));
        const fontFactoryAtlas = new FontAtlasFactory();

        this.renderers.set(RenderDataType.Sprite, new SpriteRenderer(gl, programManager, textureManager));
        this.renderers.set(RenderDataType.Text, new TextRenderer(gl, programManager, textureManager, fontFactoryAtlas));
        this.renderers.set(RenderDataType.Tilemap, new TilemapRenderer(gl, programManager, textureManager));
        this.renderers.set(RenderDataType.Geometric, new GeometricRenderer(gl, programManager));
        this.renderers.set(RenderDataType.Mask, new MaskRenderer(gl, programManager));
        this.renderers.set(RenderDataType.Video, new VideoRenderer(gl, programManager, textureManager));
        this.renderers.set(RenderDataType.Shadow, new ShadowRenderer(gl, programManager));

        this.canvasColorRenderer = new CanvasColorRenderer(gl);

        programManager.loadProgram();
    }

    public render(renderData: RenderData, cameraData: CameraData): void {
        if (this.renderers.get(renderData.type).render(renderData, cameraData, this.lastRender)) {
            this.lastRender = renderData.type;
        }
    }

    public renderCanvasColor(hexColor: string): void {
        this.canvasColorRenderer.render(hexColor);
    }
}
