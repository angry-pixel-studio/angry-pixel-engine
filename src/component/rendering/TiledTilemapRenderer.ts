import { IRenderManager, ITilemapRenderData, RenderDataType, RenderLocation } from "angry-pixel-2d-renderer";
import { Vector2 } from "angry-pixel-math";
import { RenderComponent } from "../../core/Component";
import { ITilemapRenderer, Tileset, TilemapOrientation } from "./TilemapRenderer";

export interface TiledTilemapRendererOptions {
    tiledData: TiledTilemap;
    tilemapLayer: string;
    tileset: Tileset;
    tileWidth: number;
    tileHeight: number;
    layer?: string;
    orientation?: TilemapOrientation;
    smooth?: boolean;
}

export class TiledTilemapRenderer extends RenderComponent implements ITilemapRenderer {
    public tiles: number[] = [];
    public tileWidth: number;
    public tileHeight: number;
    public width: number;
    public height: number;
    public orientation: TilemapOrientation;
    public tintColor: string;
    public alpha: number;

    private tiledData: TiledTilemap;
    private tilemapLayer: string;
    private tileset: Tileset;
    private layer: string;
    private smooth?: boolean;

    private tilesetTileIds: number[] = [];
    private chunks: TiledChunk[] = [];
    private scaledTileWidth: number = 0;
    private scaledTileHeight: number = 0;

    public realWidth: number;
    public realHeight: number;

    private renderData: ITilemapRenderData[] = [];

    protected init({
        tiledData,
        tilemapLayer,
        tileset,
        tileWidth,
        tileHeight,
        layer,
        orientation,
        smooth,
    }: TiledTilemapRendererOptions): void {
        this.tiledData = tiledData;
        this.tilemapLayer = tilemapLayer;
        this.tileset = tileset;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.layer = layer;
        this.smooth = smooth ?? false;

        this.width = this.tiledData.width;
        this.height = this.tiledData.height;
        this.orientation = orientation;

        this.processTilemap();
    }

    protected update(): void {
        this.updateRenderData();

        this.renderData.forEach((renderData) => this.renderManager.addRenderData(renderData));
    }

    private processTilemap(): void {
        this.tiledData.layers.forEach((layer: TiledLayer) => {
            if (layer.visible === true && this.tilemapLayer === layer.name) {
                this.alpha = layer.opacity;
                this.tintColor = layer.tintcolor;

                this.tiledData.infinite === true
                    ? layer.chunks.forEach((chunk) => this.processChunk(chunk))
                    : this.processChunk(layer);
            }
        });

        this.updateRenderData();

        this.tilesetTileIds = []; // free memory
    }

    private processChunk(chunk: TiledChunk | TiledLayer): void {
        const renderData: ITilemapRenderData = {
            type: RenderDataType.Tilemap,
            layer: this.layer ?? this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            tileset: this.tileset,
            tilemap: {
                width: chunk.width,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
            },
            tiles: chunk.data.map((tile) => this.getTilesetTileId(tile)),
            orientation: this.orientation,
            smooth: this.smooth,
        };

        if (chunk.type && chunk.type === "tilelayer") {
            this.tiles = renderData.tiles;
        } else {
            renderData.tiles.forEach((tile, index) => {
                this.tiles[
                    this.tiledData.width * (chunk.y + Math.floor(index / chunk.width)) + chunk.x + (index % chunk.width)
                ] = tile;
            });
        }

        this.renderData.push(renderData);
        this.chunks.push(chunk as TiledChunk);
    }

    private getTilesetTileId(tile: number): number {
        if (!this.tilesetTileIds[tile]) {
            this.tilesetTileIds[tile] = this.tiledData.tilesets.reduce(
                (id, tileset) => (tile >= tileset.firstgid ? tile - tileset.firstgid + 1 : id),
                0
            );
        }

        return this.tilesetTileIds[tile];
    }

    private updateRenderData(): void {
        this.scaledTileWidth = this.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tileHeight * this.gameObject.transform.scale.y;

        this.realWidth = this.tiledData.width * this.scaledTileWidth;
        this.realHeight = this.tiledData.height * this.scaledTileHeight;

        this.renderData.forEach((renderData, index) => {
            renderData.layer = this.layer ?? this.gameObject.layer;

            renderData.position.set(
                this.gameObject.transform.position.x + this.chunks[index].x * this.scaledTileWidth,
                this.gameObject.transform.position.y + this.chunks[index].y * this.scaledTileHeight
            );

            renderData.tilemap.tileWidth = this.scaledTileWidth;
            renderData.tilemap.tileHeight = this.scaledTileHeight;
            renderData.tintColor = this.tintColor;
            renderData.alpha = this.alpha;
        });
    }
}

export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
    renderorder: string;
    tilesets: { firstgid: number }[];
    tilewidth: number;
    tileheight: number;
}

export interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
}

export interface TiledLayer {
    name: string;
    id: number;
    chunks?: TiledChunk[];
    data?: number[];
    x: number;
    y: number;
    type: string;
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
    startx?: number;
    starty?: number;
    offsetx?: number;
    offsety?: number;
    tintcolor?: string;
}
