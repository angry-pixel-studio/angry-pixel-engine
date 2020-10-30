import { Vector2 } from "./Helper/Vector2";
import { Rectangle } from "./Libs/Geometric/Shapes/Rectangle";
interface config {
    image: HTMLImageElement;
    tileWidth: number;
    tileHeight: number;
    gridWidth: number;
    gridHeight: number;
    offset: Vector2 | null;
    tileOffset: Vector2 | null;
}
export declare class Tileset {
    image: HTMLImageElement;
    offset: Vector2;
    gridWidth: number;
    gridHeight: number;
    tileWidth: number;
    tileHeight: number;
    tileOffset: Vector2;
    private _tiles;
    private _loaded;
    constructor({ image, tileWidth, tileHeight, gridWidth, gridHeight, offset, tileOffset }: config);
    private generateTiles;
    getTile(index: number): Rectangle | null;
    get tiles(): Rectangle[];
    get loaded(): boolean;
}
export {};
