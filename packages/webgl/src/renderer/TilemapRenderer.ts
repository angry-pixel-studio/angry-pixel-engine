import { mat4 } from "gl-matrix";
import { Vector2 } from "@angry-pixel/math";
import { CameraData, RenderData, RenderDataType, Renderer } from "./Renderer";
import { ProgramManager } from "../program/ProgramManager";
import { TextureManager } from "../texture/TextureManager";
import {
    createVertexBuffersRegistry,
    growFloat32Array,
    hexToRgba,
    setProjectionMatrix,
    VertexBuffers,
    writeQuad,
} from "./utils";

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
    /** The id of the first tile of the tileset. Defaults to 1 */
    firstgid?: number;
    /** The number of tiles of the tileset. Obtained from the image if it is not set */
    tileCount?: number;
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
    /** The id of the first tile of the tileset */
    firstgid: number;
    /** The number of tiles of the tileset */
    tileCount: number;
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

/**
 * GPU buffers of a single tilemap render data, plus the snapshot of the inputs its vertices were generated from.
 * @internal
 */
type TilemapVertexEntry = {
    buffers: VertexBuffers;
    vertexCount: number;
    generated: boolean;
    tileset: Tileset;
    texData: TilesetTexData;
    width: number;
    /** Float64 instead of Int32, so Tiled ids carrying the flip flags in their high bits are stored exactly */
    tiles: Float64Array;
    tilesLength: number;
    /** Distinct ids of the tiles of this tileset present in the chunk */
    tilesetTiles: Set<number>;
    /** Tile displayed by each animated tile of the chunk, when the vertices were generated */
    animationFrames: Map<number, number>;
};

export class TilemapRenderer implements Renderer {
    public readonly type: RenderDataType.Tilemap;

    private projectionMatrix: mat4;
    private modelMatrix: mat4;
    private textureMatrix: mat4;
    private posVertices: Float32Array = new Float32Array(0);
    private texVertices: Float32Array = new Float32Array(0);

