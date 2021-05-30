import { RenderComponent } from "../../Component";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container, GameConfig } from "../../Game";
import { Vector2 } from "../../Math/Vector2";
import { Tileset } from "../../Tileset";
import { TileData } from "../../Core/Tilemap/TileData";
import { Tile } from "../../Core/Tilemap/Tile";
import { TilemapRenderData, TileRenderData } from "../../Core/Rendering/RenderData/TilemapRenderData";

export type Flip = { h: boolean; v: boolean };
export type Offset = { x: number; y: number };
export type RenderOrder = "center" | "right-down" | "right-up" | "left-down" | "left-right";

export interface TilemapRendererConfig {
    tileset: Tileset;
    renderOrder?: RenderOrder;
    smooth?: boolean;
    tileCorrection?: number;
    tileScale?: Vector2;
}

export abstract class TilemapRenderer extends RenderComponent {
    public readonly tileset: Tileset;
    public readonly renderOrder: RenderOrder = "center";
    public readonly smooth: boolean = false;
    public readonly tileCorrection: number = null;
    public readonly tileScale: Vector2 =
        container.getConstant<GameConfig>("GameConfig").spriteDefaultScale ?? new Vector2(1, 1);

    protected tileWidth: number = 0;
    protected tileHeight: number = 0;
    protected orientation: Vector2 = new Vector2(1, 1);

    protected renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    protected tilemapProcessed: boolean = false;
    protected renderData: TilemapRenderData = new TilemapRenderData();

    private cols: number[] = [];
    private rows: number[] = [];

    protected _width: number = 0; // in tiles
    protected _height: number = 0; // in tiles

    protected tiles: TileData[] = [];
    protected _realWidth: number = 0;
    protected _realHeight: number = 0;

    private cacheV2: Vector2 = new Vector2();

    constructor(config: TilemapRendererConfig) {
        super();

        this.allowMultiple = false;

        this.tileset = config.tileset;
        this.tileScale = config.tileScale ?? this.tileScale;
        this.smooth = config.smooth ?? this.smooth;
        this.renderOrder = config.renderOrder ?? this.renderOrder;
        this.tileCorrection = config.tileCorrection ?? this.tileCorrection;
    }

    protected start(): void {
        this.tileWidth = this.tileset.tileWidth * this.tileScale.x * Math.abs(this.gameObject.transform.scale.x);
        this.tileHeight = this.tileset.tileHeight * this.tileScale.y * Math.abs(this.gameObject.transform.scale.y);
        this.orientation.set(
            Math.sign(this.gameObject.transform.scale.x),
            Math.sign(this.gameObject.transform.scale.y)
        );

        this.renderData.ui = false;
        this.renderData.alpha = 1;
        this.renderData.image = this.tileset.image;
        this.renderData.layer = this.gameObject.layer;
        this.renderData.smooth = this.smooth;
        this.renderData.tileWidth = this.tileWidth;
        this.renderData.tileHeight = this.tileHeight;
        this.renderData.tileCorrection = this.tileCorrection;

        this.processTilemap();
        this.updatePosition();
    }

    protected update(): void {
        this.renderManager.addRenderData(this.renderData);
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
            this.addTileToRenderData(tile, col, row, flip, offset);
        }

        this.updateSizeInfo(col, row);
    }

    private addTileToRenderData(tile: Tile, col: number, row: number, flip: Flip, offset: Offset): void {
        const tileRenderData: TileRenderData = new TileRenderData();

        tileRenderData.tile = tile;
        tileRenderData.position.set(
            this.gameObject.transform.position.x +
                col * this.tileWidth * this.orientation.x +
                offset.x * Math.abs(this.gameObject.transform.scale.x) +
                (this.tileWidth * this.orientation.x) / 2,
            this.gameObject.transform.position.y -
                row * this.tileHeight * this.orientation.y -
                offset.y * Math.abs(this.gameObject.transform.scale.y) -
                (this.tileHeight * this.orientation.y) / 2
        );
        tileRenderData.flipHorizontal = flip.h !== this.orientation.x < 0;
        tileRenderData.flipVertical = flip.v !== this.orientation.y < 0;

        this.renderData.tilesData.push(tileRenderData);
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

        this.renderData.tilesData.forEach((tileRenderData) => {
            Vector2.add(tileRenderData.position, tileRenderData.position, this.cacheV2);
            this.addTileData(tileRenderData);
        });
    }

    protected addTileData(tileRenderData: TileRenderData): void {
        this.tiles.push(new TileData(tileRenderData.position, this.tileWidth, this.tileHeight));
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
