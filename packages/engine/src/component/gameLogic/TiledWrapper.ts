import { Archetype, Component, Entity } from "@angry-pixel/ecs";
import { Vector2 } from "@angry-pixel/math";

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
 *   layerToRender: "Ground",
 *   objects: new Map([
 *     ["Player", playerArchetype],
 *     ["Coin", [new Transform(), new SpriteRenderer({ image: "coin.png" })]],
 *     ["Door", (properties) => doorArchetype(properties.get("locked"))]
 *   ])
 * });
 * ```
 */
export interface TiledWrapperOptions {
    tilemap: TiledTilemap | string;
    layerToRender: string;
    objects: Map<string, TiledObjectBlueprint>;
}

/**
 * The TiledWrapper component wraps a Tiled map editor tilemap and handles rendering a specific layer.\
 * It provides an interface between Tiled's map format and the engine's tilemap rendering system.\
 * The tiles animated in Tiled are mapped to the animations of the TilemapRenderer tileset.\
 * It can also create entities from the objects of the tilemap, matching them by class with the `objects` map.
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
    /**
     * Entities to create from the objects found in the tilemap, keyed by the object class.\
     * Objects are matched by class in every visible object layer of the tilemap.
     */
    objects: Map<string, TiledObjectBlueprint> = new Map();
    /** @internal */
    _processed: boolean = false;
    /** @internal */
    _objectsCreated: boolean = false;
    /** @internal */
    _animationsMapped: boolean = false;
    /** The coordinates (in tiles) of the top-left corner of the rendered layer. @internal */
    _origin: Vector2 = new Vector2();
    /** @internal */
    static componentName: string = "TiledWrapper";

    constructor(options?: Partial<TiledWrapperOptions>) {
        Object.assign(this, options);
    }

    /**
     * Reads the tilemap again, to apply the changes made to it at runtime, such as rendering another layer.\
     * The entities created from the objects of the tilemap are not created again.\
     * The TilemapRenderer and the TilemapCollider of the entity need to be refreshed too.\
     * This operation is expensive, avoid calling it on every frame.
     */
    public refresh(): void {
        this._processed = false;
        this._animationsMapped = false;
    }
}

/**
 * The properties of a Tiled object, keyed by property name.\
 * `int` and `float` properties are given as `number`, `bool` as `boolean`, `string`, `color` and `file` as `string`,\
 * and `class` as a nested set of values.\
 * Properties of type `object` are given as the {@link Entity} created for the referenced Tiled object,\
 * or `undefined` if no entity was created for it.
 * @public
 * @category Components Configuration
 */
export type TiledObjectProperties = Map<string, number | boolean | string | Entity | Record<string, unknown>>;

/**
 * Creates the entity for a Tiled object, based on its properties.
 * @param properties The properties of the Tiled object
 * @param object The Tiled object itself
 * @returns An archetype or a collection of components
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const doorFactory = (properties, object) => ({
 *   components: [new Door({ locked: properties.get("locked"), lever: properties.get("lever") })]
 * });
 * ```
 */
export type TiledObjectFactory = (properties: TiledObjectProperties, object: TiledObject) => Archetype | Component[];

/**
 * Defines the entity to create for a Tiled object class. It can be an archetype, a collection of components,\
 * or a {@link TiledObjectFactory} function that builds either of them from the object's properties.
 * @public
 * @category Components Configuration
 */
export type TiledObjectBlueprint = Archetype | Component[] | TiledObjectFactory;

/**
 * @public
 * @category Components Configuration
 */
export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: (TiledLayer | TiledObjectLayer | TiledGroupLayer)[];
    renderorder: string;
    tilesets: TiledTileset[];
    tilewidth: number;
    tileheight: number;
    properties?: TiledProperty[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledTileset {
    /** The id of the first tile of the tileset. The id of a tile is this value plus the id it has within the tileset */
    firstgid: number;
    /** Only present in external tilesets, which are not read by the engine */
    source?: string;
    name?: string;
    image?: string;
    columns?: number;
    tilecount?: number;
    tilewidth?: number;
    tileheight?: number;
    margin?: number;
    spacing?: number;
    /** Only the tiles with data of their own, such as animations or properties */
    tiles?: TiledTilesetTile[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledTilesetTile {
    /** The id of the tile within the tileset */
    id: number;
    animation?: TiledTileAnimationFrame[];
    objectgroup?: TiledObjectLayer;
    properties?: TiledProperty[];
    type?: string;
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledTileAnimationFrame {
    /** The duration of the frame in milliseconds */
    duration: number;
    /** The id of the tile to render, within the tileset */
    tileid: number;
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
    visible: boolean;
    x: number;
    y: number;
    offsetx?: number;
    offsety?: number;
    properties?: TiledProperty[];
}

/**
 * A layer that groups other layers. Its offset and its visibility are applied to all of them.
 * @public
 * @category Components Configuration
 */
export interface TiledGroupLayer {
    id: number;
    name: string;
    type: "group";
    layers: (TiledLayer | TiledObjectLayer | TiledGroupLayer)[];
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    offsetx?: number;
    offsety?: number;
    properties?: TiledProperty[];
}

/**
 * @public
 * @category Components Configuration
 */
export interface TiledObject {
    /** Only present in tile objects. Their origin is the bottom-left corner, instead of the top-left corner */
    gid?: number;
    height: number;
    id: number;
    name: string;
    rotation: number;
    /** The class of the object. Tiled 1.9 exports it as `class`, the other versions as `type` */
    type?: string;
    /** The class of the object, as exported by Tiled 1.9 */
    class?: string;
    visible: boolean;
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
    type: "int" | "bool" | "float" | "color" | "string" | "file" | "object" | "class";
    /** Properties of type `object` hold the id of another Tiled object, and `class` properties hold a nested set of values */
    value: number | string | boolean | Record<string, unknown>;
}
