import { Offset, RenderOrder, TilemapRenderer, TilemapRendererConfig } from "./TilemapRenderer";
import { Tile } from "../../Core/Tilemap/Tile";

export interface TiledTilemapConfig extends TilemapRendererConfig {
    tilemapData: TiledTilemap;
    layerName?: string;
}

export const TYPE_TILED_RENDERER: string = "TiledRenderer";

export class TiledTilemapRenderer extends TilemapRenderer {
    public readonly tiledTilemap: TiledTilemap;
    public readonly layerName: string;

    constructor(config: TiledTilemapConfig) {
        config.renderOrder = config.renderOrder ?? (config.tilemapData.renderorder as RenderOrder);
        super(config);

        this.type = TYPE_TILED_RENDERER;

        this.tiledTilemap = config.tilemapData;
        this.layerName = config.layerName ?? null;
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

export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
    renderorder: string;
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
}
