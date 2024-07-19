import { Vector2 } from "../../math";

export class Animator {
    public animations: Map<string, Animation> = new Map();
    public animation: string;
    public speed: number = 1;
    public reset: boolean = false;
    public playing: boolean = false;
    public currentFrame: number = 0;
    public currentTime: number = 0;
    /**  @internal */
    public _currentAnimation: string = undefined;
}

export class Animation {
    public image: HTMLImageElement | HTMLImageElement[];
    public slice: AnimationSlice = { size: new Vector2(), offset: new Vector2(), padding: new Vector2() };
    public frames: number[] = [];
    public fps: number = 12;
    public loop: boolean = false;
}

export type AnimationSlice = { size: Vector2; offset: Vector2; padding: Vector2 };
