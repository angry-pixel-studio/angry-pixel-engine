import { mat4 } from "gl-matrix";
import { IRenderer } from "./IRenderer";
import { IProgramManager } from "../program/ProgramManager";
import { RenderDataType } from "../../renderData/RenderData";
import { ICameraData } from "../../CameraData";
import { range } from "../../../math";
import { GeometricShape, IGeometricRenderData } from "../../renderData/GeometricRenderData";
import { hexToRgba } from "../../utils/hexToRgba";
import { setProjectionMatrix } from "./Utils";

export class GeometricRenderer implements IRenderer {
    public readonly type: RenderDataType.Geometric;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // cache
    private readonly circumferenceVertices: Float32Array;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: IProgramManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();

        const a = (2 * Math.PI) / 60;
        this.circumferenceVertices = new Float32Array(
            range(1, 60, 1).reduce((v, i) => [...v, Math.cos(i * a), Math.sin(i * a)], []),
        );
    }

    public render(renderData: IGeometricRenderData, cameraData: ICameraData): void {
        switch (renderData.shape) {
            case GeometricShape.Polygon:
                this.renderLines(renderData, cameraData, this.gl.LINE_LOOP);
                break;
            case GeometricShape.Line:
                this.renderLines(renderData, cameraData, this.gl.LINES);
                break;
            case GeometricShape.Circumference:
                this.renderCircumference(renderData, cameraData);
                break;
        }
    }

    private renderLines(renderData: IGeometricRenderData, cameraData: ICameraData, mode: number): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(renderData.vertexModel.reduce((a, v) => [...a, v.x, v.y], [])),
            this.gl.DYNAMIC_DRAW,
        );

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(mode, 0, renderData.vertexModel.length);
    }

    private renderCircumference(renderData: IGeometricRenderData, cameraData: ICameraData): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.circumferenceVertices, this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.radius, renderData.radius, 1]);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(this.gl.LINE_LOOP, 0, this.circumferenceVertices.length / 2);
    }
}
