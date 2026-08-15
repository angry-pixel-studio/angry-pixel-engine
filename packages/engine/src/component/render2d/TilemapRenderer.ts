import { defaultRenderLayer } from "./Camera";
import { Vector2 } from "@angry-pixel/math";
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
 *     tileWidth: 32,
 *     tileHeight: 32,
 *     margin: 0,
 *     spacing: 0
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
    offset: Vector2;
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
 *     tileWidth: 32,
 *     tileHeight: 32,
 *     margin: 0,
 *     spacing: 0
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
    /** X-Y axis offset */
    offset: Vector2 = new Vector2();

    /** @internal */
    _processed: boolean = false;
    /** @internal */
    _dataFromChunks: boolean = false;
    /** @internal */
    _renderData: TilemapRenderData[] = [];
    /** @internal */
    static componentName: string = "TilemapRenderer";

    constructor(options?: Partial<TilemapRendererOptions>) {
        Object.assign(this, options);
    }

    /**
     * Processes the tilemap data again, to apply the changes made to it at runtime.\
     * The array that was generated from the other one is emptied, so it is generated again.\
     * This operation is expensive, avoid calling it on every frame.
     */
    public refresh(): void {
        if (this._dataFromChunks) this.data = [];
        else this.chunks = [];

        this.height = 0;
        this._processed = false;
    }
}

/**
 * TileAnimation configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const waterAnimation = new TileAnimation({
 *   tiles: [5, 6, 7, 8],
 *   fps: 6
 * });
 * ```
 */
export interface TileAnimationOptions {
    tiles: number[];
    fps?: number;
}

/**
 * TileAnimation cycles a tile through a sequence of tile ids from the tileset.\
 * It is assigned to a {@link Tileset} keyed by the tile id that should animate,\
 * so every tilemap using that tileset plays the animation in sync.
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const tilemapRenderer = new TilemapRenderer({
 *   tileset: {
 *     image: "tileset.png",
 *     tileWidth: 32,
 *     tileHeight: 32,
 *     animations: new Map([
 *       [3, new TileAnimation({ tiles: [3, 4, 5], fps: 6 })]
 *     ])
 *   },
 *   data: [1, 2, 3, 4],
 *   width: 2
 * });
 * ```
 */
export class TileAnimation {
    /** The sequence of tile ids to cycle through. */
    tiles: number[] = [];
    /** The animation speed in frames per second. */
    fps: number = 12;
    /** The current frame of the animation. */
    currentFrame: number = 0;
    /** The current time of the animation. */
    currentTime: number = 0;

    constructor(options?: TileAnimationOptions) {
        if (options) {
            this.tiles = options.tiles ?? this.tiles;
            this.fps = options.fps ?? this.fps;
        }
    }
}

/**
 * The Tileset configuration defines the properties of a tileset used by the TilemapRenderer.\
 * It specifies the source image containing the tiles, the size of the individual tiles,\
 * and the optional margin and spacing of the image. The number of columns of the tileset\
 * is obtained from the image. The tileset cannot be updated at runtime.
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * // a tileset of 16x16 tiles extruded by 1 pixel
 * const tileset = {
 *   image: this.assetManager.getImage("tileset.png"),
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   margin: 1,
 *   spacing: 2
 * };
 * ```
 */
export type Tileset = {
    /** The tileset image element */
    image: HTMLImageElement | string;
    /* The width of the tile (in pixels) */
    tileWidth: number;
    /* The height of the tile (in pixels) */
    tileHeight: number;
    /** Space in pixels between the tiles and the four edges of the image */
    margin?: number;
    /** Space in pixels between adjacent tiles */
    spacing?: number;
    /** Animated tiles, keyed by the tile id to animate */
    animations?: Map<number, TileAnimation>;
    /** Maps each animated tile id to the tile id currently displayed. @internal */
    _animationState?: Map<number, number>;
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
