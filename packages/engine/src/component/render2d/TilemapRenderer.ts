import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";

/**
 * @public
 * @category Components
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
    opacity: number;
    smooth: boolean;
}

/**
 * The TilemapRenderer component allows you to render a tile map defined by an array of tile ids, using an instance of the TileSet object.
 * @public
 * @category Components
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
    /** TRUE for smooth pixels (not recommended for pixel art) */
    smooth: boolean = false;
    /** @internal */
    _processed: boolean = false;
    /** @internal */
    _position: Vector2 = new Vector2();

    constructor(options?: Partial<TilemapRendererOptions>) {
        Object.assign(this, options);
    }
}

/**
 * Tileset configuration to be used with the TilemapRenderer
 * @public
 * @category Components
 */
export type Tileset = {
    /** The tileset image element */
    image: HTMLImageElement;
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
 * @category Components
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
