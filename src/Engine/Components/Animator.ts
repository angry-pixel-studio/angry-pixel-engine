import Component from "../Component";
import SpriteRenderer from "./SpriteRenderer";
import Sprite from "../Sprite";
import Animation from "../Animation";

export default class Animator extends Component {
    private animations: {[id: string]: Animation} = {};
    private playingAnimationId: string = null;
    private spriteRenderer: SpriteRenderer = null;
    private defaultSprite: Sprite = null;

    constructor(config: {[key: string]: any}) {
        super();
        
        this.spriteRenderer = config.spriteRenderer;
    }

    start(): void {
        this.defaultSprite = this.spriteRenderer.sprite;
    }

    update(): void {
        if (this.playingAnimationId && this.animations[this.playingAnimationId].playing === true) {
            this.spriteRenderer.sprite = this.animations[this.playingAnimationId].currentSprite;
        } else if (this.playingAnimationId && this.animations[this.playingAnimationId].playing === false) {
            this.playingAnimationId = null;
            this.spriteRenderer.sprite = this.defaultSprite;   
        }

        if (this.playingAnimationId === null) {
            this.defaultSprite = this.spriteRenderer.sprite;
        }
    }

    public addAnimation(id:string, animation: Animation): this {
        this.animations[id] = animation;

        return this;
    }

    public playAnimation(id: string): void {
        if (this.active === false) {
            return;
        }

        if (this.playingAnimationId != id && this.animations[id] !== undefined) {
            this.stopAnimation();

            this.playingAnimationId = id;
            this.animations[id].play();
        }
    }

    public stopAnimation(): void {
        if (this.active === false) {
            return;
        }

        if (this.playingAnimationId !== null) {
            this.animations[this.playingAnimationId].stop();
        }
    }
}