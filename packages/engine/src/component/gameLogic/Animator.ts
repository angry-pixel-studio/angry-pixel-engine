import { Vector2 } from "@angry-pixel/math";

/**
 * Animator component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const walkAnimation = new Animation({
 *   image: "walk.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [0, 1, 2, 3, 4, 5],
 *   fps: 12,
 *   loop: true
 * });
 *
 * const idleAnimation = new Animation({
 *   image: "idle.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [6, 7, 8, 9]
 *   fps: 8,
 *   loop: true
 * });
 *
 * const animator = new Animator({
 *   animations: new Map([
 *     ["walk", walkAnimation],
 *     ["idle", idleAnimation]
 *   ]),
 *   animation: "idle",
 *   speed: 1,
 *   playing: true
 * });
 * ```
 */
export interface AnimatorOptions {
    animations: Map<string, Animation>;
    animation: string;
    speed: number;
    playing: boolean;
}

/**
 * The Animator component manages sprite animations. It holds a map of named animations
 * and controls which animation is currently playing, its speed, and playback state.
 * @public
 * @category Components
 * @example
 * ```js
 * const walkAnimation = new Animation({
 *   image: "walk.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [0, 1, 2, 3, 4, 5],
 *   fps: 12,
 *   loop: true
 * });
 *
 * const idleAnimation = new Animation({
 *   image: "idle.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [6, 7, 8, 9],
 *   fps: 8,
 *   loop: true
 * });
 *
 * const animator = new Animator({
 *   animations: new Map([
 *     ["walk", walkAnimation],
 *     ["idle", idleAnimation]
 *   ]),
 *   animation: "idle",
 *   speed: 1,
 *   playing: true
 * });
 * ```
 */
export class Animator {
    /** The animations to play. */
    animations: Map<string, Animation> = new Map();
    /** The animation to play. */
    animation: string;
    /** The speed of the animation. */
    speed: number = 1;
    /** TRUE If the animation should reset to the first frame when the animation is stopped, FALSE otherwise. */
    reset: boolean = false;
    /** TRUE If the animation is playing, FALSE otherwise. */
    playing: boolean = false;
    /** The current frame of the animation. */
    currentFrame: number = 0;
    /** The current time of the animation. */
    currentTime: number = 0;
    /**  @internal */
    _currentAnimation: string = undefined;
    /**  @internal */
    _assetsReady: boolean = false;
    /** @internal */
    static componentName: string = "Animator";

    constructor(options?: Partial<AnimatorOptions>) {
        Object.assign(this, options);
    }
}

/**
 * Animation configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const walkAnimation = new Animation({
 *   image: "walk.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [0, 1, 2, 3, 4, 5],
 *   fps: 12,
 *   loop: true
 * });
 *
 * const idleAnimation = new Animation({
 *   image: "idle.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [6, 7, 8, 9],
 *   fps: 8,
 *   loop: true
 * });
 *
 * const animator = new Animator({
 *   animations: new Map([
 *     ["walk", walkAnimation],
 *     ["idle", idleAnimation]
 *   ]),
 *   animation: "idle",
 *   speed: 1,
 *   playing: true
 * });
 * ```
 */
export interface AnimationOptions {
    image: HTMLImageElement | HTMLImageElement[] | string | string[];
    slice?: { size: Vector2; offset?: Vector2; padding?: Vector2 };
    frames?: number[];
    fps?: number;
    loop?: boolean;
}
/**
 * Animation class used to configure sprite animations. It defines properties like the source image(s),
 * slice dimensions for sprite sheets, frame sequence, playback speed and looping behavior.
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const walkAnimation = new Animation({
 *   image: "walk.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [0, 1, 2, 3, 4, 5],
 *   fps: 12,
 *   loop: true
 * });
 *
 * const idleAnimation = new Animation({
 *   image: "idle.png",
 *   slice: { size: new Vector2(32, 32) },
 *   frames: [6, 7, 8, 9],
 *   fps: 8,
 *   loop: true
 * });
 *
 * const animator = new Animator({
 *   animations: new Map([
 *     ["walk", walkAnimation],
 *     ["idle", idleAnimation]
 *   ]),
 *   animation: "idle",
 *   speed: 1,
 *   playing: true
 * });
 * ```
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
 * @category Components Configuration
 */
export type AnimationSlice = { size: Vector2; offset: Vector2; padding: Vector2 };
