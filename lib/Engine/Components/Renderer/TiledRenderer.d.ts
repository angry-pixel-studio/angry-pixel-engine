import { Tileset } from "../../Tileset";
import { TiledTilemap } from "./Tilemap/TiledTilemap";
import { AbstractTilemapRenderer } from "./Tilemap/AbstractTilemapRenderer";
declare type Config = {
    tileset: Tileset;
    tilemapData: TiledTilemap;
    tileScale: number;
    smooth: boolean;
};
export declare class TiledRenderer extends AbstractTilemapRenderer {
    constructor(config: Config);
    protected processTilemap(): void;
    private processChunk;
}
export {};
