import { Vector2 } from "@angry-pixel/math";
import { mat4 } from "gl-matrix";
import { ICameraData } from "../../CameraData";
import { RenderDataType } from "../../renderData/RenderData";
import { IProcessedTilemapData } from "../../renderData/TilemapRenderData";
import { hexToRgba } from "../../utils/hexToRgba";
import { IProgramManager } from "../program/ProgramManager";
import { ITextureManager } from "../texture/TextureManager";
import { IRenderer } from "./IRenderer";
import { setProjectionMatrix } from "./Utils";

export class TilemapRenderer implements IRenderer {
    public readonly type: RenderDataType.Tilemap;

    // matrices
    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;

    // vertices
    private posVertices: number[] = [];
    private texVertices: number[] = [];

    // cache
    private lastTexture: WebGLTexture = null;
    private tileset = {
        width: 0,
        tileWidth: 0,
        tileHeight: 0,
        texMargin: new Vector2(),
        texSpacing: new Vector2(),
        texWidth: 0,
        texHeight: 0,
        texCorrection: new Vector2(),
    };

    constructor(
        private readonly gl: WebGL2RenderingContext,
        private readonly programManager: IProgramManager,
        private readonly textureManager: ITextureManager
    ) {
        this.projectionMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        this.textureMatrix = mat4.create();
    }

    public render(renderData: IProcessedTilemapData, cameraData: ICameraData, lastRender?: RenderDataType): void {
        if (renderData.culledTiles.reduce((acc, tile) => acc + tile, 0) === 0) throw new Error("Nothing to render");

        this.processTileset(renderData);
        this.generateVertices(renderData);

        if (this.posVertices.length === 0) throw new Error("Nothing to render");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programManager.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [
            renderData.renderPosition.x,
            renderData.renderPosition.y,
            0,
        ]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.tilemap.tileWidth * (renderData.flipHorizontal ? -1 : 1),
            renderData.tilemap.tileHeight * (renderData.flipVertical ? -1 : 1),
            1,
        ]);

        this.textureMatrix = mat4.identity(this.textureMatrix);
        mat4.scale(this.textureMatrix, this.textureMatrix, [
            this.tileset.tileWidth / renderData.tileset.image.naturalWidth,
            this.tileset.tileHeight / renderData.tileset.image.naturalHeight,
            1,
        ]);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData, renderData.location);

        this.gl.uniformMatrix4fv(this.programManager.projectionMatrixUniform, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.programManager.modelMatrixUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.programManager.textureMatrixUniform, false, this.textureMatrix);

        this.gl.enable(this.gl.BLEND);

        const texture = this.textureManager.getOrCreateTextureFromImage(renderData.tileset.image, renderData.smooth);

        if (this.lastTexture !== texture || lastRender !== RenderDataType.Tilemap) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.uniform1i(this.programManager.textureUniform, 0);
            this.lastTexture = texture;
        }

        this.gl.uniform1i(this.programManager.renderTextureUniform, 1);
        this.gl.uniform1f(this.programManager.alphaUniform, renderData.alpha ?? 1);

        this.gl.uniform1i(this.programManager.useTintColorUniform, renderData.tintColor ? 1 : 0);
        if (renderData.tintColor) {
            const { r, g, b, a } = hexToRgba(renderData.tintColor);
            this.gl.uniform4f(this.programManager.tintColorUniform, r, g, b, a);
        }

        this.gl.uniform1i(this.programManager.useMaskColorUniform, renderData.maskColor ? 1 : 0);
        if (renderData.maskColor) {
            const { r, g, b } = hexToRgba(renderData.maskColor);
            this.gl.uniform4f(this.programManager.maskColorUniform, r, g, b, renderData.alpha ?? 1);
            this.gl.uniform1f(this.programManager.maskColorMixUniform, renderData.maskColorMix ?? 1);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);
    }

    private processTileset({ tileset }: IProcessedTilemapData): void {
        tileset.margin = tileset.margin ?? new Vector2();
        tileset.spacing = tileset.spacing ?? new Vector2();
        tileset.correction = tileset.correction ?? new Vector2();

        this.tileset.width = tileset.width;
        this.tileset.tileWidth = tileset.tileWidth + (tileset.margin.x ?? 0) + (tileset.spacing.x ?? 0);
        this.tileset.tileHeight = tileset.tileHeight + (tileset.margin.y ?? 0) + (tileset.spacing.y ?? 0);

        this.tileset.texMargin.set(
            tileset.margin.x / this.tileset.tileWidth,
            tileset.margin.y / this.tileset.tileHeight
        );
        this.tileset.texSpacing.set(
            tileset.spacing.x / this.tileset.tileWidth,
            tileset.spacing.y / this.tileset.tileHeight
        );
        this.tileset.texCorrection.set(
            tileset.correction.x / this.tileset.tileWidth,
            tileset.correction.y / this.tileset.tileHeight
        );

        this.tileset.texWidth =
            1 - this.tileset.texMargin.x - this.tileset.texSpacing.x - 2 * this.tileset.texCorrection.x;
        this.tileset.texHeight =
            1 - this.tileset.texMargin.y - this.tileset.texSpacing.y - 2 * this.tileset.texCorrection.y;
    }

    private generateVertices({ culledTiles, tilemap }: IProcessedTilemapData): void {
        this.posVertices = [];
        this.texVertices = [];

        const height = Math.floor(culledTiles.length / tilemap.width);

        culledTiles.forEach((tilesetTile, tilemapTile) => {
            if (tilesetTile === 0) return;

            const px = (tilemapTile % tilemap.width) - tilemap.width / 2;
            const py = height / 2 - Math.floor(tilemapTile / tilemap.width);

            // prettier-ignore
            this.posVertices.push(
                px, py - 1,
                px + 1, py - 1,
                px, py,
                px, py,
                px + 1, py - 1,
                px + 1, py
            )

            const tx =
                ((tilesetTile - 1) % this.tileset.width) + this.tileset.texMargin.x + this.tileset.texCorrection.x;
            const ty =
                Math.floor((tilesetTile - 1) / this.tileset.width) +
                this.tileset.texMargin.y +
                this.tileset.texCorrection.y;

            // prettier-ignore
            this.texVertices.push( 
                tx, ty + this.tileset.texHeight,
                tx + this.tileset.texWidth, ty + this.tileset.texHeight,
                tx, ty,
                tx, ty,
                tx + this.tileset.texWidth, ty + this.tileset.texHeight,
                tx + this.tileset.texWidth, ty
            );
        });
    }
}
