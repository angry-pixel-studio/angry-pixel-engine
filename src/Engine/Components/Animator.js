import Component from "../Component";

export default class Animator extends Component {
    animations = [];
    playingAnimationId = null;
    spriteRenderer = null;
    defaultSprite = null;

    constructor(config) {
        super();
        
        this.spriteRenderer = config.spriteRenderer;
    }

    start() {
        this.defaultSprite = this.spriteRenderer.sprite;
    }

    update() {
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

    addAnimation(id, animation) {
        this.animations[id] = animation;

        return this;
    }

    playAnimation(id) {
        if (this.active === false) {
            return;
        }

        if (this.playingAnimationId != id && this.animations[id] !== undefined) {
            this.stopAnimation();

            this.playingAnimationId = id;
            this.animations[id].play();
        }
    }

    stopAnimation() {
        if (this.active === false) {
            return;
        }

        if (this.playingAnimationId !== null) {
            this.animations[this.playingAnimationId].stop();
        }
    }
}