import { mat4 } from "gl-matrix";
import { hexToRgba, setProjectionMatrix } from "./utils";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { ProgramManager } from "../program/ProgramManager";
import { Vector2 } from "@math";

/**
 * Mask shape: Rectangle or Circumference.
 * @category Components
 * @public
 */
export enum MaskShape {
    Rectangle,
    Circumference,
    Polygon,
}

export interface MaskRenderData extends RenderData {
    color: string;
    shape: MaskShape;
    width: number;
    height: number;
    radius: number;
    vertices: Vector2[];
    rotation: number;
    opacity: number;
}

const CIRCUMFERENCE_VERTICES = 60;

export class MaskRenderer implements Renderer {
    public readonly type: RenderDataType = RenderDataType.Mask;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private rectanglePositionBuffer: WebGLBuffer;
    private circumferencePositionBuffer: WebGLBuffer;
    private polygonPositionBuffer: WebGLBuffer;
    private lastShape: MaskShape;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
        this.circumferencePositionBuffer = this.gl.createBuffer();
        this.rectanglePositionBuffer = this.gl.createBuffer();
        this.polygonPositionBuffer = this.gl.createBuffer();

        // circumference position buffer
        const angle = (2 * Math.PI) / CIRCUMFERENCE_VERTICES;
        const vertices = [0, 0];

        for (let i = 0; i <= CIRCUMFERENCE_VERTICES; i++) {
            vertices.push(Math.cos(i * angle), Math.sin(i * angle));
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.circumferencePositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        // rectangle position buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectanglePositionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
            this.gl.STATIC_DRAW,
        );
    }

    public render(renderData: MaskRenderData, cameraData: CameraData, lastRender?: RenderDataType): boolean {
        if (lastRender !== RenderDataType.Mask || this.lastShape !== renderData.shape) {
            this.gl.bindBuffer(
                this.gl.ARRAY_BUFFER,
                renderData.shape === MaskShape.Rectangle
                    ? this.rectanglePositionBuffer
                    : renderData.shape === MaskShape.Circumference
                      ? this.circumferencePositionBuffer
                      : this.polygonPositionBuffer,
            );

            if (renderData.shape === MaskShape.Polygon) {
                this.gl.bufferData(
                    this.gl.ARRAY_BUFFER,
                    new Float32Array(renderData.vertices.reduce((a, v) => [...a, v.x, v.y], [0, 0])),
                    this.gl.DYNAMIC_DRAW,
                );
            }

            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        if (renderData.shape !== MaskShape.Polygon) {
            mat4.scale(
                this.modelMatrix,
                this.modelMatrix,
                renderData.shape === MaskShape.Rectangle
                    ? [renderData.width, renderData.height, 1]
                    : [renderData.radius, renderData.radius, 1],
            );
        }
        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        if (renderData.opacity >= 0 && renderData.opacity < 1) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(renderData.color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity ?? 1);

        if (renderData.shape === MaskShape.Rectangle) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        } else if (renderData.shape === MaskShape.Circumference) {
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, CIRCUMFERENCE_VERTICES + 2);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, renderData.vertices.length + 1);
        }

        this.lastShape = renderData.shape;

        return true;
    }
}
