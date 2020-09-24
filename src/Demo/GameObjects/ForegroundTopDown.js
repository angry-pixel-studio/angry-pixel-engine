import GameObject from "../../Engine/GameObject";
import TilemapRenderer from '../../Engine/Components/Renderer/TilemapRenderer';
import tilemapData from "../Tilemaps/Foreground";
import Tileset from "../../Engine/Tileset";
import TilemapCollider from "./../../Engine/Components/Colliders/TilemapCollider";
import { LAYER_FOREGROUND } from "../Config/renderLayers";
import AssetManager from "../../Engine/AssetManager";

export const TAG_FOREGROUND = 'Foreground';

export default class ForegroundTopDown extends GameObject {
    width = 0;
    height = 0;
    tilemapRenderer = null;

    constructor() {
        super();

        this.tag = TAG_FOREGROUND;
        this.layer = LAYER_FOREGROUND;

        this.addComponent(() => new TilemapRenderer({
            tileset: new Tileset({
                image: AssetManager.getImage('image/demo/earth-cave.png'),
                tileWidth: 16,
                tileHeight: 16,
                gridWidth: 11,
                gridHeight: 10
            }),
            tilemapData: tilemapData,
            tileScale: 4
        }), 'TilemapRenderer');
        this.addComponent(() => new TilemapCollider({
            tilemapData: tilemapData,
            tileWidth: 16,
            tileHeight: 16,
            tileScale: 4,
        }));

        this.tilemapRenderer = this.getComponent('TilemapRenderer');
    }

    update() {
        if (this.tilemapRenderer.tileset.loaded && this.width === 0) {
            this.width = this.tilemapRenderer.realWidth;
            this.height = this.tilemapRenderer.realHeight;
        }
    }
}
