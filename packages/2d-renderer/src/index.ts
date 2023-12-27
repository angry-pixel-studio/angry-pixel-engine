import { CullingManager } from "./CullingManager";
import { RenderDataType } from "./renderData/RenderData";
import { IRenderManager, RenderManager } from "./RenderManager";
import { ContextManager } from "./webgl/ContextManager";
import { FontAtlasFactory } from "./webgl/FontAtlasFactory";
import { ProgramFactory } from "./webgl/program/ProgramFactory";
import { ProgramManager } from "./webgl/program/ProgramManager";
import { ShaderLoader } from "./webgl/program/ShaderLoader";
import { GeometricRenderer } from "./webgl/renderer/GeometricRenderer";
import { IRenderer } from "./webgl/renderer/IRenderer";
import { MaskRenderer } from "./webgl/renderer/MaskRenderer";
import { SpriteRenderer } from "./webgl/renderer/SpriteRenderer";
import { TextRenderer } from "./webgl/renderer/TextRenderer";
import { TilemapRenderer } from "./webgl/renderer/TilemapRenderer";
import { VideoRenderer } from "./webgl/renderer/VideoRenderer";
import { TextureFactory } from "./webgl/texture/TextureFactory";
import { TextureManager } from "./webgl/texture/TextureManager";
import { WebGLManager } from "./webgl/WebGLManager";

export { IRenderManager } from "./RenderManager";
export * from "./CameraData";
export * from "./renderData/GeometricRenderData";
export * from "./renderData/MaskRenderData";
export * from "./renderData/RenderData";
export * from "./renderData/SpriteRenderData";
export * from "./renderData/TextRenderData";
export * from "./renderData/VideoRenderData";
export { TilemapOrientation, ITilemapRenderData } from "./renderData/TilemapRenderData";

export const renderManagerFactory = (canvas: HTMLCanvasElement): IRenderManager => {
    const contextManager = new ContextManager(canvas);
    const gl = contextManager.gl;
    const contextVersion = contextManager.contextVersion;

    const programManager = new ProgramManager(gl, contextVersion, new ProgramFactory(gl, new ShaderLoader(gl)));
    const textureManager = new TextureManager(new TextureFactory(gl));

    const webglManager = new WebGLManager(
        gl,
        programManager,
        textureManager,
        new Map<RenderDataType, IRenderer>([
            [RenderDataType.Sprite, new SpriteRenderer(gl, programManager, textureManager)],
            [RenderDataType.Text, new TextRenderer(gl, programManager, textureManager, new FontAtlasFactory())],
            [RenderDataType.Tilemap, new TilemapRenderer(gl, programManager, textureManager)],
            [RenderDataType.Geometric, new GeometricRenderer(gl, programManager)],
            [RenderDataType.Mask, new MaskRenderer(gl, programManager)],
            [RenderDataType.Video, new VideoRenderer(gl, programManager, textureManager)],
        ])
    );

    return new RenderManager(webglManager, new CullingManager(gl));
};
