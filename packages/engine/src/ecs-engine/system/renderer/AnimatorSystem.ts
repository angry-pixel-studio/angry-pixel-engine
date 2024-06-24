import { Animation, Animator } from "../../component/Animator";
import { SpriteRenderer } from "../../component/renderer/SpriteRenderer";
import { IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { ITimeManager } from "../../manager/TimeManager";

export class AnimatorSystem extends System {
    // cache
    private animation: Animation;

    constructor(
        private readonly entityManager: IEntityManager,
        private readonly timeManager: ITimeManager,
    ) {
        super();
        this.group = SystemGroup.Render;
    }

    public onEnable(): void {}

    public onUpdate(): void {
        this.entityManager.search(Animator).forEach(({ entity, component: animator }) => {
            this.stop(animator);

            this.animation = animator.animations.get(animator.animationToPlay);
            if (!this.animation) return;

            this.play(animator);

            const spriteRenderer = this.entityManager.getComponent(entity, SpriteRenderer);
            if (spriteRenderer) this.renderSprite(animator, spriteRenderer);
        });
    }

    private stop(animator: Animator): void {
        if (animator.action === "stop") {
            animator.currentFrame = 0;
            animator.currentTime = 0;

            if (animator.defaultAnimation) {
                animator.action = "play";
                animator.animationToPlay = animator.defaultAnimation;
            }
        }
    }

    private play(animator: Animator): void {
        if (animator.action === "play") {
            if (animator.animationToPlay !== animator.currentAnimation) {
                animator.currentAnimation = animator.animationToPlay;
                animator.currentFrame = 0;
                animator.currentTime = 0;
            }

            if (animator.currentTime >= (1 / this.animation.fps) * (animator.currentFrame + 1)) {
                if (animator.currentFrame === this.animation.frames.length - 1) {
                    animator.currentFrame = 0;
                    animator.currentTime = 0;
                } else {
                    animator.currentFrame++;
                }
            }

            animator.currentTime += this.timeManager.renderDeltaTime;
        }
    }

    private renderSprite(animator: Animator, spriteRenderer: SpriteRenderer): void {
        if (Array.isArray(this.animation.image)) {
            spriteRenderer.image = this.animation.image[animator.currentFrame];
        } else {
            const frame = this.animation.frames[animator.currentFrame];
            const width = Math.floor(this.animation.image.naturalWidth / this.animation.slice.size.x);

            spriteRenderer.image = this.animation.image;
            spriteRenderer.slice = {
                x: (frame % width) * this.animation.slice.size.x + this.animation.slice.offset.x,
                y: Math.floor(frame / width) * this.animation.slice.size.y + this.animation.slice.offset.y,
                width: this.animation.slice.size.x - this.animation.slice.padding.y,
                height: this.animation.slice.size.y - this.animation.slice.padding.y,
            };
        }
    }
}
