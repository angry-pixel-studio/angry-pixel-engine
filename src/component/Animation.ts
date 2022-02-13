import { Sprite } from "./Sprite";

export const defaultFramerate: number = 10;

export interface AnimationConfig {
    sprites: Sprite[];
    loop: boolean;
    framerate: number;
}

export class Animation {
    public sprites: Sprite[] = [];
    public framerate: number = defaultFramerate;
    public loop: boolean = false;

    constructor(config: AnimationConfig) {
        this.sprites = config.sprites;
        this.framerate = config.framerate ?? this.framerate;
        this.loop = config.loop ?? this.loop;
    }
}
