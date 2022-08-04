import { Offset, RenderOrder, TilemapRenderer, TilemapRendererOptions } from "./TilemapRenderer";
import { Tile } from "./Tile";

export interface TiledTilemapOptions extends TilemapRendererOptions {
    tilemapData: TiledTilemap;
    layerName?: string;
}

export class TiledTilemapRenderer extends TilemapRenderer {
    public tiledTilemap: TiledTilemap;
    public layerName: string;

    private tilesetTileIds: number[];

    protected init(config: TiledTilemapOptions): void {
        config.renderOrder = config.renderOrder ?? (config.tilemapData.renderorder as RenderOrder);
        super.init(config);

        this.tiledTilemap = config.tilemapData;
        this.layerName = config.layerName ?? null;
        this.tilesetTileIds = [];
    }

    protected processTilemap(): void {
        this.tiledTilemap.layers.forEach((layer: TiledLayer) => {
            if (layer.visible === true && (this.layerName === null || this.layerName === layer.name)) {
                if (!this.renderData.has(layer.name)) {
                    this.processLayer({
                        layer: layer.name,
                        alpha: layer.opacity,
                        tintColor: layer.tintcolor ?? null,
                    });
                }

                this.tiledTilemap.infinite === true
                    ? layer.chunks.forEach((chunk: TiledChunk) =>
                          this.processChunk(layer.name, chunk, { x: layer.offsetx ?? 0, y: layer.offsety ?? 0 })
                      )
                    : this.processChunk(layer.name, layer, { x: layer.offsetx ?? 0, y: layer.offsety ?? 0 });
            }
        });

        this.tilesetTileIds = []; // free memory
        this.tilemapProcessed = true;
    }

    private processChunk(layer: string, chunk: TiledChunk | TiledLayer, offset: Offset = { x: 0, y: 0 }): void {
        let dataIndex: number = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile: Tile = this.tileset.getTile(this.getTilesetTileId(chunk.data[dataIndex]));

                this.processTile({
                    layer,
                    tile,
                    col: col + chunk.x,
                    row: row + chunk.y,
                    flip: { h: false, v: false },
                    offset,
                });

                dataIndex++;
            }
        }
    }

    private getTilesetTileId(tileId: number): number {
        if (!this.tilesetTileIds[tileId]) {
            this.tilesetTileIds[tileId] = this.tiledTilemap.tilesets.reduce(
                (id, tileset) => (tileId >= tileset.firstgid ? tileId - tileset.firstgid : id),
                -1
            );
        }

        return this.tilesetTileIds[tileId];
    }
}

export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
    renderorder: string;
    tilesets: { firstgid: number }[];
}

export interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TiledLayer {
    name: string;
    id: number;
    chunks?: TiledChunk[];
    data?: number[];
    x: number;
    y: number;
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
