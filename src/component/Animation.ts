import { Sprite } from "./Sprite";

export interface AnimationConfig {
    sprites: Sprite[];
    loop: boolean;
    framerate: number;
}

export class Animation {
    public sprites: Sprite[] = [];
    public framerate: number = 10;
    public loop: boolean = false;

    constructor(config: AnimationConfig) {
        this.sprites = config.sprites;
        this.framerate = config.framerate ?? this.framerate;
        this.loop = config.loop ?? this.loop;
    }
}
