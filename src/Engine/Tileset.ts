import { Vector2 } from "./Math/Vector2";
import { Rectangle } from "./Math/Rectangle";

interface Config {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    gridWidth: number;
    gridHeight: number;
    offset?: Vector2;
    tileOffset?: Vector2;
}

export class Tileset {
    public image: HTMLImageElement = null;
    public tileWidth: number;
    public tileHeight: number;
    public gridWidth: number; // in number of tails
    public gridHeight: number; // in number of tails
    public offset: Vector2 = new Vector2(0, 0);
    public tileOffset: Vector2 = new Vector2(0, 0);

    private _tiles: Rectangle[] = [];

    constructor(config: Config) {
        this.image = config.image;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        this.gridWidth = config.gridWidth;
        this.gridHeight = config.gridHeight;
        this.offset = config.offset ?? this.offset;
        this.tileOffset = config.tileOffset ?? this.tileOffset;

        this.generateTiles();
    }

    private generateTiles(): void {
        let index: number = 0;

        for (let row: number = 0; row < this.gridHeight; row++) {
            for (let col: number = 0; col < this.gridWidth; col++) {
                this._tiles[index] = new Rectangle(
                    col * this.tileWidth + this.offset.x + this.tileOffset.x,
                    row * this.tileHeight - this.offset.y - this.tileOffset.y,
                    this.tileWidth,
                    this.tileHeight
                );

                index++;
            }
        }
    }

    public getTile(index: number): Rectangle | null {
        return this._tiles[index] ? this._tiles[index] : null;
    }

    public get tiles(): Rectangle[] {
        return this._tiles;
    }
}
