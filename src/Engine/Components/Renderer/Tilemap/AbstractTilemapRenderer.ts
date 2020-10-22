import Component from "../../../Component";
import ImageRenderData from "../../../Core/Rendering/RenderData/ImageRenderData";
import RenderManager from "../../../Core/Rendering/RenderManager";
import { container } from "../../../Game";
import Rectangle from "../../../Helper/Rectangle";
import Tileset from "../../../Tileset";
import { TiledTilemap } from "./TiledTilemap";

export default abstract class AbstractTilemapRenderer extends Component {
    public tileset: Tileset = null;
    public tilemapData: string;
    public tiledTilemap: TiledTilemap;
    public tileScale: number = 1;
    public smooth: boolean = true; // default TRUE to avoid tiles bleeding
    public showTileset: boolean = false;

    protected renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    protected tilemapProcessed: boolean = false;
    protected processedData: ImageRenderData[] = [];

    protected _width: number = 0;
    protected _height: number = 0;

    protected _realTiles: Rectangle[] = [];
    protected _realWidth: number = 0;
    protected _realHeight: number = 0;

    protected start(): void {
        this.update();
    }

    protected update(): void {
        if (this.tileset.loaded && this.showTileset === true && this.tilemapProcessed === false) {
            this.processTileset();
            this.updateTilesPosition();
        } else if (this.tileset.loaded && this.tilemapProcessed === false) {
            this.processTilemap();
            this.updateTilesPosition();
        }

        if (this.tileset.loaded && this.tilemapProcessed === true) {
            this.processedData.forEach((renderData) => this.renderManager.addToRenderStack(renderData));
        }
    }

    protected processTileset(): void {
        let index = 0;

        for (let row = 0; row < this.tileset.gridHeight; row++) {
            for (let col = 0; col < this.tileset.gridWidth; col++) {
                const tile = this.tileset.getTile(index);

                if (tile !== null) {
                    this.updateSizeInfo(col, row);
                    this.processTile(tile, col, row);
                }

                index++;
            }
        }

        this.tilemapProcessed = true;
    }

    protected abstract processTilemap(): void;

    protected updateSizeInfo(col: number, row: number): void {
        if (this._width < col) {
            this._width = col;
            this._realWidth = this._width * this.tileset.tileWidth * this.tileScale;
        }

        if (this._height < row) {
            this._height = row;
            this._realHeight = this._height * this.tileset.tileHeight * this.tileScale;
        }
    }

    protected processTile(tile: Rectangle, col: number, row: number, alpha: number = 1): void {
        const renderData: ImageRenderData = new ImageRenderData();

        const tWidth: number = this.tileset.tileWidth * this.tileScale;
        const tHeight: number = this.tileset.tileHeight * this.tileScale;

        renderData.position.x = this.gameObject.transform.position.x + col * tWidth + tWidth / 2;
        renderData.position.y = this.gameObject.transform.position.y - row * tHeight - tHeight / 2;

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = tile.width * this.tileScale;
        renderData.height = tile.height * this.tileScale;
        renderData.slice = tile;
        renderData.smooth = this.smooth;
        renderData.alpha = alpha;

        this.processedData.push(renderData);
    }

    protected updateTilesPosition(): void {
        this.processedData.forEach((renderData) => {
            renderData.position.x -= Math.floor(this._realWidth / 2);
            renderData.position.y += Math.floor(this._realHeight / 2);
            this.processRealTile(renderData);
        });
    }

    protected processRealTile(renderData: ImageRenderData): void {
        this._realTiles.push(
            new Rectangle(renderData.position.x, renderData.position.y, renderData.width, renderData.height)
        );
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get realWidth(): number {
        return this._realWidth;
    }

    public get realHeight(): number {
        return this._realHeight;
    }

    public get tiles(): Rectangle[] {
        return this._realTiles;
    }
}
