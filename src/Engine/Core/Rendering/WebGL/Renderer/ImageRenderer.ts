import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../../Math/Rectangle";
import { ImageRenderData } from "../../RenderData/ImageRenderData";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { hexToRgb, RGB } from "../Utils";
import { ProgramManager } from "../ProgramManager";

export class ImageRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private posVertices: number[] = [];
    private texVertices: number[] = [];

    // cache
    private lastTexture: WebGLTexture = null;
    private maskColor: RGB = null;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();

        this.posVertices = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
        this.texVertices = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];
    }

    public render(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        renderData: ImageRenderData,
        lastRender: LastRender
    ): void {
        if (lastRender !== "image") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.STATIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.STATIC_DRAW);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [
            renderData.positionInViewport.x,
            renderData.positionInViewport.y,
            0,
        ]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.width * (renderData.flipHorizontal ? -1 : 1),
            renderData.height * (renderData.flipVertical ? -1 : 1),
            1,
        ]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation * (Math.PI / 180));

        this.textureMatrix = mat4.identity(this.textureMatrix);
        if (renderData.slice !== null) {
            mat4.translate(this.textureMatrix, this.textureMatrix, [
                renderData.slice.x / renderData.image.naturalWidth,
                renderData.slice.y / renderData.image.naturalHeight,
                0,
            ]);
            // subtracting 0.5 to avoid bleeding (half-pixel correction)
            mat4.scale(this.textureMatrix, this.textureMatrix, [
                (renderData.slice.width - 0.5) / renderData.image.naturalWidth,
                (renderData.slice.height - 0.5) / renderData.image.naturalHeight,
                1,
            ]);
        }

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        if (renderData.alpha < 1) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }

        if (this.lastTexture !== texture || lastRender === "text") {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha);

        this.maskColor = renderData.maskColor !== null ? hexToRgb(renderData.maskColor) : { r: 1, g: 1, b: 1 };

        this.gl.uniform4f(this.programManager.colorUniform, this.maskColor.r, this.maskColor.g, this.maskColor.b, 1);
        this.gl.uniform1f(this.programManager.colorMixUniform, renderData.maskColorMix);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
