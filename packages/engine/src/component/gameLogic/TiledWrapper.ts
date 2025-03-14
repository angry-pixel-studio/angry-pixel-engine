/**
 * @public
 * @category Components
 */
export interface TiledWrapperOptions {
    tilemap: TiledTilemap;
    layerToRender: string;
}

/**
 * @public
 * @category Components
 */
export class TiledWrapper {
    tilemap: TiledTilemap;
    layerToRender: string;

    constructor(options?: Partial<TiledWrapperOptions>) {
        Object.assign(this, options);
    }
}

/**
 * @public
 * @category Components
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
 * @category Components
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
 * @category Components
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
 * @category Components
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
 * @category Components
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
 * @category Components
 */
export interface TiledProperty {
    name: string;
    type: "int" | "bool" | "float" | "color" | "string";
    value: number | string | boolean;
}
