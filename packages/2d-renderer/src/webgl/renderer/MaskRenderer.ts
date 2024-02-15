import { mat4 } from "gl-matrix";
import { ICameraData } from "../../CameraData";
import { IMaskRenderData, MaskShape } from "../../renderData/MaskRenderData";
import { RenderDataType } from "../../renderData/RenderData";
import { hexToRgba } from "../../utils/hexToRgba";
import { IProgramManager } from "../program/ProgramManager";
import { IRenderer } from "./IRenderer";
import { setProjectionMatrix } from "./Utils";

export class MaskRenderer implements IRenderer {
    public readonly type: RenderDataType = RenderDataType.Mask;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // prettier-ignore
    private readonly rectangleVertices = new Float32Array([
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5
    ]);
    private readonly circumferenceVertices: Float32Array;
    private lastShape: MaskShape;

    constructor(private readonly gl: WebGL2RenderingContext, private readonly programManager: IProgramManager) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();

        const a = (2 * Math.PI) / 60;
        const v = [0, 0];

        for (let i = 0; i <= 60; i++) {
            v.push(Math.cos(i * a), Math.sin(i * a));
        }

        this.circumferenceVertices = new Float32Array(v);
    }

    public render(renderData: IMaskRenderData, cameraData: ICameraData, lastRender?: RenderDataType): void {
        if (lastRender !== RenderDataType.Mask || this.lastShape !== renderData.shape) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                renderData.shape === MaskShape.Rectangle ? this.rectangleVertices : this.circumferenceVertices,
                this.gl.STATIC_DRAW
            );
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(
            this.modelMatrix,
            this.modelMatrix,
            renderData.shape === MaskShape.Rectangle
                ? [renderData.width, renderData.height, 1]
                : [renderData.radius, renderData.radius, 1]
        );

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        if (renderData.alpha >= 0 && renderData.alpha < 1) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha ?? 1);

        if (renderData.shape === MaskShape.Rectangle) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.circumferenceVertices.length / 2);
        }

        this.lastShape = renderData.shape;
    }
}
