import { Sprite } from "./Sprite";
interface config {
    sprites: Sprite[];
    speed: number;
    loop: boolean;
}
export declare class Animation {
    private sprites;
    private _playing;
    private currentFrame;
    private currentInterval;
    speed: number;
    loop: boolean;
    currentSprite: Sprite;
    constructor({ sprites, speed, loop }: config);
    play(): void;
    update(): Promise<void>;
    stop(): void;
    get playing(): boolean;
}
export {};
