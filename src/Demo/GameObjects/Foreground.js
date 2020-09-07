import GameObject from "../../Engine/GameObject";
import SpriteRenderer from "../../Engine/Components/SpriteRenderer";
import Sprite from "../../Engine/Sprite";
import Vector2 from "../../Engine/Helper/Vector2";
import TilemapRenderer from "../../Engine/Components/TileMapRenderer";
import tilemapData from "../Tilemaps/Foreground.json";
import Tileset from "../../Engine/TileSet";

export const TAG_FOREGROUND = 'Foreground';
export const LAYER_FOREGROUND = 'Foreground';

//const SPRITE_PATH = 'image/demo/testmap.png';
const SPRITE_PATH = 'image/demo/earth-cave.png';

export default class Foreground extends GameObject {
    width = 2048;
    height = 896;
    spriteRenderer = null;

    constructor() {
        super();

        this.tag = TAG_FOREGROUND;
        this.layer = LAYER_FOREGROUND;
        this.transform.position.x = -450;
        this.transform.position.y = 640;

        const image = new Image();
        image.src = SPRITE_PATH;
        
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

        //this.getComponent('TilemapRenderer').showTileset = true;
    }

    update() {
        /*if (this.spriteRenderer.sprite.loaded && this.width === 0) {
            this.width = this.spriteRenderer.sprite.width * this.transform.scale.x;
            this.height = this.spriteRenderer.sprite.height * this.transform.scale.y;
        }*/
    }
}