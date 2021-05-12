export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
    renderorder: string;
}

export interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TiledLayer {
    name: string;
    id: number;
    chunks?: TiledChunk[];
    data?: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
    startx?: number;
    starty?: number;
    offsetx?: number;
    offsety?: number;
}
