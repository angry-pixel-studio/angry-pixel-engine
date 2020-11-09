import { Animation } from "../../Animation";
import { Sprite } from "../../Sprite";

const FRAME_RATE: number = 24;

export class AnimationPlayer {
    private animation: Animation;
    private currentFrame: number = 0;
    private frameTime: number = 0;
    private _sprite: Sprite = null;
    private _restarted: boolean = false;

    constructor(animation: Animation) {
        this.animation = animation;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public get restarted(): boolean {
        return this._restarted;
    }

    public get loop(): boolean {
        return this.animation.loop;
    }

    public playFrame(deltaTime: number): void {
        this._restarted = false;

        if (this.frameTime >= 1 / (FRAME_RATE * this.animation.speed)) {
            this.frameTime = 0;
            this.currentFrame = this.currentFrame + 1 === this.animation.sprites.length ? 0 : this.currentFrame + 1;
            this._restarted = this.currentFrame === 0;
        }

        this._sprite = this.animation.sprites[this.currentFrame];
        this.frameTime += deltaTime;
    }
}
