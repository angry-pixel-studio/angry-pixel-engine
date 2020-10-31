export interface TiledTilemap {
    width: number;
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
}
export interface TiledChunk {
    data: number[];
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface TiledLayer extends TiledChunk {
    chunks: TiledChunk[] | undefined;
    data: number[] | undefined;
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
}
