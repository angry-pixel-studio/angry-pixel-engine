import { Sprite } from "./Sprite";

const FRAME_RATE: number = 24;

interface config {
    sprites: Sprite[];
    speed: number;
    loop: boolean;
}

export class Animation {
    public sprites: Sprite[] = [];
    public speed: number = 1;
    public loop: boolean = false;

    constructor({ sprites, speed = 1, loop = false }: config) {
        this.sprites = sprites;
        this.speed = speed;
        this.loop = loop;
    }
}
