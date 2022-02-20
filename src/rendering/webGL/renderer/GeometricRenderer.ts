import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { ColliderRenderData } from "../../renderData/ColliderRenderData";
import { ProgramManager } from "../ProgramManager";
import { Vector2 } from "../../../math/Vector2";
import { ShapeType } from "../../../physics/collision/shape/Shape"; // TODO: resolve dependency
import { hexToRgba } from "../Utils";
import { GeometricRenderData } from "../../renderData/GeometricRenderData";
import { Rectangle as RectangleCollider } from "../../../physics/collision/shape/Rectangle";

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
                    width: (renderData.shape as RectangleCollider).width,
                    height: (renderData.shape as RectangleCollider).height,
                },
                renderData.color,
                renderData.shape.angle
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
        color: string,
        angleInRadians: number = 0
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
        mat4.translate(this.modelMatrix, this.modelMatrix, [positionInViewport.x, positionInViewport.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, angleInRadians);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.uniform1i(this.programManager.renderTextureUniform, 0);

        const { r, g, b, a } = hexToRgba(color);
        this.gl.uniform4f(this.programManager.solidColorUniform, r, g, b, a);
        this.gl.uniform1f(this.programManager.alphaUniform, 1);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, posVertices.length / 2);
    }

    private generateRectangleVertices(width: number, height: number, lineHeight: number): number[] {
        const halfHeight = height / 2;
        const halfWidth = width / 2;

        return [
            ...this.generateLineVertices(-halfWidth, -halfHeight, halfWidth, -halfHeight + lineHeight),
            ...this.generateLineVertices(halfWidth - lineHeight, -halfHeight, halfWidth, halfHeight),
            ...this.generateLineVertices(-halfWidth, halfHeight - lineHeight, halfWidth, halfHeight),
            ...this.generateLineVertices(-halfWidth, -halfHeight, -halfWidth + lineHeight, halfHeight),
        ];
    }

    private generateLineVertices(x1: number, y1: number, x2: number, y2: number): number[] {
        // prettier-ignore
        return [
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ]
    }
}
