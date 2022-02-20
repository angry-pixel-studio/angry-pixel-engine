import { Offset, RenderOrder, TilemapRenderer, TilemapRendererConfig } from "./TilemapRenderer";
import { Tile } from "./Tile";
import { ComponentTypes } from "../../ComponentTypes";

export interface TiledTilemapConfig extends TilemapRendererConfig {
    tilemapData: TiledTilemap;
    layerName?: string;
}

export class TiledTilemapRenderer extends TilemapRenderer {
    public readonly tiledTilemap: TiledTilemap;
    public readonly layerName: string;

    constructor(config: TiledTilemapConfig) {
        config.renderOrder = config.renderOrder ?? (config.tilemapData.renderorder as RenderOrder);
        super(config);

        this.type = ComponentTypes.TiledTilemapRenderer;

        this.tiledTilemap = config.tilemapData;
        this.layerName = config.layerName ?? null;
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

        this.tilemapProcessed = true;
    }

    private processChunk(layer: string, chunk: TiledChunk | TiledLayer, offset: Offset = { x: 0, y: 0 }): void {
        let dataIndex: number = 0;

        for (let row = 0; row < chunk.height; row++) {
            for (let col = 0; col < chunk.width; col++) {
                const tile: Tile = this.tileset.getTile(chunk.data[dataIndex] - 1);

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
    tintcolor?: string;
}
