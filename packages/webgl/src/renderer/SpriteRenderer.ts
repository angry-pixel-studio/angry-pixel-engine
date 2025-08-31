import { mat4 } from "gl-matrix";
import { hexToRgba, setProjectionMatrix } from "./utils";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { ProgramManager } from "../program/ProgramManager";
import { TextureManager } from "../texture/TextureManager";
import { Vector2 } from "@angry-pixel/math";

export interface SpriteRenderData extends RenderData {
    image: HTMLImageElement;
    width: number;
    height: number;
    smooth?: boolean;
    slice?: Slice;
    flipHorizontally?: boolean;
    flipVertically?: boolean;
    rotation?: number;
    opacity?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
    tiled?: Vector2;
}

/**
 * Cut the image based on straight coordinates starting from the top left downward.
 * @category Components Configuration
 * @public
 */
export interface Slice {
    /** Top left x coordinate */
    x: number;
    /** Top left y coordinate */
    y: number;
    /** The width to slice */
    width: number;
    /** The height to slice */
    height: number;
}

export class SpriteRenderer implements Renderer {
    public readonly type: RenderDataType.Sprite;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private positionBuffer: WebGLBuffer;
    private textureBuffer: WebGLBuffer;
    private tiledPositionBuffer: WebGLBuffer;
    private tiledTextureBuffer: WebGLBuffer;

    private tiledPosVertices: Map<string, Float32Array> = new Map();
    private tiledTexVertices: Map<string, Float32Array> = new Map();

    private lastTexture: WebGLTexture = null;
    private lastDrawMode: "sprite" | "tiled";
    private isTiled: boolean = false;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: ProgramManager,
        private readonly textureManager: TextureManager,
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
        this.positionBuffer = this.gl.createBuffer();
        this.textureBuffer = this.gl.createBuffer();
        this.tiledPositionBuffer = this.gl.createBuffer();
        this.tiledTextureBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
            this.gl.STATIC_DRAW,
        );

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0]),
            this.gl.STATIC_DRAW,
        );

        this.lastDrawMode = "sprite";
    }

    public render(renderData: SpriteRenderData, cameraData: CameraData, lastRender?: RenderDataType): boolean {
        this.isTiled = renderData.tiled && (renderData.tiled.x > 1 || renderData.tiled.y > 1);

        if (!this.isTiled && (lastRender !== RenderDataType.Sprite || this.lastDrawMode !== "sprite")) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
            this.gl.enableVertexAttribArray(this.programManager.texCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        } else if (this.isTiled) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tiledPositionBuffer);
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                this.getTiledPositionVertices(renderData.tiled),
                this.gl.DYNAMIC_DRAW,
            );
            this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tiledTextureBuffer);
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                this.getTiledTextureVertices(renderData.tiled),
                this.gl.DYNAMIC_DRAW,
            );
            this.gl.enableVertexAttribArray(this.programManager.texCoordsAttr);
            this.gl.vertexAttribPointer(this.programManager.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);
        }

        this.lastDrawMode = this.isTiled ? "tiled" : "sprite";
        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.width * (renderData.flipHorizontally ? -1 : 1),
            renderData.height * (renderData.flipVertically ? -1 : 1),
            1,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);
        if (renderData.slice) {
            mat4.translate(this.textureMatrix, this.textureMatrix, [
                renderData.slice.x / renderData.image.naturalWidth,
                renderData.slice.y / renderData.image.naturalHeight,
                0,
            ]);
            mat4.scale(this.textureMatrix, this.textureMatrix, [
                renderData.slice.width / renderData.image.naturalWidth,
                renderData.slice.height / renderData.image.naturalHeight,
                1,
            ]);
        }

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);

        const texture = this.textureManager.getOrCreateTextureFromImage(renderData.image, renderData.smooth);
        if (this.lastTexture !== texture || lastRender !== renderData.type) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.opacity ?? 1);

        this.gl.uniform1i(this.programManager.useTintColorUniform, renderData.tintColor ? 1 : 0);
        if (renderData.tintColor) {
            const { r, g, b, a } = hexToRgba(renderData.tintColor);
            this.gl.uniform4f(this.programManager.tintColorUniform, r, g, b, a);
        }

        this.gl.uniform1i(this.programManager.useMaskColorUniform, renderData.maskColor ? 1 : 0);
        if (renderData.maskColor) {
            const { r, g, b } = hexToRgba(renderData.maskColor);
            this.gl.uniform4f(this.programManager.maskColorUniform, r, g, b, renderData.opacity ?? 1);
            this.gl.uniform1f(this.programManager.maskColorMixUniform, renderData.maskColorMix ?? 1);
        }

        if (this.isTiled) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, renderData.tiled.x * renderData.tiled.y * 6);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        }

        return true;
    }

    private getTiledPositionVertices(tiled: Vector2): Float32Array {
        const key = tiled.toString();

        if (!this.tiledPosVertices.has(key)) {
            const vertices: number[] = [];

            for (let x = -tiled.x / 2; x < tiled.x / 2; x++) {
                for (let y = -tiled.y / 2; y < tiled.y / 2; y++) {
                    vertices.push(x, y, x, y + 1, x + 1, y, x + 1, y, x, y + 1, x + 1, y + 1);
                }
            }

            this.tiledPosVertices.set(key, new Float32Array(vertices));
        }

        return this.tiledPosVertices.get(key);
    }

    private getTiledTextureVertices(tiled: Vector2): Float32Array {
        const key = tiled.toString();

        if (!this.tiledTexVertices.has(key)) {
            const vertices: number[] = [];

            for (let i = 0; i < tiled.x * tiled.y; i++) {
                vertices.push(0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0);
            }

            this.tiledTexVertices.set(key, new Float32Array(vertices));
        }

        return this.tiledTexVertices.get(key);
    }
}