    // every render data owns its buffers, so the vertices are uploaded only when the tilemap changes
    private readonly entries: WeakMap<TilemapRenderData, TilemapVertexEntry> = new WeakMap();
    private readonly buffersRegistry: FinalizationRegistry<VertexBuffers>;

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
        this.buffersRegistry = createVertexBuffersRegistry(this.gl);
    }

    public render(renderData: TilemapRenderData, cameraData: CameraData, lastRender?: RenderDataType): boolean {
        this.processTileset(renderData.tileset);

        const entry = this.getOrCreateEntry(renderData);
        if (this.isDirty(entry, renderData)) this.updateVertices(entry, renderData);

        if (entry.vertexCount === 0) return false;

        // consecutive tilemaps use different buffers, so the attributes are always set up
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.positionBuffer);
        this.gl.enableVertexAttribArray(this.programManager.positionCoordsAttr);
        this.gl.vertexAttribPointer(this.programManager.positionCoordsAttr, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.textureBuffer);
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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, entry.vertexCount);

        return true;
    }

    private getOrCreateEntry(renderData: TilemapRenderData): TilemapVertexEntry {
        let entry = this.entries.get(renderData);
        if (entry) return entry;

        entry = {
            buffers: { positionBuffer: this.gl.createBuffer(), textureBuffer: this.gl.createBuffer() },
            vertexCount: 0,
            generated: false,
            tileset: undefined,
            texData: undefined,
            width: undefined,
            tiles: new Float64Array(0),
            tilesLength: 0,
            tilesetTiles: new Set(),
            animationFrames: new Map(),
        };

        this.entries.set(renderData, entry);
        this.buffersRegistry.register(renderData, entry.buffers);

        return entry;
    }

    /**
     * The engine mutates the same render data every frame, and the tiles can be edited in place,
     * so the inputs are compared by value against the snapshot taken when the vertices were generated.
     */
    private isDirty(entry: TilemapVertexEntry, { tiles, tilemap, tileset }: TilemapRenderData): boolean {
        if (
            !entry.generated ||
            entry.tileset !== tileset ||
            entry.texData !== tileset._texData ||
            entry.width !== tilemap.width ||
            entry.tilesLength !== tiles.length
        ) {
            return true;
        }

        for (let i = 0; i < tiles.length; i++) {
            if (entry.tiles[i] !== tiles[i]) return true;
        }

        return this.animationChanged(entry, tileset._animationState);
    }

    /** Only the animated tiles present in the chunk are checked, so chunks without them are never dirty */
    private animationChanged(entry: TilemapVertexEntry, animationState: Map<number, number> | undefined): boolean {
        if (!animationState || animationState.size === 0) return entry.animationFrames.size > 0;

        let matched = 0;

        for (const [tile, frame] of animationState) {
            if (!entry.tilesetTiles.has(tile)) continue;
            if (!entry.animationFrames.has(tile) || entry.animationFrames.get(tile) !== frame) return true;
            matched++;
        }

        // an animated tile of the chunk is no longer animated
        return matched !== entry.animationFrames.size;
    }

    private updateVertices(entry: TilemapVertexEntry, renderData: TilemapRenderData): void {
        const { tiles, tilemap, tileset } = renderData;

        entry.generated = true;
        entry.tileset = tileset;
        entry.texData = tileset._texData;
        entry.width = tilemap.width;
        entry.tilesLength = tiles.length;
        if (entry.tiles.length < tiles.length) entry.tiles = new Float64Array(tiles.length);
        entry.tiles.set(tiles);

        const length = this.generateVertices(renderData, entry);
        entry.vertexCount = length / 2;

        if (length === 0) return;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.posVertices.subarray(0, length), this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, entry.buffers.textureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.texVertices.subarray(0, length), this.gl.DYNAMIC_DRAW);
    }

    /**
     * Translates the tileset into texture coordinates. Since the tileset cannot be updated at runtime,\
     * the result is cached in the tileset object and computed only once.
     */
    private processTileset(tileset: Tileset): void {
        if (tileset._texData) return;

        const { naturalWidth, naturalHeight } = tileset.image;

        if (!naturalWidth || !naturalHeight) return;

        const margin = tileset.margin ?? 0;
        const spacing = tileset.spacing ?? 0;
        const columns = Math.floor((naturalWidth - 2 * margin + spacing) / (tileset.tileWidth + spacing));
        const rows = Math.floor((naturalHeight - 2 * margin + spacing) / (tileset.tileHeight + spacing));

        tileset._texData = {
            columns,
            firstgid: tileset.firstgid ?? 1,
            tileCount: tileset.tileCount ?? columns * rows,
            margin: new Vector2(margin / naturalWidth, margin / naturalHeight),
            step: new Vector2(
                (tileset.tileWidth + spacing) / naturalWidth,
                (tileset.tileHeight + spacing) / naturalHeight,
            ),
            tileSize: new Vector2(tileset.tileWidth / naturalWidth, tileset.tileHeight / naturalHeight),
        };
    }

    /** Writes the vertices into the scratch arrays and returns the number of values written to each of them */
    private generateVertices(
        { tiles, tilemap, tileset }: TilemapRenderData,
        { tilesetTiles, animationFrames }: TilemapVertexEntry,
    ): number {
        tilesetTiles.clear();
        animationFrames.clear();

        if (!tileset._texData) return 0;

        const { columns, firstgid, tileCount, margin, step, tileSize } = tileset._texData;
        const height = Math.floor(tiles.length / tilemap.width);
        const animationState = tileset._animationState;

        // 12 values per tile: two triangles of two coordinates each
        this.posVertices = growFloat32Array(this.posVertices, tiles.length * 12);
        this.texVertices = growFloat32Array(this.texVertices, tiles.length * 12);

        let length = 0;

        for (let tilemapTile = 0; tilemapTile < tiles.length; tilemapTile++) {
            const tile = tiles[tilemapTile];

            // the tiles that do not belong to this tileset are rendered by the render data of the tileset that owns them
            if (tile < firstgid || tile >= firstgid + tileCount) continue;

            tilesetTiles.add(tile);
            if (animationState?.has(tile)) animationFrames.set(tile, animationState.get(tile));

            const tilesetTile = animationState?.get(tile) ?? tile;

            const px = (tilemapTile % tilemap.width) - tilemap.width / 2;
            const py = height / 2 - Math.floor(tilemapTile / tilemap.width);

            writeQuad(this.posVertices, length, px, py - 1, px + 1, py);

            const tx = margin.x + ((tilesetTile - firstgid) % columns) * step.x;
            const ty = margin.y + Math.floor((tilesetTile - firstgid) / columns) * step.y;

            writeQuad(this.texVertices, length, tx, ty + tileSize.y, tx + tileSize.x, ty);

            length += 12;
        }

        return length;
    }
}
