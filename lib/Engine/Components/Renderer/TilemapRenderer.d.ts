import { Tileset } from "../../Tileset";
import { AbstractTilemapRenderer } from "./Tilemap/AbstractTilemapRenderer";
interface Config {
    tileset: Tileset;
    tilemapData: string;
    tileScale: number;
    smooth: boolean;
    alpha: number;
}
export declare const TYPE_TILEMAP_RENDERER: string;
export declare class TilemapRenderer extends AbstractTilemapRenderer {
    private alpha;
    constructor({ tileset, tilemapData, tileScale, smooth, alpha }: Config);
    protected processTilemap(): void;
}
export {};
