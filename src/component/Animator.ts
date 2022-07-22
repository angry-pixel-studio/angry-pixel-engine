import { EngineComponent } from "../core/Component";
import { SpriteRenderer } from "./rendering/SpriteRenderer";
import { Sprite } from "./Sprite";
import { Animation } from "./Animation";
import { TimeManager } from "../core/managers/TimeManager";
import { container } from "../core/Game";
import { Exception } from "../utils/Exception";
import { InitOptions } from "../core/GameActor";

export interface AnimatorOptions extends InitOptions {
    spriteRenderer: SpriteRenderer;
}

export class Animator extends EngineComponent {
    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");
    private spriteRenderer: SpriteRenderer = null;
    private animations: Map<string, AnimationPlayer> = new Map<string, AnimationPlayer>();
    private currentAnimation: AnimationPlayer = null;

    protected init({ spriteRenderer }: AnimatorOptions): void {
        this.spriteRenderer = spriteRenderer;
    }

    protected update(): void {
        if (this.currentAnimation === null) {
            return;
        }

        this.currentAnimation.playFrame(this.timeManager.deltaTime);

        if (this.currentAnimation.restarted === true && this.currentAnimation.loop === false) {
            this.currentAnimation = null;
        } else {
            this.spriteRenderer.sprite = this.currentAnimation.sprite;
        }
    }

    public addAnimation(name: string, animation: Animation, framerate?: number): this {
        framerate ? (animation.framerate = framerate) : null;
        this.animations.set(name, new AnimationPlayer(animation));

        return this;
    }

    public playAnimation(name: string): void {
        if (this.active === false) {
            return;
        }

        if (this.animations.has(name) === false) {
            throw new Exception(`Animation with name ${name} does not exist.`);
        }

        this.stopAnimation();
        this.currentAnimation = this.animations.get(name);
    }

    public stopAnimation(): void {
        if (this.currentAnimation !== null) {
            this.currentAnimation.reset();
            this.currentAnimation = null;
        }
    }

    public isPlayingAnimation(name: string): boolean {
        return this.animations.get(name) && this.animations.get(name) === this.currentAnimation;
    }
}

class AnimationPlayer {
    private _animation: Animation;
    private _sprite: Sprite = null;
    private _restarted: boolean = false;
    private currentFrame: number = 0;
    private frameTime: number = 0;

    constructor(animation: Animation) {
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

    public get animation(): Animation {
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
