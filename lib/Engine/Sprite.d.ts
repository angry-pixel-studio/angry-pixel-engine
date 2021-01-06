import { Vector2 } from "./Math/Vector2";
interface Config {
    image: HTMLImageElement;
    scale?: Vector2;
    slice?: Slice | null;
    smooth?: boolean;
}
interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;
    slice: Slice;
    scale: Vector2;
    smooth: boolean;
    private _loaded;
    constructor(config: Config);
    get loaded(): boolean;
    private onLoad;
}
export {};
