import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../../Math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { ColliderRenderData } from "../../RenderData/ColliderRenderData";
import { ProgramManager } from "../ProgramManager";
import { Vector2 } from "../../../../Math/Vector2";
import { ShapeType } from "../../../Collision/Shape/Shape";
import { hexToRgb, RGB } from "../Utils";
import { GeometricRenderData } from "../../RenderData/GeometricRenderData";

const LINE_WEIGHT = 1;

export class GeometricRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // cache
    private readonly vertices: Map<symbol, Float32Array> = new Map<symbol, Float32Array>();
    // prettier-ignore
    private readonly texVertices: Float32Array = new Float32Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    private lastVertices: symbol = null;
    private lastRender: LastRender = null;
    private rgbColor: RGB;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public renderCollider(viewportRect: Rectangle, renderData: ColliderRenderData, lastRender: LastRender): void {
        this.lastRender = lastRender;

        if (renderData.shape.type === ShapeType.Rectangle) {
            this.renderRectangle(
                viewportRect,
                renderData.positionInViewport,
                {
                    width: renderData.shape.width,
                    height: renderData.shape.height,
                },
                renderData.color
            );
        }
    }

    public renderGeometric(viewportRect: Rectangle, renderData: GeometricRenderData, lastRender: LastRender): void {
        this.lastRender = lastRender;

        if (renderData.geometricType === "Rectangle") {
            this.renderRectangle(
                viewportRect,
                renderData.positionInViewport,
                {
                    width: renderData.getGeometric<Rectangle>().width,
                    height: renderData.getGeometric<Rectangle>().height,
                },
                renderData.color
            );
        }
    }

    private renderRectangle(
        viewportRect: Rectangle,
        positionInViewport: Vector2,
        size: { width: number; height: number },
        color: string
    ): void {
        const verticesKey: symbol = Symbol.for(`RW${size.width}H${size.height}`);
        if (this.vertices.has(verticesKey) === false) {
            this.vertices.set(
                verticesKey,
                new Float32Array(this.generateRectangleVertices(size.width, size.height, LINE_WEIGHT))
            );
        }
        const posVertices: Float32Array = this.vertices.get(verticesKey);

        if (this.lastVertices !== verticesKey || this.lastRender !== "geometric") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, posVertices, this.gl.DYNAMIC_DRAW);
        }
        this.lastVertices = verticesKey;

        if (this.lastRender !== "geometric") {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.texVertices, this.gl.DYNAMIC_DRAW);
        }

        this.modelMatrix = mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, [
            positionInViewport.x - size.width / 2,
            positionInViewport.y - size.height / 2,
            0,
        ]);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        this.rgbColor = hexToRgb(color);
        this.gl.uniform4f(this.programManager.colorUniform, this.rgbColor.r, this.rgbColor.g, this.rgbColor.b, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, posVertices.length / 2);
    }

    private generateRectangleVertices(w: number, h: number, l: number): number[] {
        // prettier-ignore
        return [
            0, 0,
            w, 0,
            0, l,
            0, l,
            w, 0,
            w, l,
            //--//
            w - l, 0,
            w, 0,
            w - l, h,
            w - l, h,
            w, 0,
            w, h,
            //--//
            0, h - l,
            w, h - l,
            0, h,
            0, h,
            w, h - l,
            w, h,
            //--//
            0, 0,
            l, 0,
            0, h,
            0, h,
            l, 0,
            l, h,
        ];
    }
}
