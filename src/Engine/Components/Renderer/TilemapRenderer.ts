import { RenderComponent } from "../../Component";
import { ImageRenderData } from "../../Core/Rendering/RenderData/ImageRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Vector2 } from "../../Math/Vector2";
import { Tileset } from "../../Tileset";
import { TileData } from "../../Core/Tilemap/TileData";
import { TiledTilemap } from "../../Core/Tilemap/TiledTilemap";
import { Tile } from "../../Core/Tilemap/Tile";

export type Flip = { h: boolean; v: boolean };
export type Offset = { x: number; y: number };
export type RenderOrder = "center" | "right-down" | "right-up" | "left-down" | "left-right";

export abstract class TilemapRenderer extends RenderComponent {
    protected tileset: Tileset = null;
    protected tilemapData: string;
    protected tiledTilemap: TiledTilemap;
    protected tileScale: number = 1;
    protected smooth: boolean = true; // set to FALSE to avoid bleeding
    protected renderOrder: RenderOrder = "center";

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

    private cacheV2: Vector2 = new Vector2();

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
        this.updatePosition();
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
        flip: Flip = { h: false, v: false },
        offset: Offset = { x: 0, y: 0 }
    ): void {
        if (tile !== null) {
            const renderData = this.createRenderData(tile, col, row, alpha, flip, offset);
            this.tilesRenderData.push(renderData);
        }

        this.updateSizeInfo(col, row);
    }

    private createRenderData(
        tile: Tile,
        col: number,
        row: number,
        alpha: number = 1,
        flip: Flip,
        offset: Offset
    ): ImageRenderData {
        const renderData: ImageRenderData = new ImageRenderData();

        renderData.position.set(
            this.gameObject.transform.position.x +
                col * this.tileWidth * this.orientation.x +
                offset.x * Math.abs(this.gameObject.transform.scale.x) +
                (this.tileWidth * this.orientation.x) / 2,
            this.gameObject.transform.position.y -
                row * this.tileHeight * this.orientation.y -
                offset.y * Math.abs(this.gameObject.transform.scale.y) -
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

    private updatePosition(): void {
        this.cacheV2.set(
            (this.renderOrder === "center"
                ? -Math.round(this._realWidth / 2)
                : ["left-down", "left-up"].includes(this.renderOrder)
                ? -this._realWidth
                : 0) * this.orientation.x,
            (this.renderOrder === "center"
                ? Math.round(this._realHeight / 2)
                : ["right-up", "left-up"].includes(this.renderOrder)
                ? this._realHeight
                : 0) * this.orientation.y
        );

        this.tilesRenderData.forEach((renderData) => {
            Vector2.add(renderData.position, renderData.position, this.cacheV2);
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
