import { Tile } from "../../Core/Tilemap/Tile";
import { Tileset } from "../../Tileset";
import { Flip, RenderOrder, TilemapRenderer } from "./TilemapRenderer";

export interface CsvTilemapConfig {
    tileset: Tileset;
    tilemapData: string;
    tileScale?: number;
    smooth?: boolean;
    alpha?: number;
    renderOrder?: RenderOrder;
}

const MAX_TILES: number = 999;
const FLIP_H: number = 1; // flip horizontal
const FLIP_V: number = 2; // flip vertical
const FLIP_B: number = 3; // flip both horizontal and vertical

export const TYPE_TILEMAP_RENDERER: string = "TilemapRenderer";

export class CsvTilemapRenderer extends TilemapRenderer {
    private alpha: number = 1;

    constructor(config: CsvTilemapConfig) {
        super();

        this.type = TYPE_TILEMAP_RENDERER;

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;
        this.tileScale = config.tileScale ?? 1;
        this.smooth = config.smooth ?? false;
        this.alpha = config.alpha ?? 1;
        this.renderOrder = config.renderOrder ?? this.renderOrder;
    }

    protected processTilemap(): void {
        const rows = this.tilemapData.trim().split("\n");

        rows.forEach((rowData: string, row: number) => {
            const parsedRow: string[] = rowData.split(",");

            parsedRow.forEach((data: string, col: number) => {
                const parsed: number = parseInt(data.trim());
                let tile: Tile = null;
                const flip: Flip = { h: false, v: false };

                if (isNaN(parsed) === false) {
                    const id: number = parsed > MAX_TILES ? parsed % 1000 : parsed;
                    const flipDigit: number = Math.round(parsed / 1000);

                    tile = this.tileset.getTile(id);
                    flip.h = [FLIP_H, FLIP_B].includes(flipDigit);
                    flip.v = [FLIP_V, FLIP_B].includes(flipDigit);
                }
                this.processTile(tile, col, row, this.alpha, flip);
            });
        });
        this.tilemapProcessed = true;
    }
}
