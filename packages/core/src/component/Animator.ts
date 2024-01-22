import { EngineComponent } from "../core/Component";
import { SpriteRenderer } from "./rendering/SpriteRenderer";
import { Sprite } from "./rendering/Sprite";
import { Exception } from "../utils/Exception";
import { InitOptions } from "../core/GameActor";

const defaultAnimationName = "default";

/**
 * Animation configuration options
 * @public
 * @category Components
 * @example
 * ```js
animator.addAnimation({
    sprites: [0, 16, 32, 48].map(
      (x: number) =>
        new Sprite({
          image: assetManager.getImage("spritesheet.png"),
          smooth: false,
          slice: {x, y: 64, width: 16, height: 16),
        })
    ),
    framerate: 10,
    loop: true,
});
 * ```
 */
export interface AnimationConfig {
    /** Array of sprites to represent each animation frame */
    sprites: Sprite[];
    /** Plays the animation in a loop */
    loop: boolean;
    /** Frame rate in seconds */
    framerate: number;
}

/**
 * Animator configuration options
 * @public
 * @category Components
 * @example
 * ```js
  this.addComponent(Animator, {
    spriteRenderer: this.getComponent(SpriteRenderer),
  });
 * ```
 */
export interface AnimatorOptions extends InitOptions {
    /** The SpriteRenderer component in which the animation will be rendered */
    spriteRenderer: SpriteRenderer;
}

/**
 * The Animator component is used to render sets of sprites as animations.
 * @public
 * @category Components
 * @example
 * ```js
const animator = this.addComponent(Animator, {
    spriteRenderer: this.getComponent(SpriteRenderer),
});

animator.addAnimation({
    sprites: [0, 16, 32, 48].map(
      (x: number) =>
        new Sprite({
          image: assetManager.getImage("spritesheet.png"),
          smooth: false,
          slice: {x, y: 64, width: 16, height: 16),
        })
    ),
    framerate: 10,
    loop: true,
});

animator.playAnimation();
 * ```
 * @example
 * ```js
const animator = this.addComponent(Animator, {
    spriteRenderer: this.getComponent(SpriteRenderer),
});

animator.addAnimation({
    sprites: [0, 16, 32, 48].map(
      (x: number) =>
        new Sprite({
          image: assetManager.getImage("spritesheet.png"),
          smooth: false,
          slice: {x, y: 64, width: 16, height: 16),
        })
    ),
    framerate: 10,
    loop: true,
}, "idle", 10);

animator.playAnimation("idle");
 * ```
 */
export class Animator extends EngineComponent {
    private spriteRenderer: SpriteRenderer = null;
    private animations: Map<string, AnimationPlayer> = new Map<string, AnimationPlayer>();
    private currentAnimation: AnimationPlayer = null;
    private paused: boolean = false;

    protected init({ spriteRenderer }: AnimatorOptions): void {
        this.spriteRenderer = spriteRenderer;
    }

    protected update(): void {
        if (this.currentAnimation === null || this.paused) {
            return;
        }

        this.currentAnimation.playFrame(this.timeManager.deltaTime);

        if (this.currentAnimation.restarted === true && this.currentAnimation.loop === false) {
            this.currentAnimation = null;
        } else {
            this.spriteRenderer.sprite = this.currentAnimation.sprite;
        }
    }

    /**
     * Adds an animation to the component
     * @param animation The animation config object
     * @param name The name to identify the animation. Optional if the animator will only play one animation.
     * @param framerate [optional] Overwrites the framerate
     * @returns The animator instance
     */
    public addAnimation(animation: AnimationConfig, name: string = defaultAnimationName, framerate?: number): this {
        animation.framerate = framerate ?? animation.framerate;
        this.animations.set(name, new AnimationPlayer(animation));

        return this;
    }

    /**
     * Plays the animation
     * @param name The name to identify the animation. Optional if the animator will only play one animation.
     * @throws Exception when animation name does not exist
     */
    public playAnimation(name: string = defaultAnimationName): void {
        if (this.active === false) {
            return;
        }

        if (this.animations.has(name) === false) {
            throw new Exception(`Animation with name ${name} does not exist.`);
        }

        this.stopAnimation();
        this.currentAnimation = this.animations.get(name);
    }

    /**
     * Pauses the current animation
     */
    public pause(): void {
        this.paused = true;
    }

    /**
     * Resumes the current animation
     */
    public resume(): void {
        this.paused = false;
    }

    /**
     * Stops the current animation
     */
    public stopAnimation(): void {
        if (this.currentAnimation !== null) {
            this.currentAnimation.reset();
            this.currentAnimation = null;
            this.paused = false;
        }
    }

    /**
     * Returns TRUE if the current animatio is playing, FALSE instead
     * @param name The name to identify the animation. Optional if the animator will only play one animation
     * @returns TRUE if the current animatio is playing, FALSE instead
     */
    public isPlayingAnimation(name: string = defaultAnimationName): boolean {
        return (
            this.currentAnimation !== null &&
            this.animations.get(name) &&
            this.animations.get(name) === this.currentAnimation
        );
    }

    /**
     * Returns TRUE if the current animatio is paused, FALSE instead
     * @returns TRUE if the current animatio is paused, FALSE instead
     */
    public isPaused(): boolean {
        return this.paused;
    }
}

/**
 * @internal
 */
class AnimationPlayer {
    private _animation: AnimationConfig;
    private _sprite: Sprite = null;
    private _restarted: boolean = false;
    private currentFrame: number = 0;
    private frameTime: number = 0;

    constructor(animation: AnimationConfig) {
        this._animation = animation;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public get restarted(): boolean {
        return this._restarted;
    }

    public get loop(): boolean {
        return this._animation.loop;
    }

    public get animation(): AnimationConfig {
        return this._animation;
    }

    public reset(): void {
        this.currentFrame = 0;
        this.frameTime = 0;
        this._restarted = true;
    }

    public playFrame(deltaTime: number): void {
        this._restarted = false;

        if (this.frameTime >= 1 / this._animation.framerate) {
            this.frameTime = 0;
            this.currentFrame = this.currentFrame + 1 === this._animation.sprites.length ? 0 : this.currentFrame + 1;
            this._restarted = this.currentFrame === 0;
        }

        this._sprite = this._animation.sprites[this.currentFrame];
        this.frameTime += deltaTime;
    }
}
