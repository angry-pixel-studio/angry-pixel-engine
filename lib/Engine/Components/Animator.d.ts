import { Component } from "../Component";
import { SpriteRenderer } from "./Renderer/SpriteRenderer";
import { Animation } from "../Animation";
interface Config {
    spriteRenderer: SpriteRenderer;
}
export declare const TYPE_ANIMATOR: string;
export declare class Animator extends Component {
    private animations;
    private playingAnimationId;
    private spriteRenderer;
    private defaultSprite;
    constructor({ spriteRenderer }: Config);
    protected start(): void;
    protected update(): void;
    addAnimation(id: string, animation: Animation): this;
    playAnimation(id: string): void;
    stopAnimation(): void;
    setCurrentAniamtionSpeed(speed: number): void;
    setAnimationSpeed(id: string, speed: number): void;
}
export {};
