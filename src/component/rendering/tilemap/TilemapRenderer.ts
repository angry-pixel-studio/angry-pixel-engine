import { RenderComponent } from "../../../core/Component";
import { RenderManager } from "../../../rendering/RenderManager";
import { container, GameConfig } from "../../../core/Game";
import { Vector2 } from "../../../math/Vector2";
import { Tileset } from "./Tileset";
import { TileData } from "./TileData";
import { Tile } from "./Tile";
import { TilemapRenderData, TileRenderData } from "../../../rendering/renderData/TilemapRenderData";
import { InitOptions } from "../../../core/GameActor";

export type Flip = { h: boolean; v: boolean };
export type Offset = { x: number; y: number };
export type RenderOrder = "center" | "right-down" | "right-up" | "left-down" | "left-right";

export type LayerToProcess = {
    layer: string;
    alpha: number;
    tintColor: string;
};

export type TileToProcess = {
    layer: string;
    tile: Tile;
    col: number;
    row: number;
    flip: Flip;
    offset: Offset;
};

export interface TilemapRendererOptions extends InitOptions {
    tileset: Tileset;
    renderOrder?: RenderOrder;
    smooth?: boolean;
    textureCorrection?: number;
    tileScale?: Vector2;
}

export abstract class TilemapRenderer extends RenderComponent {
    public readonly allowMultiple: boolean = false;
    public tileset: Tileset;
    public renderOrder: RenderOrder = "center";
    public smooth: boolean = false;
    public textureCorrection: number = null;
    public tileScale: Vector2 = container.getConstant<GameConfig>("GameConfig").spriteDefaultScale ?? new Vector2(1, 1);

    protected tileWidth: number = 0;
    protected tileHeight: number = 0;
    protected orientation: Vector2 = new Vector2(1, 1);

    protected renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    protected tilemapProcessed: boolean = false;
    protected renderData: Map<string, TilemapRenderData> = new Map<string, TilemapRenderData>();

    private cols: number[] = [];
    private rows: number[] = [];

    protected _width: number = 0; // in tiles
    protected _height: number = 0; // in tiles

    protected tiles: TileData[] = [];
    protected _realWidth: number = 0;
    protected _realHeight: number = 0;

    private cacheV2: Vector2 = new Vector2();

    protected init(config: TilemapRendererOptions): void {
        this.tileset = config.tileset;
        this.tileScale = config.tileScale ?? this.tileScale;
        this.smooth = config.smooth ?? this.smooth;
        this.renderOrder = config.renderOrder ?? this.renderOrder;
        this.textureCorrection = config.textureCorrection ?? this.textureCorrection;
    }

    protected start(): void {
        this.tileWidth = this.tileset.tileWidth * this.tileScale.x * Math.abs(this.gameObject.transform.scale.x);
        this.tileHeight = this.tileset.tileHeight * this.tileScale.y * Math.abs(this.gameObject.transform.scale.y);
        this.orientation.set(
            Math.sign(this.gameObject.transform.scale.x),
            Math.sign(this.gameObject.transform.scale.y)
        );

        this.processTilemap();
        this.updatePosition();
    }

    protected update(): void {
        this.renderData.forEach((renderData) => this.renderManager.addRenderData(renderData));
    }

    protected abstract processTilemap(): void;

    protected processLayer(data: LayerToProcess): void {
        const renderData = new TilemapRenderData();

        renderData.ui = false;
        renderData.alpha = data.alpha;
        renderData.image = this.tileset.image;
        renderData.layer = this.gameObject.layer;
        renderData.smooth = this.smooth;
        renderData.tileWidth = this.tileWidth;
        renderData.tileHeight = this.tileHeight;
        renderData.textureCorrection = this.textureCorrection;
        renderData.tintColor = data.tintColor;

        this.renderData.set(data.layer, renderData);
    }

    protected processTile(data: TileToProcess): void {
        if (data.tile !== null) {
            this.addTileToRenderData(data);
        }

        this.updateSizeInfo(data.col, data.row);
    }

    private addTileToRenderData(data: TileToProcess): void {
        if (!this.renderData.has(data.layer)) {
            return;
        }

        const tileRenderData: TileRenderData = new TileRenderData();

        tileRenderData.tile = data.tile;
        tileRenderData.position.set(
            this.gameObject.transform.position.x +
                data.col * this.tileWidth * this.orientation.x +
                data.offset.x * Math.abs(this.gameObject.transform.scale.x) +
                (this.tileWidth * this.orientation.x) / 2,
            this.gameObject.transform.position.y -
                data.row * this.tileHeight * this.orientation.y -
                data.offset.y * Math.abs(this.gameObject.transform.scale.y) -
                (this.tileHeight * this.orientation.y) / 2
        );
        tileRenderData.flipHorizontal = data.flip.h !== this.orientation.x < 0;
        tileRenderData.flipVertical = data.flip.v !== this.orientation.y < 0;

        this.renderData.get(data.layer).tilesData.push(tileRenderData);
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

        this.renderData.forEach((renderData) =>
            renderData.tilesData.forEach((tileRenderData) => {
                Vector2.add(tileRenderData.position, tileRenderData.position, this.cacheV2);
                this.addTileData(tileRenderData);
            })
        );
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
