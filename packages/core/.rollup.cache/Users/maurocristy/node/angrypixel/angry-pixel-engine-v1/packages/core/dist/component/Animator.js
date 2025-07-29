import { EngineComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
const defaultAnimationName = "default";
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
    constructor() {
        super(...arguments);
        this.spriteRenderer = null;
        this.animations = new Map();
        this.currentAnimation = null;
        this.paused = false;
    }
    init({ spriteRenderer }) {
        this.spriteRenderer = spriteRenderer;
    }
    update() {
        if (this.currentAnimation === null || this.paused) {
            return;
        }
        this.currentAnimation.playFrame(this.timeManager.deltaTime);
        if (this.currentAnimation.restarted === true && this.currentAnimation.loop === false) {
            this.currentAnimation = null;
        }
        else {
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
    addAnimation(animation, name = defaultAnimationName, framerate) {
        animation.framerate = framerate !== null && framerate !== void 0 ? framerate : animation.framerate;
        this.animations.set(name, new AnimationPlayer(animation));
        return this;
    }
    /**
     * Plays the animation
     * @param name The name to identify the animation. Optional if the animator will only play one animation.
     * @throws Exception when animation name does not exist
     */
    playAnimation(name = defaultAnimationName) {
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
    pause() {
        this.paused = true;
    }
    /**
     * Resumes the current animation
     */
    resume() {
        this.paused = false;
    }
    /**
     * Stops the current animation
     */
    stopAnimation() {
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
    isPlayingAnimation(name = defaultAnimationName) {
        return (this.currentAnimation !== null &&
            this.animations.get(name) &&
            this.animations.get(name) === this.currentAnimation);
    }
    /**
     * Returns TRUE if the current animatio is paused, FALSE instead
     * @returns TRUE if the current animatio is paused, FALSE instead
     */
    isPaused() {
        return this.paused;
    }
}
/**
 * @internal
 */
class AnimationPlayer {
    constructor(animation) {
        this._sprite = null;
        this._restarted = false;
        this.currentFrame = 0;
        this.frameTime = 0;
        this._animation = animation;
    }
    get sprite() {
        return this._sprite;
    }
    get restarted() {
        return this._restarted;
    }
    get loop() {
        return this._animation.loop;
    }
    get animation() {
        return this._animation;
    }
    reset() {
        this.currentFrame = 0;
        this.frameTime = 0;
        this._restarted = true;
    }
    playFrame(deltaTime) {
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
//# sourceMappingURL=Animator.js.map