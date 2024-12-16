import { mat4 } from "gl-matrix";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { range, Vector2 } from "@math";
import { ProgramManager } from "../program/ProgramManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

const CIRCUMFERENCE_VERTICES = 60;

export enum GeometricShape {
    Polygon,
    Circumference,
    Line,
}

export interface GeometricRenderData extends RenderData {
    color: string;
    shape: GeometricShape;
    vertexModel: Vector2[];
    rotation: number;
    radius: number;
}

export class GeometricRenderer implements Renderer {
    public readonly type: RenderDataType.Geometric;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private circumferencePositionBuffer: WebGLBuffer;
    private linesPositionBuffer: WebGLBuffer;

    private lastShape: "circumference" | "polygon";

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
        this.circumferencePositionBuffer = this.gl.createBuffer();
        this.linesPositionBuffer = this.gl.createBuffer();

        //  circumference position buffer
        const angle = (2 * Math.PI) / CIRCUMFERENCE_VERTICES;
        const vertices = new Float32Array(
            range(1, CIRCUMFERENCE_VERTICES, 1).reduce((v, i) => [...v, Math.cos(i * angle), Math.sin(i * angle)], []),
        );
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.circumferencePositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    }

    public render(renderData: GeometricRenderData, cameraData: CameraData, lastRender: RenderDataType): boolean {
        switch (renderData.shape) {
            case GeometricShape.Polygon:
                this.renderLines(renderData, cameraData, this.gl.LINE_LOOP);
                break;
            case GeometricShape.Line:
                this.renderLines(renderData, cameraData, this.gl.LINES);
                break;
            case GeometricShape.Circumference:
                this.renderCircumference(renderData, cameraData, lastRender);
                break;
            default:
                return false;
        }

        return true;
    }

    private renderLines(renderData: GeometricRenderData, cameraData: CameraData, mode: number): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.linesPositionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(renderData.vertexModel.reduce((a, v) => [...a, v.x, v.y], [])),
            this.gl.DYNAMIC_DRAW,
        );
        this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(mode, 0, renderData.vertexModel.length);

        this.lastShape = "polygon";
    }

    private renderCircumference(
        renderData: GeometricRenderData,
        cameraData: CameraData,
        lastRender: RenderDataType,
    ): void {
        if (lastRender !== RenderDataType.Geometric || this.lastShape !== "circumference") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.circumferencePositionBuffer);
            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [renderData.radius, renderData.radius, 1]);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(this.gl.LINE_LOOP, 0, CIRCUMFERENCE_VERTICES);

        this.lastShape = "circumference";
    }
}
