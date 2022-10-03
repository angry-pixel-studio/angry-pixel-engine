import { mat4 } from "gl-matrix";
import { Rectangle } from "../../../math/Rectangle";
import { LastRender, WebGLContextVersion } from "../WebGLRenderer";
import { hexToRgba } from "../Utils";
import { ProgramManager } from "../ProgramManager";
import { TilemapRenderData, TileRenderData } from "../../renderData/TilemapRenderData";

const TEXTURE_CORRECTION = 0;

export class TilemapRenderer {
    private gl: WebGLRenderingContext;
    private programManager: ProgramManager;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private posVertices: number[] = [];
    private texVertices: number[] = [];

    // cache
    private lastTexture: WebGLTexture = null;

    constructor(contextVersion: WebGLContextVersion, canvas: HTMLCanvasElement, programManager: ProgramManager) {
        this.gl = canvas.getContext(contextVersion) as WebGLRenderingContext;
        this.programManager = programManager;

        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(
        viewportRect: Rectangle,
        texture: WebGLTexture,
        renderData: TilemapRenderData,
        lastRender: LastRender
    ): void {
        this.generateVertices(renderData);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);

        this.textureMatrix = mat4.identity(this.textureMatrix);
        mat4.scale(this.textureMatrix, this.textureMatrix, [
            1 / renderData.image.naturalWidth,
            1 / renderData.image.naturalHeight,
            1,
        ]);

        this.projectionMatrix = mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix, viewportRect.x, viewportRect.x1, viewportRect.y, viewportRect.y1, -1, 1);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);

        if (this.lastTexture !== texture || lastRender !== "tilemap") {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.useMaskColorUniform, 0);
        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha);

        this.gl.uniform1i(this.programManager.useTintColorUniform, renderData.tintColor ? 1 : 0);
        if (renderData.tintColor) {
            const { r, g, b, a } = hexToRgba(renderData.tintColor);
            this.gl.uniform4f(this.programManager.tintColorUniform, r, g, b, a);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);
    }

    // cache
    private p = { x1: 0, y1: 0, x2: 0, y2: 0 };
    private t = { x1: 0, y1: 0, x2: 0, y2: 0 };

    private generateVertices(renderData: TilemapRenderData): void {
        this.posVertices = [];
        this.texVertices = [];

        renderData.tilesToRender.forEach((tileData: TileRenderData) => {
            this.p.x1 = tileData.positionInViewport.x - renderData.tileWidth / 2;
            this.p.x2 = tileData.positionInViewport.x + renderData.tileWidth / 2;
            this.p.y1 = tileData.positionInViewport.y - renderData.tileHeight / 2;
            this.p.y2 = tileData.positionInViewport.y + renderData.tileHeight / 2;

            // prettier-ignore
            this.posVertices.push(
                this.p.x1, this.p.y1,
                this.p.x2, this.p.y1,
                this.p.x1, this.p.y2,
                this.p.x1, this.p.y2,
                this.p.x2, this.p.y1,
                this.p.x2, this.p.y2
            )

            this.t.x1 = tileData.tile.x;
            this.t.y1 = tileData.tile.y;
            this.t.x2 = tileData.tile.x + tileData.tile.width - (renderData.textureCorrection ?? TEXTURE_CORRECTION);
            this.t.y2 = tileData.tile.y + tileData.tile.height - (renderData.textureCorrection ?? TEXTURE_CORRECTION);

            // prettier-ignore
            this.texVertices.push( 
                this.t.x1, this.t.y2,
                this.t.x2, this.t.y2,
                this.t.x1, this.t.y1,
                this.t.x1, this.t.y1,
                this.t.x2, this.t.y2,
                this.t.x2, this.t.y1
            );
        });
    }
}
