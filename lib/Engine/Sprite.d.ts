import { Rectangle } from "./Libs/Geometric/Shapes/Rectangle";
import { Vector2 } from "./Helper/Vector2";
interface config {
    image: HTMLImageElement;
    scale: Vector2;
    slice: Rectangle | null;
    smooth: boolean;
}
export declare class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;
    slice: Rectangle;
    scale: Vector2;
    smooth: boolean;
    private _loaded;
    constructor({ image, slice, scale, smooth }: config);
    get loaded(): boolean;
    private onLoad;
}
export {};
