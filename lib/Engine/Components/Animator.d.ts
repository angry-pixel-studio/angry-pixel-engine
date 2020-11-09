import { Component } from "../Component";
import { SpriteRenderer } from "./Renderer/SpriteRenderer";
import { Animation } from "../Animation";
interface Config {
    spriteRenderer: SpriteRenderer;
}
export declare const TYPE_ANIMATOR: string;
export declare class Animator extends Component {
    private timeManager;
    private spriteRenderer;
    private animations;
    private currentAnimation;
    private defaultSprite;
    constructor({ spriteRenderer }: Config);
    protected start(): void;
    protected update(): void;
    addAnimation(name: string, animation: Animation): this;
    playAnimation(name: string): void;
    stopAnimation(): void;
}
export {};
