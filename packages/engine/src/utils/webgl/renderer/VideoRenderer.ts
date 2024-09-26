import { mat4 } from "gl-matrix";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { Slice } from "./SpriteRenderer";
import { ProgramManager } from "../program/ProgramManager";
import { TextureManager } from "../texture/TextureManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

export interface VideoRenderData extends RenderData {
    video: HTMLVideoElement;
    width: number;
    height: number;
    slice?: Slice;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    rotation?: number;
    opacity?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
}

export class VideoRenderer implements Renderer {
    public readonly type: RenderDataType.Video;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private posVertices: Float32Array;
    private texVertices: Float32Array;

    private lastTexture: WebGLTexture = null;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
        private readonly textureManager: TextureManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();

        // prettier-ignore
        this.posVertices = new Float32Array([
            -0.5, -0.5,
            -0.5, 0.5,
            0.5, -0.5,
            0.5, -0.5,
            -0.5, 0.5,
            0.5, 0.5
        ]);

        // prettier-ignore
        this.texVertices = new Float32Array([
            0, 1,
            0, 0,
            1, 1,
            1, 1,
            0, 0,
            1, 0
        ]);
    }

    public render(renderData: VideoRenderData, cameraData: CameraData, lastRender?: RenderDataType): void {
        if (lastRender !== renderData.type) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.posVertices, this.gl.STATIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.texVertices, this.gl.STATIC_DRAW);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.width * (renderData.flipHorizontal ? -1 : 1),
            renderData.height * (renderData.flipVertical ? -1 : 1),
            1,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);
        if (renderData.slice) {
            mat4.translate(this.textureMatrix, this.textureMatrix, [
                renderData.slice.x / renderData.video.videoWidth,
                renderData.slice.y / renderData.video.videoHeight,
                0,
            ]);
            mat4.scale(this.textureMatrix, this.textureMatrix, [
                renderData.slice.width / renderData.video.videoWidth,
                renderData.slice.height / renderData.video.videoHeight,
                1,
            ]);
        }

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);

        const texture = this.textureManager.getOrCreateTextureFromVideo(renderData.video);

        if (this.lastTexture !== texture || lastRender !== renderData.type) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, renderData.video);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity ?? 1);

        this.gl.uniform1i(this.programManager.useTintColorUniform, renderData.tintColor ? 1 : 0);
        if (renderData.tintColor) {
            const { r, g, b, a } = hexToRgba(renderData.tintColor);
            this.gl.uniform4f(this.programManager.tintColorUniform, r, g, b, a);
        }

        this.gl.uniform1i(this.programManager.useMaskColorUniform, renderData.maskColor ? 1 : 0);
        if (renderData.maskColor) {
            const { r, g, b } = hexToRgba(renderData.maskColor);
            this.gl.uniform4f(this.programManager.maskColorUniform, r, g, b, renderData.opacity ?? 1);
            this.gl.uniform1f(this.programManager.maskColorMixUniform, renderData.maskColorMix ?? 1);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
