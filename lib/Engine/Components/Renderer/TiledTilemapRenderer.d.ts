import { Tileset } from "../../Tileset";
import { TiledTilemap } from "./Tilemap/TiledTilemap";
import { TilemapRenderer } from "./Tilemap/TilemapRenderer";
interface Config {
    tileset: Tileset;
    tilemapData: TiledTilemap;
    tileScale: number;
    smooth: boolean;
}
export declare const TYPE_TILED_RENDERER: string;
export declare class TiledTilemapRenderer extends TilemapRenderer {
    constructor({ tileset, tilemapData, tileScale, smooth }: Config);
    protected processTilemap(): void;
    private processChunk;
}
export {};
