import { Vector2 } from "./Math/Vector2";
import { Tile } from "./Core/Tilemap/Tile";
interface Config {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    gridWidth: number;
    gridHeight: number;
    offset?: Vector2;
    tileOffset?: Vector2;
}
export declare class Tileset {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    gridWidth: number;
    gridHeight: number;
    offset: Vector2;
    tileOffset: Vector2;
    private _tiles;
    constructor(config: Config);
    private generateTiles;
    getTile(index: number): Tile | null;
    get tiles(): Tile[];
}
export {};
