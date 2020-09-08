import GameObject from "../../Engine/GameObject";
import TiledRenderer from "../../Engine/Components/TiledRenderer";
import TilemapRenderer from '../../Engine/Components/TilemapRenderer';
import tiledData from "../Tilemaps/Foreground.json";
import tilemapData from "../Tilemaps/Foreground";
import Tileset from "../../Engine/Tileset";

export const TAG_FOREGROUND = 'Foreground';
export const LAYER_FOREGROUND = 'Foreground';

const SPRITE_PATH = 'image/demo/earth-cave.png';

export default class Foreground extends GameObject {
    width = 0;
    height = 0;
    tilemapRenderer = null;

    constructor() {
        super();

        this.tag = TAG_FOREGROUND;
        this.layer = LAYER_FOREGROUND;

        const image = new Image();
        image.src = SPRITE_PATH;

        /*this.addComponent(() => new TiledRenderer({
            tileset: new Tileset({
                image: image,
                tileWidth: 16,
                tileHeight: 16,
                gridWidth: 11,
                gridHeight: 10
            }),
            tilemapData: tiledData,
            tileScale: 4
        }), 'TilemapRenderer');*/

        this.addComponent(() => new TilemapRenderer({
            tileset: new Tileset({
                image: image,
                tileWidth: 16,
                tileHeight: 16,
                gridWidth: 11,
                gridHeight: 10
            }),
            tilemapData: tilemapData,
            tileScale: 4
        }), 'TilemapRenderer');

        this.tilemapRenderer = this.getComponent('TilemapRenderer');
        //this.tilemapRenderer.showTileset = true;
    }

    update() {
        if (this.tilemapRenderer.tileset.loaded && this.width === 0) {
            this.width = this.tilemapRenderer.realWidth;
            this.height = this.tilemapRenderer.realHeight;
        }
    }
}
