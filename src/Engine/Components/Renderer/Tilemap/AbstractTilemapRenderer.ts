import Component from "../../../Component";
import ImageRenderData from "../../../Core/Rendering/RenderData/ImageRenderData";
import RenderManager from "../../../Core/Rendering/RenderManager";
import { container } from "../../../Game";
import Rectangle from "../../../Libs/Geometric/Shapes/Rectangle";
import Tileset from "../../../Tileset";
import { TiledTilemap } from "./TiledTilemap";

export default abstract class AbstractTilemapRenderer extends Component {
    public tileset: Tileset = null;
    public tilemapData: string;
    public tiledTilemap: TiledTilemap;
    public tileScale: number = 1;
    public smooth: boolean = true; // default TRUE to avoid tiles bleeding

    protected tileWidth: number = 0;
    protected tileHeight: number = 0;
    protected renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    protected tilemapProcessed: boolean = false;
    protected tilesRenderData: ImageRenderData[] = [];

    protected _width: number = 0;
    protected _height: number = 0;

    protected tiles: Rectangle[] = [];
    protected _realWidth: number = 0;
    protected _realHeight: number = 0;

    protected start(): void {
        this.tileWidth = this.tileset.tileWidth * this.tileScale;
        this.tileHeight = this.tileset.tileHeight * this.tileScale;

        this.update();
    }

    protected update(): void {
        if (this.tileset.loaded && this.tilemapProcessed === false) {
            this.processTilemap();
            this.updateTilesPosition();
        }

        if (this.tileset.loaded && this.tilemapProcessed === true) {
            this.tilesRenderData.forEach((renderData) => this.renderManager.addToRenderStack(renderData));
        }
    }

    protected abstract processTilemap(): void;

    protected processTile(tile: Rectangle, col: number, row: number, alpha: number = 1): void {
        const renderData = this.createRenderData(tile, col, row, alpha);
        this.updateSizeInfo(col + 1, row + 1);
        this.tilesRenderData.push(renderData);
    }

    private createRenderData(tile: Rectangle, col: number, row: number, alpha: number = 1): ImageRenderData {
        const renderData: ImageRenderData = new ImageRenderData();

        renderData.position.x = this.gameObject.transform.position.x + col * this.tileWidth + this.tileWidth / 2;
        renderData.position.y = this.gameObject.transform.position.y - row * this.tileHeight - this.tileHeight / 2;

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = this.tileWidth;
        renderData.height = this.tileHeight;
        renderData.slice = tile;
        renderData.smooth = this.smooth;
        renderData.alpha = alpha;

        return renderData;
    }

    private updateSizeInfo(col: number, row: number): void {
        if (this._width < col) {
            this._width = col;
            this._realWidth += this.tileWidth;
        }

        if (this._height < row) {
            this._height = row;
            this._realHeight += this.tileHeight;
        }
    }

    protected updateTilesPosition(): void {
        this.tilesRenderData.forEach((renderData) => {
            renderData.position.x -= Math.floor(this._realWidth / 2);
            renderData.position.y += Math.floor(this._realHeight / 2);
            this.addTileData(renderData);
        });
    }

    protected addTileData(renderData: ImageRenderData): void {
        this.tiles.push(
            new Rectangle(
                renderData.position.x - renderData.width / 2,
                renderData.position.y + renderData.height / 2,
                renderData.width,
                renderData.height
            )
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

    public get tilesData(): Rectangle[] {
        return this.tiles;
    }
}
