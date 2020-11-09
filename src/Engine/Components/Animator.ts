import { Component } from "../Component";
import { SpriteRenderer } from "./Renderer/SpriteRenderer";
import { Sprite } from "../Sprite";
import { Animation } from "../Animation";
import { TimeManager } from "../Core/Time/TimeManager";
import { container } from "../Game";
import { AnimationPlayer } from "./Animator/AnimationPlayer";

interface Config {
    spriteRenderer: SpriteRenderer;
}

export const TYPE_ANIMATOR: string = "Animator";

export class Animator extends Component {
    private timeManager: TimeManager = container.getSingleton<TimeManager>("TimeManager");
    private spriteRenderer: SpriteRenderer = null;
    private animations: Map<string, AnimationPlayer> = new Map<string, AnimationPlayer>();
    private currentAnimation: AnimationPlayer = null;
    private defaultSprite: Sprite = null;

    constructor({ spriteRenderer }: Config) {
        super();

        this.type = TYPE_ANIMATOR;
        this.spriteRenderer = spriteRenderer;
    }

    protected start(): void {
        this.defaultSprite = this.spriteRenderer.sprite;
    }

    protected update(): void {
        if (this.currentAnimation === null) {
            this.spriteRenderer.sprite = this.defaultSprite;
            return;
        }

        this.currentAnimation.playFrame(this.timeManager.deltaTime);

        if (this.currentAnimation.restarted === true && this.currentAnimation.loop === false) {
            this.stopAnimation();
        } else {
            this.spriteRenderer.sprite = this.currentAnimation.sprite;
        }
    }

    public addAnimation(name: string, animation: Animation): this {
        this.animations.set(name, new AnimationPlayer(animation));

        return this;
    }

    public playAnimation(name: string): void {
        if (this.active === false) {
            return;
        }

        if (this.animations.has(name) === false) {
            throw new Error(`Animation with name ${name} does not exist.`);
        }

        this.currentAnimation = this.animations.get(name);
    }

    public stopAnimation(): void {
        if (this.active === false) {
            return;
        }

        if (this.currentAnimation !== null) {
            this.currentAnimation = null;
        }
    }
}
