import Vector2 from "./Helper/Vector2";
import Rectangle from "./Helper/Rectangle";

export default class Tileset {
    image = null;
    offset = new Vector2(0, 0);

    tileWidth = 0;
    tileHeight = 0;
    tileOffset = new Vector2(0, 0);
    
    gridWidth = 0; // in number of tails
    gridHeight = 0; // in number of tails

    tiles = [];
    loaded = false;

    constructor(config) {
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

    generateTiles() {
        let index = 1;

        for (let col = 0; col < this.gridWidth; col++) {
            for (let row = 0; row < this.gridHeight; row++) {
                this.tiles[index] = new Rectangle(
                    (col * this.tileWidth) + this.offset.x + this.tileOffset.x,
                    (row * this.tileHeight) + this.offset.y + this.tileOffset.y,
                    this.tileWidth,
                    this.tileHeight
                );

                index++;
            }    
        }

        this.loaded = true;
    }

    /**
     * @param {int} index
     * @returns {Rectangle|null}
     */
    getTile(index) {
        return this.tiles[index] ? this.tiles[index] : null;
    }
}