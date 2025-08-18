import { Vector2 } from "@angry-pixel/math";
import { defaultRenderLayer } from "./Camera";
import { TilemapRenderData } from "@angry-pixel/webgl";

/**
 * TilemapRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const tilemapRenderer = new TilemapRenderer({
 *   layer: "Default",
 *   tileset: {
 *     image: this.assetManager.getImage("tileset.png"),
 *     width: 10,
 *     tileWidth: 32,
 *     tileHeight: 32,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0)
 *   },
 *   data: [1, 2, 3, 4],
 *   chunks: [],
 *   width: 2,
 *   height: 2,
 *   tileWidth: 32,
 *   tileHeight: 32,
 *   tintColor: "#FFFFFF",
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   opacity: 1,
 *   smooth: false
 * });
 * ```
 */
export interface TilemapRendererOptions {
    layer: string;
    tileset: Tileset;
    data: number[];
    chunks: Chunk[];
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    tintColor: string;
    maskColor: string;
    maskColorMix: number;
    opacity: number;
    smooth: boolean;
}

/**
 * The TilemapRenderer component renders 2D tile-based maps to the screen.\
 * It uses a tileset image as a source for individual tiles, which are arranged according to a provided array of tile IDs.\
 * The component supports features like tinting, masking, opacity control, and custom tile dimensions.\
 * Maps can be rendered in chunks for improved performance with large tilemaps, and tiles can be assigned to specific render layers.\
 * Each tile is referenced by an ID, with 0 representing empty space.
 * @public
 * @category Components
 * @example
 * ```js
 * const tilemapRenderer = new TilemapRenderer({
 *   layer: "Default",
 *   tileset: {
 *     image: this.assetManager.getImage("tileset.png"),
 *     width: 10,
 *     tileWidth: 32,
 *     tileHeight: 32,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0)
 *   },
 *   data: [1, 2, 3, 4],
 *   chunks: [],
 *   width: 2,
 *   height: 2,
 *   tileWidth: 32,
 *   tileHeight: 32,
 *   tintColor: "#FFFFFF",
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   opacity: 1,
 *   smooth: false
 * });
 * ```
 */
export class TilemapRenderer {
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** The Tileset instance */
    tileset: Tileset = undefined;
    /** Array of tiles. ID 0 (zero) represents empty space.*/
    data: number[] = [];
    /** Array of tile data split into chunks */
    chunks: Chunk[] = [];
    /** The width of the tilemap (in tiles) */
    width: number = 0;
    /** The height of the tilemap (in tiles) */
    height: number = 0;
    /** The width of the tile to render */
    tileWidth: number = undefined;
    /** The height of the tile to render */
    tileHeight: number = undefined;
    /** Define a color for tinting the tiles */
    tintColor: string = undefined;
    /** Change the opacity between 1 and 0 */
    opacity: number = 1;
    /** Define a mask color for the image */
    maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    maskColorMix: number;
    /** TRUE for smooth pixels (not recommended for pixel art) */
    smooth: boolean = false;

    /** @internal */
    _processed: boolean = false;
    /** @internal */
    _renderData: TilemapRenderData[] = [];
    /** @internal */
    static componentName: string = "TilemapRenderer";

    constructor(options?: Partial<TilemapRendererOptions>) {
        Object.assign(this, options);
    }
}

/**
 * The Tileset configuration defines the properties of a tileset used by the TilemapRenderer.\
 * It specifies the source image containing the tiles, the dimensions of the tileset and individual tiles,\
 * and optional margin and spacing between tiles. This configuration is essential for properly\
 * slicing and rendering tiles from the tileset image.
 * @public
 * @category Components Configuration
 */
export type Tileset = {
    /** The tileset image element */
    image: HTMLImageElement | string;
    /* The width of tileset (in tiles) */
    width: number;
    /* The width of the tile (in pixels) */
    tileWidth: number;
    /* The height of the tile (in pixels) */
    tileHeight: number;
    /** Margin of the tile in pixels (space in the top and the left) */
    margin?: Vector2;
    /** Spacing of the tile in pixels (space in the bottom and the right) */
    spacing?: Vector2;
};

/**
 * Chunk of tile data
 * @public
 * @category Components Configuration
 */
export type Chunk = {
    /** Array of tiles. ID 0 (zero) represents empty space.*/
    data: number[];
    /* X coordinate from top-left corner (in tails) */
    x: number;
    /* Y coordinate from top-left corner (in tails) */
    y: number;
    /** Chunk width (in tails) */
    width: number;
    /** Chunk height (in tails) */
    height: number;
};
