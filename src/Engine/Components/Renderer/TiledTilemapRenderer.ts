import { Tileset } from "../../Tileset";
import { TiledChunk, TiledLayer, TiledTilemap } from "../../Core/Tilemap/TiledTilemap";
import { Offset, RenderOrder, TilemapRenderer } from "./TilemapRenderer";
import { Tile } from "../../Core/Tilemap/Tile";

export interface TiledTilemapConfig {
    tileset: Tileset;
    tilemapData: TiledTilemap;
    layerName?: string;
    tileScale?: number;
    smooth?: boolean;
    renderOrder?: RenderOrder;
}

export const TYPE_TILED_RENDERER: string = "TiledRenderer";

export class TiledTilemapRenderer extends TilemapRenderer {
    public layerName: string;

    constructor(config: TiledTilemapConfig) {
        super();

        this.type = TYPE_TILED_RENDERER;

        this.tileset = config.tileset;
        this.tiledTilemap = config.tilemapData;
        this.tileScale = config.tileScale ?? 1;
        this.smooth = config.smooth ?? false;
        this.layerName = config.layerName ?? null;
        this.renderOrder = config.renderOrder ?? (this.tiledTilemap.renderorder as RenderOrder);
    }

    protected processTilemap(): void {
        this.tiledTilemap.layers.forEach((layer: TiledLayer) => {
            if (layer.visible === true && (this.layerName === null || this.layerName === layer.name)) {
                this.tiledTilemap.infinite === true
                    ? layer.chunks.forEach((chunk: TiledChunk) =>
                          this.processChunk(chunk, layer.opacity, { x: layer.offsetx ?? 0, y: layer.offsety ?? 0 })
                      )
                    : this.processChunk(layer, layer.opacity, { x: layer.offsetx ?? 0, y: layer.offsety ?? 0 });
            }
        });

        this.tilemapProcessed = true;
    }

    private processChunk(chunk: TiledChunk | TiledLayer, alpha: number = 1, offset: Offset = { x: 0, y: 0 }): void {
        let dataIndex: number = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile: Tile = this.tileset.getTile(chunk.data[dataIndex] - 1);

                this.processTile(tile, col + chunk.x, row + chunk.y, alpha, { h: false, v: false }, offset);

                dataIndex++;
            }
        }
    }
}
