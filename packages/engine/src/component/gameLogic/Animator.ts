import { Vector2 } from "@math";

/**
 * @public
 * @category Components
 */
export interface AnimatorOptions {
    animations: Map<string, Animation>;
    animation: string;
    speed: number;
    playing: boolean;
}

/**
 * @public
 * @category Components
 */
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
    /**  @internal */
    _assetsReady: boolean = false;

    constructor(options?: Partial<AnimatorOptions>) {
        Object.assign(this, options);
    }
}

/**
 * @public
 * @category Components
 */
export interface AnimationOptions {
    image: HTMLImageElement | HTMLImageElement[] | string | string[];
    slice?: { size: Vector2; offset?: Vector2; padding?: Vector2 };
    frames?: number[];
    fps?: number;
    loop?: boolean;
}

/**
 * @public
 * @category Components
 */
export class Animation {
    image: HTMLImageElement | HTMLImageElement[] | string | string[];
    slice: AnimationSlice = { size: new Vector2(), offset: new Vector2(), padding: new Vector2() };
    frames: number[] = [];
    fps: number = 12;
    loop: boolean = false;

    constructor(options?: AnimationOptions) {
        if (options) {
            this.image = options.image;
            this.frames = options.frames ?? this.frames;
            this.fps = options.fps ?? this.fps;
            this.loop = options.loop ?? this.loop;

            if (options.slice) {
                this.slice.size.copy(options.slice.size);
                options.slice.offset && this.slice.offset.copy(options.slice.offset);
                options.slice.padding && this.slice.padding.copy(options.slice.padding);
            }
        }
    }
}

/**
 * @public
 * @category Components
 */
export type AnimationSlice = { size: Vector2; offset: Vector2; padding: Vector2 };
