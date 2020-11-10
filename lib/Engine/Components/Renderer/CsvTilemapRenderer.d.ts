import { Tileset } from "../../Tileset";
import { TilemapRenderer } from "./Tilemap/TilemapRenderer";
interface Config {
    tileset: Tileset;
    tilemapData: string;
    tileScale: number;
    smooth: boolean;
    alpha: number;
}
export declare const TYPE_TILEMAP_RENDERER: string;
export declare class CsvTilemapRenderer extends TilemapRenderer {
    private alpha;
    constructor({ tileset, tilemapData, tileScale, smooth, alpha }: Config);
    protected processTilemap(): void;
}
export {};
