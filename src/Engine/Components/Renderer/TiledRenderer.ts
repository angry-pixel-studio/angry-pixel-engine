import Tileset from "../../Tileset";
import { TiledChunk, TiledLayer, TiledTilemap } from "./Tilemap/TiledTilemap";
import AbstractTilemapRenderer from "./Tilemap/AbstractTilemapRenderer";

type Config = {
    tileset: Tileset;
    tilemapData: TiledTilemap;
    tileScale: number;
    smooth: boolean;
};

export default class TiledRenderer extends AbstractTilemapRenderer {
    constructor(config: Config) {
        super();

        this.tileset = config.tileset;
        this.tiledTilemap = config.tilemapData;
        this.tileScale = config.tileScale ?? this.tileScale;
        this.smooth = config.smooth ?? this.smooth;
    }

    protected processTilemap(): void {
        this.tiledTilemap.layers.forEach((layer: TiledLayer) =>
            this.tiledTilemap.infinite === true
                ? layer.chunks.forEach((chunk: TiledChunk) => this.processChunk(chunk, layer.opacity))
                : this.processChunk(layer, layer.opacity)
        );

        this.tilemapProcessed = true;
    }

    private processChunk(chunk: TiledChunk, alpha: number = 1): void {
        let dataIndex = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile = this.tileset.getTile(chunk.data[dataIndex] - 1);
                if (tile !== null) {
                    this.processTile(tile, col + chunk.x, row + chunk.y, alpha);
                }

                dataIndex++;
            }
        }
    }
}
