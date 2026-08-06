import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { ProgramManager } from "../program/ProgramManager";
import { TextureManager } from "../texture/TextureManager";
import { hexToRgba, setProjectionMatrix } from "./utils";

/**
 * Direction in which the tilemap will be rendered.
 * @internal
 */
export enum TilemapOrientation {
    Center,
    RightUp,
    RightDown,
    RightCenter,
}

export interface TilemapRenderData extends RenderData {
    tiles: number[];
    tilemap: Tilemap;
    tileset: Tileset;
    smooth?: boolean;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    rotation?: number;
    opacity?: number;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
    orientation?: TilemapOrientation;
}

export type Tileset = {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    /** Space in pixels between the tiles and the four edges of the image */
    margin?: number;
    /** Space in pixels between adjacent tiles */
    spacing?: number;
    /** Maps each animated tile id to the tile id currently displayed. @internal */
    _animationState?: Map<number, number>;
    /** Tileset values in texture coordinates. Computed once by the renderer. @internal */
    _texData?: TilesetTexData;
};

/**
 * Tileset values expressed in texture coordinates (0 to 1), plus the number of columns of the tileset.
 * @internal
 */
type TilesetTexData = {
    /** The width of the tileset (in tiles) */
    columns: number;
    /** The margin of the image */
    margin: Vector2;
    /** The distance between the origin of two adjacent tiles */
    step: Vector2;
    /** The size of a tile */
    tileSize: Vector2;
};

export type Tilemap = {
    width: number;
    tileWidth: number;
    tileHeight: number;
    height: number;
    realWidth: number;
    realHeight: number;
};

export class TilemapRenderer implements Renderer {
    public readonly type: RenderDataType.Tilemap;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private posVertices: number[] = [];
    private texVertices: number[] = [];
    private positionBuffer: WebGLBuffer;
    private textureBuffer: WebGLBuffer;

    // cache
    private lastTexture: WebGLTexture = null;

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
    }

    public render(renderData: TilemapRenderData, cameraData: CameraData, lastRender?: RenderDataType): boolean {
        if (renderData.tiles.reduce((acc, tile) => acc + tile, 0) === 0) return false;

        this.processTileset(renderData.tileset);
        this.generateVertices(renderData);

        if (this.posVertices.length === 0) return false;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.posVertices), this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texVertices), this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(this.programManager.texCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.texCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.modelMatrix = mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, [renderData.position.x, renderData.position.y, 0]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, renderData.rotation ?? 0);
        mat4.scale(this.modelMatrix, this.modelMatrix, [
            renderData.tilemap.tileWidth * (renderData.flipHorizontal ? -1 : 1),
            renderData.tilemap.tileHeight * (renderData.flipVertical ? -1 : 1),
            1,
        ]);

        // the texture vertices are already expressed in texture coordinates
        this.textureMatrix = mat4.identity(this.textureMatrix);

        setProjectionMatrix(this.projectionMatrix, this.gl, cameraData.zoom, cameraData.position);

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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.posVertices.length / 2);

        return true;
    }

    /**
     * Translates the tileset into texture coordinates. Since the tileset cannot be updated at runtime,\
     * the result is cached in the tileset object and computed only once.
     */
    private processTileset(tileset: Tileset): void {
        if (tileset._texData) return;

        const { naturalWidth, naturalHeight } = tileset.image;
        const margin = tileset.margin ?? 0;
        const spacing = tileset.spacing ?? 0;

        tileset._texData = {
            columns: Math.floor((naturalWidth - 2 * margin + spacing) / (tileset.tileWidth + spacing)),
            margin: new Vector2(margin / naturalWidth, margin / naturalHeight),
            step: new Vector2(
                (tileset.tileWidth + spacing) / naturalWidth,
                (tileset.tileHeight + spacing) / naturalHeight,
            ),
            tileSize: new Vector2(tileset.tileWidth / naturalWidth, tileset.tileHeight / naturalHeight),
        };
    }

    private generateVertices({ tiles, tilemap, tileset }: TilemapRenderData): void {
        this.posVertices = [];
        this.texVertices = [];

        const { columns, margin, step, tileSize } = tileset._texData;
        const height = Math.floor(tiles.length / tilemap.width);

        tiles.forEach((tile, tilemapTile) => {
            if (tile === 0) return;

            const tilesetTile = tileset._animationState?.get(tile) ?? tile;

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

            const tx = margin.x + ((tilesetTile - 1) % columns) * step.x;
            const ty = margin.y + Math.floor((tilesetTile - 1) / columns) * step.y;

            // prettier-ignore
            this.texVertices.push(
                tx, ty + tileSize.y,
                tx + tileSize.x, ty + tileSize.y,
                tx, ty,
                tx, ty,
                tx + tileSize.x, ty + tileSize.y,
                tx + tileSize.x, ty
            );
        });
    }
}
