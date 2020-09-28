import Vector2 from "./Helper/Vector2";
import Rectangle from "./Helper/Rectangle";

interface config {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    gridWidth: number;
    gridHeight: number;
    offset: Vector2 | null;
    tileOffset: Vector2 | null;
}

export default class Tileset {
    public image: HTMLImageElement = null;
    public offset: Vector2 = new Vector2(0, 0);
    public gridWidth: number = 0; // in number of tails
    public gridHeight: number = 0; // in number of tails
    public tileWidth: number = 0;
    public tileHeight: number = 0;
    public tileOffset: Vector2 = new Vector2(0, 0);

    private _tiles: Rectangle[] = [];
    private _loaded: boolean = false;

    constructor({ image, tileWidth, tileHeight, gridWidth, gridHeight, offset, tileOffset }: config) {
        // required
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        // optional
        this.offset = offset ? offset : this.offset;
        this.tileOffset = tileOffset ? tileOffset : this.tileOffset;

        if (this.image.naturalWidth) {
            this.generateTiles();
        } else {
            this.image.addEventListener("load", () => this.generateTiles());
        }
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

        this._loaded = true;
    }

    public getTile(index: number): Rectangle | null {
        return this._tiles[index] ? this._tiles[index] : null;
    }

    public get tiles(): Rectangle[] {
        return this._tiles;
    }

    public get loaded(): boolean {
        return this._loaded;
    }
}
