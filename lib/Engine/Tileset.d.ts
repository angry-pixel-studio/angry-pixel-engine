import { Vector2 } from "./Helper/Vector2";
import { Rectangle } from "./Libs/Geometric/Shapes/Rectangle";
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
    getTile(index: number): Rectangle | null;
    get tiles(): Rectangle[];
}
export {};
