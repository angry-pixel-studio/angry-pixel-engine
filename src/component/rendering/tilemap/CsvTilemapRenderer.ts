import { Tile } from "./Tile";
import { Flip, TilemapRenderer, TilemapRendererOptions } from "./TilemapRenderer";

export interface CsvTilemapOptions extends TilemapRendererOptions {
    tilemapData: string;
    alpha?: number;
    tintColor?: string;
}

const maxTiles = 999;
const flipH = 1; // flip horizontal
const flipV = 2; // flip vertical
const flipB = 3; // flip both horizontal and vertical
const layer = "csv";

export class CsvTilemapRenderer extends TilemapRenderer {
    public tilemapData: string;
    public alpha: number = 1;
    public tintColor: string = null;

    protected init(config: CsvTilemapOptions): void {
        super.init(config);

        this.tilemapData = config.tilemapData;
        this.alpha = config.alpha ?? this.alpha;
        this.tintColor = config.tintColor ?? this.tintColor;
    }

    protected processTilemap(): void {
        this.processLayer({
            layer,
            alpha: this.alpha,
            tintColor: this.tintColor,
        });

        const rows = this.tilemapData.trim().split("\n");

        rows.forEach((rowData: string, row: number) => {
            const parsedRow: string[] = rowData.split(",");

            parsedRow.forEach((data: string, col: number) => {
                const parsed: number = parseInt(data.trim());
                let tile: Tile = null;
                const flip: Flip = { h: false, v: false };

                if (isNaN(parsed) === false) {
                    const id: number = parsed > maxTiles ? parsed % 1000 : parsed;
                    const flipDigit: number = Math.round(parsed / 1000);

                    tile = this.tileset.getTile(id);
                    flip.h = [flipH, flipB].includes(flipDigit);
                    flip.v = [flipV, flipB].includes(flipDigit);
                }
                this.processTile({
                    layer,
                    tile,
                    col,
                    row,
                    flip,
                    offset: { x: 0, y: 0 },
                });
            });
        });
        this.tilemapProcessed = true;
    }
}
