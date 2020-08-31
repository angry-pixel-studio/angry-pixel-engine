import Component from "../Component";
import SpriteRenderer from "./SpriteRenderer";

export default class Animator extends Component {
    animations = [];
    playingAnimationId = null;
    spriteRenderer = null;
    defaultSprite = null;

    constructor(gameObject) {
        super(gameObject);

        this.spriteRenderer = gameObject.getComponent(SpriteRenderer.name);
        if (this.spriteRenderer == null) {
            throw 'SpriteRenderer is required in the GameObject'
        }

        this.defaultSprite = this.spriteRenderer.sprite;
    }

    update() {
        if (this.playingAnimationId) {
            this.spriteRenderer.sprite = this.animations[this.playingAnimationId].currentSprite;
        }
    }

    addAnimation(id, animation) {
        this.animations[id] = animation;

        return this;
    }

    playAnimation(id) {
        if (this.playingAnimationId != id && this.animations[id] !== undefined) {
            this.stopAnimation();

            this.playingAnimationId = id;
            this.animations[id].play();
        }
    }

    stopAnimation() {
        if (this.playingAnimationId !== null) {
            this.animations[this.playingAnimationId].stop();
            this.playingAnimationId = null;
            this.spriteRenderer.sprite = this.defaultSprite;
        }
    }
}