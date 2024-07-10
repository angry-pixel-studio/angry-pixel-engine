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
            this.reset(animator);

            this.animation = animator.animations.get(animator.animation);
            if (!this.animation) return;

            this.play(animator);

            animator._currentAnimation = animator.animation;

            const spriteRenderer = this.entityManager.getComponent(entity, SpriteRenderer);
            if (spriteRenderer) this.renderSprite(animator, spriteRenderer);
        });
    }

    private reset(animator: Animator): void {
        if (animator.reset) {
            animator.currentFrame = 0;
            animator.currentTime = 0;
            animator.state = "playing";
            animator.reset = false;
        }
    }

    private play(animator: Animator): void {
        if (animator.animation !== animator._currentAnimation) {
            animator._currentAnimation = animator.animation;
            animator.currentFrame = 0;
            animator.currentTime = 0;
            animator.state = "playing";
        }

        if (animator.state !== "playing") return;

        if (animator.currentTime >= (1 / this.animation.fps) * (animator.currentFrame + 1)) {
            if (animator.currentFrame === this.animation.frames.length - 1) {
                if (this.animation.loop) {
                    animator.currentFrame = 0;
                    animator.currentTime = 0;
                } else {
                    animator.state = "ended";
                }
            } else {
                animator.currentFrame++;
            }
        }

        animator.currentTime += this.timeManager.renderDeltaTime * animator.speed;
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
