import { mat4 } from "gl-matrix";
import { IRenderer } from "./IRenderer";
import { IProgramManager } from "../program/ProgramManager";
import { RenderDataType } from "../../renderData/RenderData";
import { ICameraData } from "../../CameraData";
import { range, Vector2 } from "@angry-pixel/math";
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
    private readonly vertices: Map<symbol, Float32Array> = new Map<symbol, Float32Array>();
    private readonly circumferenceVertices: Float32Array;
    private lastVertices: symbol = null;

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

    public render(renderData: IGeometricRenderData, cameraData: ICameraData, lastRender?: RenderDataType): void {
        switch (renderData.shape) {
            case GeometricShape.Polygon:
                this.renderLines(renderData, cameraData, this.gl.LINE_LOOP, lastRender);
                break;
            case GeometricShape.Line:
                this.renderLines(renderData, cameraData, this.gl.LINES, lastRender);
                break;
            case GeometricShape.Circumference:
                this.renderCircumference(renderData, cameraData);
                break;
        }
    }

    private renderLines(
        renderData: IGeometricRenderData,
        cameraData: ICameraData,
        mode: number,
        lastRender?: RenderDataType,
    ): void {
        const verticesKey: symbol = this.generateVerticesKey(renderData.vertexModel);

        if (this.vertices.has(verticesKey) === false) {
            this.vertices.set(verticesKey, new Float32Array(this.generatePolygonVertices(renderData.vertexModel)));
        }
        const posVertices: Float32Array = this.vertices.get(verticesKey);

        if (this.lastVertices !== verticesKey || lastRender !== RenderDataType.Geometric) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, posVertices, this.gl.DYNAMIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, posVertices, this.gl.DYNAMIC_DRAW);
        }
        this.lastVertices = verticesKey;

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

        this.gl.drawArrays(mode, 0, posVertices.length / 2);
    }

    private generateVerticesKey(vertices: Vector2[]): symbol {
        return Symbol.for(vertices.reduce((s, v) => `${s}${v.x}${v.y}`, vertices.length.toString()));
    }

    private generatePolygonVertices(vertices: Vector2[]): number[] {
        const result: number[] = [];
        for (let i = 0; i < vertices.length; i++) {
            result.push(vertices[i].x, vertices[i].y);
        }

        return result;
    }

    private renderCircumference(renderData: IGeometricRenderData, cameraData: ICameraData): void {
        this.lastVertices = null;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.circumferenceVertices, this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
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
