import { RenderComponent } from "../../../Component";
import { ImageRenderData } from "../../../Core/Rendering/RenderData/ImageRenderData";
import { RenderManager } from "../../../Core/Rendering/RenderManager";
import { Rectangle } from "../../../Math/Rectangle";
import { Tileset } from "../../../Tileset";
import { TileData } from "./TileData";
import { TiledTilemap } from "./TiledTilemap";
export declare abstract class TilemapRenderer extends RenderComponent {
    tileset: Tileset;
    tilemapData: string;
    tiledTilemap: TiledTilemap;
    tileScale: number;
    smooth: boolean;
    protected tileWidth: number;
    protected tileHeight: number;
    protected renderManager: RenderManager;
    protected tilemapProcessed: boolean;
    protected tilesRenderData: ImageRenderData[];
    protected _width: number;
    protected _height: number;
    protected tiles: TileData[];
    protected _realWidth: number;
    protected _realHeight: number;
    constructor();
    protected start(): void;
    protected update(): void;
    protected abstract processTilemap(): void;
    protected processTile(tile: Rectangle, col: number, row: number, alpha?: number, flip?: {
        h: boolean;
        v: boolean;
    }): void;
    private createRenderData;
    private updateSizeInfo;
    protected updateTilesPosition(): void;
    protected addTileData(renderData: ImageRenderData): void;
    get width(): number;
    get height(): number;
    get realWidth(): number;
    get realHeight(): number;
    get tilesData(): TileData[];
}
