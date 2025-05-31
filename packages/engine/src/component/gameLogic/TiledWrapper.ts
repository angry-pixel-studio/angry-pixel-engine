/**
 * TiledWrapper component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const tiledWrapper = new TiledWrapper({
 *   tilemap: "tilemap.json",
 *   layerToRender: "Ground"
 * });
 *
 * const tiledWrapper = new TiledWrapper({
 *   tilemap: assetManager.getJson("tilemap.json"),
 *   layerToRender: "Ground"
 * });
 * ```
 */
export interface TiledWrapperOptions {
    tilemap: TiledTilemap | string;
    layerToRender: string;
}

/**
 * The TiledWrapper component wraps a Tiled map editor tilemap and handles rendering a specific layer.\
 * It provides an interface between Tiled's map format and the engine's tilemap rendering system.
 * @public
 * @category Components
 * @example
 * ```js
 * const tiledWrapper = new TiledWrapper({
 *   tilemap: {
 *     width: 10,
 *     height: 10,
 *     infinite: false,
 *     layers: [],
 *     renderorder: "right-down",
 *     tilesets: [{ firstgid: 1 }],
 *     tilewidth: 32,
 *     tileheight: 32
 *   },
 *   layerToRender: "Ground"
 * });
 * ```
 */
export class TiledWrapper {
    /** The tilemap to render. */
    tilemap: TiledTilemap | string;
    /** The layer to render. */
    layerToRender: string;
    /** @internal */
    static componentName: string = "TiledWrapper";

    constructor(options?: Partial<TiledWrapperOptions>) {
        Object.assign(this, options);
    }
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: (TiledLayer | TiledObjectLayer)[];
    renderorder: string;
    tilesets: { firstgid: number }[];
    tilewidth: number;
    tileheight: number;
    properties?: TiledProperty[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledLayer {
    name: string;
    id: number;
    chunks?: TiledChunk[];
    data?: number[];
    x: number;
    y: number;
    type: "tilelayer";
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
    startx?: number;
    starty?: number;
    offsetx?: number;
    offsety?: number;
    tintcolor?: string;
    properties?: TiledProperty[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledObjectLayer {
    draworder: string;
    id: number;
    name: string;
    objects: TiledObject[];
    opacity: number;
    type: "objectgroup";
    visible: true;
    x: number;
    y: number;
    properties?: TiledProperty[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledObject {
    gid: number;
    height: number;
    id: number;
    name: string;
    rotation: number;
    type: string;
    visible: true;
    width: number;
    x: number;
    y: number;
    properties?: TiledProperty[];
    polygon?: { x: number; y: number }[];
    polyline?: { x: number; y: number }[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledProperty {
    name: string;
    type: "int" | "bool" | "float" | "color" | "string";
    value: number | string | boolean;
}
