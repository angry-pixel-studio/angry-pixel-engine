import { Tileset } from "../../Tileset";
import { AbstractTilemapRenderer } from "./Tilemap/AbstractTilemapRenderer";

type Config = {
    tileset: Tileset;
    tilemapData: string;
    tileScale: number;
    smooth: boolean;
    alpha: number;
};

export class TilemapRenderer extends AbstractTilemapRenderer {
    private alpha: number = 1;

    constructor(config: Config) {
        super();

        this.tileset = config.tileset;
        this.tilemapData = config.tilemapData;
        this.tileScale = config.tileScale ?? this.tileScale;
        this.smooth = config.smooth ?? this.smooth;
        this.alpha = config.alpha ?? this.alpha;
    }

    protected processTilemap(): void {
        const data = this.tilemapData.trim().split("\n");

        data.forEach((rowData: string, row: number) => {
            const parsedRow = rowData.match(/.{1,5}/g);
            if (parsedRow) {
                parsedRow.forEach((colData: string, col: number) => {
                    const stringId = colData.trim().replace("[", "").replace("]", "");
                    const tile = this.tileset.getTile(parseInt(stringId));

                    if (tile !== null) {
                        this.processTile(tile, col, row, this.alpha);
                    }
                });
            }
        });
        this.tilemapProcessed = true;
    }
}
