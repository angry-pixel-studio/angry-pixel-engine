import { Tileset } from "../../Tileset";
import { TiledChunk, TiledLayer, TiledTilemap } from "../../Core/Tilemap/TiledTilemap";
import { TilemapRenderer } from "./TilemapRenderer";
import { Tile } from "../../Core/Tilemap/Tile";

interface Config {
    tileset: Tileset;
    tilemapData: TiledTilemap;
    tileScale?: number;
    smooth?: boolean;
}

export const TYPE_TILED_RENDERER: string = "TiledRenderer";

export class TiledTilemapRenderer extends TilemapRenderer {
    constructor(config: Config) {
        super();

        this.type = TYPE_TILED_RENDERER;

        this.tileset = config.tileset;
        this.tiledTilemap = config.tilemapData;
        this.tileScale = config.tileScale ?? 1;
        this.smooth = config.smooth ?? false;
    }

    protected processTilemap(): void {
        this.tiledTilemap.layers.forEach((layer: TiledLayer) =>
            this.tiledTilemap.infinite === true
                ? layer.chunks.forEach((chunk: TiledChunk) => this.processChunk(chunk, layer.opacity))
                : this.processChunk(layer, layer.opacity)
        );

        this.tilemapProcessed = true;
    }

    private processChunk(chunk: TiledChunk | TiledLayer, alpha: number = 1): void {
        let dataIndex: number = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile: Tile = this.tileset.getTile(chunk.data[dataIndex] - 1);
                if (tile !== null) {
                    this.processTile(tile, col + chunk.x, row + chunk.y, alpha);
                }

                dataIndex++;
            }
        }
    }
}