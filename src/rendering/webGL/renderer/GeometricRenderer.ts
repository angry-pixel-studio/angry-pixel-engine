import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { ProgramManager } from "../ProgramManager";
import { Vector2 } from "../../../math/Vector2";
import { hexToRgba } from "../Utils";
import { range } from "../../../math/Utils";
import { GeometricShape, GeometricRenderData } from "../../renderData/GeometricRenderData";

export class GeometricRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // cache
    private readonly vertices: Map<symbol, Float32Array> = new Map<symbol, Float32Array>();
    private readonly circumferenceVertices: Float32Array;
    private lastVertices: symbol = null;
    private lastRender: LastRender = null;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();

        const a = (2 * Math.PI) / 60;
        this.circumferenceVertices = new Float32Array(
            range(1, 60, 1).reduce((v, i) => [...v, Math.cos(i * a), Math.sin(i * a)], [])
        );
    }

    public render(viewportRect: Rectangle, renderData: GeometricRenderData, lastRender: LastRender): void {
        this.lastRender = lastRender;

        switch (renderData.shape) {
            case GeometricShape.Polygon:
                this.renderLines(viewportRect, renderData, this.gl.LINE_LOOP);
                break;
            case GeometricShape.Line:
                this.renderLines(viewportRect, renderData, this.gl.LINES);
                break;
            case GeometricShape.Circumference:
                this.renderCircumference(viewportRect, renderData);
                break;
        }
    }

    private renderLines(
        viewportRect: Rectangle,
        { vertexModel, positionInViewport, angle, color }: GeometricRenderData,
        mode: number
    ): void {
        const verticesKey: symbol = this.generateVerticesKey(vertexModel);

        if (this.vertices.has(verticesKey) === false) {
            this.vertices.set(verticesKey, new Float32Array(this.generatePolygonVertices(vertexModel)));
        }
        const posVertices: Float32Array = this.vertices.get(verticesKey);

        if (this.lastVertices !== verticesKey || this.lastRender !== "geometric") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, posVertices, this.gl.DYNAMIC_DRAW);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, posVertices, this.gl.DYNAMIC_DRAW);
        }
        this.lastVertices = verticesKey;

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [positionInViewport.x, positionInViewport.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, angle);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(color);
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

    private renderCircumference(
        viewportRect: Rectangle,
        { radius, positionInViewport, color }: GeometricRenderData
    ): void {
        this.lastVertices = null;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.circumferenceVertices, this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.circumferenceVertices, this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [positionInViewport.x, positionInViewport.y, 0]);
        mat4.scale(this.modelMatrix, this.modelMatrix, [radius, radius, 1]);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(this.gl.LINE_LOOP, 0, this.circumferenceVertices.length / 2);
    }
}
