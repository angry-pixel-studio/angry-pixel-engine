import { Vector2 } from "@math";

/** @category Components */
export interface AnimatorOptions {
    animations: Map<string, Animation>;
    animation: string;
    speed: number;
    playing: boolean;
}

/** @category Components */
export class Animator {
    animations: Map<string, Animation> = new Map();
    animation: string;
    speed: number = 1;
    reset: boolean = false;
    playing: boolean = false;
    currentFrame: number = 0;
    currentTime: number = 0;
    /**  @internal */
    _currentAnimation: string = undefined;

    constructor(options?: Partial<AnimatorOptions>) {
        Object.assign(this, options);
    }
}

/** @category Components */
export class Animation {
    image: HTMLImageElement | HTMLImageElement[];
    slice: AnimationSlice = { size: new Vector2(), offset: new Vector2(), padding: new Vector2() };
    frames: number[] = [];
    fps: number = 12;
    loop: boolean = false;
}

/** @category Components */
export type AnimationSlice = { size: Vector2; offset: Vector2; padding: Vector2 };
