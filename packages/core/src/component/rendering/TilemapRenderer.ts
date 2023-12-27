import { ITilemapRenderData, RenderDataType, RenderLocation, TilemapOrientation } from "@angry-pixel/2d-renderer";
import { Vector2 } from "@angry-pixel/math";
import { RenderComponent } from "../../core/Component";

export { TilemapOrientation };

/**
 * Tileset configuration to be used with the TilemapRenderer
 * @public
 * @category Components
 * @example
 * ```js
 * const tileset = {
 *   image: this.assetManager.getImage("image.png"),
 *   width: 3,
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   margin: new Vector2(0, 0),
 *   spacing: new Vector2(0, 0),
 * };
 * ```
 */
export interface Tileset {
    /** The tileset image element */
    image: HTMLImageElement;
    /* The width of tileset in tiles */
    width: number;
    /* The width of the tile in pixels */
    tileWidth: number;
    /* The height of the tile in pixels */
    tileHeight: number;
    /** Margin of the tile in pixels (space in the top and the left) */
    margin?: Vector2;
    /** Spacing of the tile in pixels (space in the bottom and the right) */
    spacing?: Vector2;
}

/**
 * TilemapRenderer configuration options
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0),
 *   }
 *   tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
 *   width: 8,
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   layer: "Tilemap",
 *   orientation: TilemapOrientation.Center,
 *   smooth: false,
 * });
 * ```
 */
export interface TilemapRendererOptions {
    /** Id of tiles separated by commas. The ids start at 1, and increment from left to right,
     * from top to bottom. ID 0 (zero) represents a space with no tile.  */
    tiles: string;
    /** The Tileset instance */
    tileset: Tileset;
    /* The width of the tilemap in tiles */
    width: number;
    /* The width of the tile to render in pixels */
    tileWidth?: number;
    /* The height of the tile to render in pixels */
    tileHeight?: number;
    /** The render layer */
    layer?: string;
    /** Direction in which the tilemap will be rendered. */
    orientation?: TilemapOrientation;
    /** Change the opacity between 1 and 0 */
    opacity?: number;
    /** Define a color for tinting the tiles */
    tintColor?: string;
    /** Smoothing pixels (not recommended for pixel art) */
    smooth?: boolean;
}

/**
 * @internal
 */
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

/**
 * The TilemapRenderer component allows you to render a tile map defined by an array of tile ids, using an instance of the TileSet object.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *   }
 *   tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
 *   width: 8,
 *   tileWidth: 16,
 *   tileHeight: 16,
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0),
 *   }
 *   tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
 *   width: 8,
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   layer: "Tilemap",
 *   orientation: TilemapOrientation.Center,
 *   smooth: false,
 * });
 * ```
 */
export class TilemapRenderer extends RenderComponent implements ITilemapRenderer {
    private readonly spriteDefaultScale: Vector2 = this.gameConfig.spriteDefaultScale;

    /** Id of tiles separated by commas. The ids start at 1, and increment from left to right,
     * from top to bottom. ID 0 (zero) represents a space with no tile.  */
    public tiles: number[] = [];
    /** The width of the tilemap in tiles */
    public width: number;
    /**
     * The height of the tilemap in tiles (this is calculated by the component)
     * @readonly
     */
    public height: number;
    /** The width of the tile to render in pixels */
    public tileWidth: number;
    /** The height of the tile to render in pixels */
    public tileHeight: number;
    /** Define a color for tinting the tiles */
    public tintColor: string;
    /** Change the opacity between 1 and 0 */
    public opacity: number;
    /** Direction in which the tilemap will be rendered (default value TilemapOrientation.Center) */
    public orientation: TilemapOrientation;
    /**
     * Tilemap width in pixels (this is calculated by the component)
     * @readonly
     */
    public realWidth: number;
    /**
     * Tilemap height in pixels (this is calculated by the component)
     * @readonly
     */
    public realHeight: number;

    private tileset: Tileset;
    private renderData: ITilemapRenderData;
    private layer: string;

    private scaledTileWidth: number = 0;
    private scaledTileHeight: number = 0;

    protected init({
        tiles,
        tileset,
        tileWidth,
        tileHeight,
        width,
        layer,
        orientation,
        opacity,
        tintColor,
        smooth,
    }: TilemapRendererOptions): void {
        tiles.split("\n").forEach((row) => {
            row.split(",").forEach((tile) => (tile.trim().length > 0 ? this.tiles.push(Number(tile)) : null));
        });
        this.tileset = tileset;
        this.width = width;
        this.tileWidth = tileWidth ?? this.tileset.tileWidth * this.spriteDefaultScale.x;
        this.tileHeight = tileHeight ?? this.tileset.tileHeight * this.spriteDefaultScale.y;
        this.layer = layer;
        this.height = Math.ceil(this.tiles.length / this.width);
        this.orientation = orientation ?? TilemapOrientation.Center;
        this.opacity = opacity;
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
        this.renderData.alpha = this.opacity;
        this.renderData.tilemap.tileWidth = this.scaledTileWidth;
        this.renderData.tilemap.tileHeight = this.scaledTileHeight;
    }
}
