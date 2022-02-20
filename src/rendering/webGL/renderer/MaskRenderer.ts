import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../math/Rectangle";
import { MaskRenderData } from "../../renderData/MaskRenderData";
import { ProgramManager } from "../ProgramManager";
import { hexToRgba } from "../Utils";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";

export class MaskRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // prettier-ignore
    private readonly vertices = new Float32Array([
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5
    ]);

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(viewportRect: Rectangle, renderData: MaskRenderData, lastRender: LastRender): void {
        if (lastRender !== "mask") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [
            renderData.positionInViewport.x,
            renderData.positionInViewport.y,
            0,
        ]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.width, renderData.height, 1]);

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

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);

        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
