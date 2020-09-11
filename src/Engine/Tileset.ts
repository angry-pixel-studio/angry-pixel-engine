import Vector2 from "./Helper/Vector2";
import Rectangle from "./Helper/Rectangle";

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

    constructor(config: {[key:string]: any}) {
        // required
        this.image = config.image;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        this.gridWidth = config.gridWidth;
        this.gridHeight = config.gridHeight;

        // optional
        this.offset = config.offset ? config.offset : this.offset;
        this.tileOffset = config.tileOffset ? config.tileOffset : this.tileOffset;

        if (this.image.naturalWidth) {
            this.generateTiles();
        } else {
            this.image.addEventListener('load', () => this.generateTiles());
        }
    }

    private generateTiles(): void {
        let index = 0;

        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                this._tiles[index] = new Rectangle(
                    (col * this.tileWidth) + this.offset.x + this.tileOffset.x,
                    (row * this.tileHeight) - this.offset.y - this.tileOffset.y,
                    this.tileWidth,
                    this.tileHeight
                );

                index++;
            }    
        }

        this._loaded = true;
    }

    public getTile(index: number): Rectangle|null {
        return this._tiles[index] ? this._tiles[index] : null;
    }

    public get tiles(): Rectangle[] {
        return this._tiles;
    }

    public get loaded(): boolean {
        return this._loaded;
    }
}