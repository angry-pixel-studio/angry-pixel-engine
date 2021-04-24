import { RenderComponent } from "../../Component";
import { ImageRenderData } from "../../Core/Rendering/RenderData/ImageRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Vector2 } from "../../Math/Vector2";
import { Tileset } from "../../Tileset";
import { TileData } from "../../Core/Tilemap/TileData";
import { TiledTilemap } from "../../Core/Tilemap/TiledTilemap";
import { Tile } from "../../Core/Tilemap/Tile";

export abstract class TilemapRenderer extends RenderComponent {
    public tileset: Tileset = null;
    public tilemapData: string;
    public tiledTilemap: TiledTilemap;
    public tileScale: number = 1;
    public smooth: boolean = true; // set to FALSE to avoid bleeding

    protected tileWidth: number = 0;
    protected tileHeight: number = 0;
    protected orientation: Vector2 = new Vector2(1, 1);

    protected renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    protected tilemapProcessed: boolean = false;
    protected tilesRenderData: ImageRenderData[] = [];

    private cols: number[] = [];
    private rows: number[] = [];

    protected _width: number = 0;
    protected _height: number = 0;

    protected tiles: TileData[] = [];
    protected _realWidth: number = 0;
    protected _realHeight: number = 0;

    constructor() {
        super();

        this.allowMultiple = false;
    }

    protected start(): void {
        this.tileWidth = this.tileset.tileWidth * this.tileScale * Math.abs(this.gameObject.transform.scale.x);
        this.tileHeight = this.tileset.tileHeight * this.tileScale * Math.abs(this.gameObject.transform.scale.y);
        this.orientation.set(
            Math.sign(this.gameObject.transform.scale.x),
            Math.sign(this.gameObject.transform.scale.y)
        );

        this.processTilemap();
        this.updateTilesPosition();
    }

    protected update(): void {
        this.tilesRenderData.forEach((renderData) => this.renderManager.addToRenderStack(renderData));
    }

    protected abstract processTilemap(): void;

    protected processTile(
        tile: Tile,
        col: number,
        row: number,
        alpha: number = 1,
        flip: { h: boolean; v: boolean } = { h: false, v: false }
    ): void {
        const renderData = this.createRenderData(tile, col, row, alpha, flip);
        this.updateSizeInfo(col, row);
        this.tilesRenderData.push(renderData);
    }

    private createRenderData(
        tile: Tile,
        col: number,
        row: number,
        alpha: number = 1,
        flip: { h: boolean; v: boolean } = { h: false, v: false }
    ): ImageRenderData {
        const renderData: ImageRenderData = new ImageRenderData();

        renderData.position.set(
            this.gameObject.transform.position.x +
                col * this.tileWidth * this.orientation.x +
                (this.tileWidth * this.orientation.x) / 2,
            this.gameObject.transform.position.y -
                row * this.tileHeight * this.orientation.y -
                (this.tileHeight * this.orientation.y) / 2
        );

        renderData.ui = false;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.width = this.tileWidth;
        renderData.height = this.tileHeight;
        renderData.slice = tile;
        renderData.smooth = this.smooth;
        renderData.alpha = alpha;
        renderData.flipHorizontal = flip.h !== this.orientation.x < 0;
        renderData.flipVertical = flip.v !== this.orientation.y < 0;

        return renderData;
    }

    private updateSizeInfo(col: number, row: number): void {
        this._width = this.cols.includes(col) === false ? this.cols.push(col) : this._width;
        this._height = this.rows.includes(row) === false ? this.rows.push(row) : this._height;

        this._realWidth = this._width * this.tileWidth;
        this._realHeight = this._height * this.tileHeight;
    }

    protected updateTilesPosition(): void {
        this.tilesRenderData.forEach((renderData) => {
            renderData.position.set(
                renderData.position.x - Math.round(this._realWidth / 2) * this.orientation.x,
                renderData.position.y + Math.round(this._realHeight / 2) * this.orientation.y
            );
            this.addTileData(renderData);
        });
    }

    protected addTileData(renderData: ImageRenderData): void {
        this.tiles.push(new TileData(renderData.position, renderData.width, renderData.height));
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

    public get tilesData(): TileData[] {
        return this.tiles;
    }
}
