import { Sprite } from "./Sprite";

interface config {
    sprites: Sprite[];
    speed: number;
    loop: boolean;
}

export class Animation {
    public sprites: Sprite[] = [];
    public speed: number = 1;
    public loop: boolean = false;

    constructor(config: config) {
        this.sprites = config.sprites;
        this.speed = config.speed ?? this.speed;
        this.loop = config.loop ?? this.loop;
    }
}
