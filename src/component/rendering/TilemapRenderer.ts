import {
    IRenderManager,
    ITilemapRenderData,
    RenderDataType,
    RenderLocation,
    TilemapOrientation,
} from "angry-pixel-2d-renderer";
import { Vector2 } from "angry-pixel-math";
import { RenderComponent } from "../../core/Component";

export { TilemapOrientation };

export interface Tileset {
    image: HTMLImageElement;
    width: number;
    tileWidth: number;
    tileHeight: number;
    margin?: Vector2;
    spacing?: Vector2;
}

export interface TilemapRendererOptions {
    tiles: string;
    tileset: Tileset;
    width: number;
    tileWidth: number;
    tileHeight: number;
    layer?: string;
    orientation?: TilemapOrientation;
    alpha?: number;
    tintColor?: string;
    smooth?: boolean;
}

export interface ITilemapRenderer {
    tiles: number[];
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    orientation: TilemapOrientation;
    realWidth: number;
    realHeight: number;
}

export class TilemapRenderer extends RenderComponent implements ITilemapRenderer {
    public tiles: number[] = [];
    public width: number;
    public height: number;
    public tileWidth: number;
    public tileHeight: number;
    public tintColor: string;
    public alpha: number;
    public orientation: TilemapOrientation;

    private tileset: Tileset;
    private renderData: ITilemapRenderData;
    private layer: string;

    private scaledTileWidth: number = 0;
    private scaledTileHeight: number = 0;

    public realWidth: number;
    public realHeight: number;

    protected init({
        tiles,
        tileset,
        tileWidth,
        tileHeight,
        width,
        layer,
        orientation,
        alpha,
        tintColor,
        smooth,
    }: TilemapRendererOptions): void {
        tiles.split("\n").forEach((row) => {
            row.split(",").forEach((tile) => (tile.trim().length > 0 ? this.tiles.push(Number(tile)) : null));
        });
        this.tileset = tileset;
        this.width = width;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.layer = layer;
        this.height = Math.ceil(this.tiles.length / this.width);
        this.orientation = orientation;
        this.alpha = alpha;
        this.tintColor = tintColor;

        this.renderData = {
            type: RenderDataType.Tilemap,
            layer: this.layer ?? this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            tileset: this.tileset,
            tilemap: {
                width: this.width,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
            },
            tiles: this.tiles,
            orientation: this.orientation,
            smooth,
        } as ITilemapRenderData;

        this.updateRenderData();
    }

    protected update(): void {
        this.updateRenderData();

        this.renderManager.addRenderData(this.renderData);
    }

    private updateRenderData(): void {
        this.scaledTileWidth = this.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tileHeight * this.gameObject.transform.scale.y;

        this.realWidth = this.width * this.scaledTileWidth;
        this.realHeight = this.height * this.scaledTileHeight;

        this.renderData.layer = this.layer ?? this.gameObject.layer;
        this.renderData.position.copy(this.gameObject.transform.position);
        this.renderData.tintColor = this.tintColor;
        this.renderData.alpha = this.alpha;
        this.renderData.tilemap.tileWidth = this.scaledTileWidth;
        this.renderData.tilemap.tileHeight = this.scaledTileHeight;
    }
}
