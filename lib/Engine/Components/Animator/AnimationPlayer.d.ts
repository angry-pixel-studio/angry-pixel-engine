import { Animation } from "../../Animation";
import { Sprite } from "../../Sprite";
export declare class AnimationPlayer {
    private animation;
    private currentFrame;
    private frameTime;
    private _sprite;
    private _restarted;
    constructor(animation: Animation);
    get sprite(): Sprite;
    get restarted(): boolean;
    get loop(): boolean;
    playFrame(deltaTime: number): void;
}
