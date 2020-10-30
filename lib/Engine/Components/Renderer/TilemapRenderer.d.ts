import { Tileset } from "../../Tileset";
import { AbstractTilemapRenderer } from "./Tilemap/AbstractTilemapRenderer";
declare type Config = {
    tileset: Tileset;
    tilemapData: string;
    tileScale: number;
    smooth: boolean;
    alpha: number;
};
export declare class TilemapRenderer extends AbstractTilemapRenderer {
    private alpha;
    constructor(config: Config);
    protected processTilemap(): void;
}
export {};
