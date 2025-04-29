import { Animation, Animator } from "@component/gameLogic/Animator";
import { SpriteRenderer } from "@component/render2d/SpriteRenderer";
import { SYSTEMS } from "@config/systemTypes";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { AssetManager } from "@manager/AssetManager";
import { TimeManager } from "@manager/TimeManager";

@injectable(SYSTEMS.AnimatorSystem)
export class AnimatorSystem implements System {
    // auxiliar
    private animation: Animation;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.TimeManager) private readonly timeManager: TimeManager,
        @inject(TYPES.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Animator).forEach(({ entity, component: animator }) => {
            this.processAssets(animator);

            this.reset(animator);

            this.animation = animator.animations.get(animator.animation);
            if (!this.animation) return;

            this.play(animator);

            animator._currentAnimation = animator.animation;

            const spriteRenderer = this.entityManager.getComponent(entity, SpriteRenderer);
            if (spriteRenderer) this.renderSprite(animator, spriteRenderer);
        });
    }

    private processAssets(animator: Animator): void {
        if (!animator._assetsReady) {
            animator.animations.forEach((animation) => {
                if (typeof animation.image === "string") {
                    animation.image = this.assetManager.getImage(animation.image);
                    if (!animation.image) throw new Error(`Asset ${animation.image} not found`);
                } else if (Array.isArray(animation.image)) {
                    animation.image = animation.image.map((image) => {
                        if (typeof image === "string") {
                            const asset = this.assetManager.getImage(image);
                            if (!asset) throw new Error(`Asset ${image} not found`);
                            return asset;
                        }
                        return image;
                    });
                }
            });
            animator._assetsReady = true;
        }
    }

    private reset(animator: Animator): void {
        if (animator.reset) {
            animator.currentFrame = 0;
            animator.currentTime = 0;
            animator.playing = animator.animation !== undefined;
            animator.reset = false;
        }
    }

    private play(animator: Animator): void {
        if (animator.animation !== animator._currentAnimation) {
            animator._currentAnimation = animator.animation;
            animator.currentFrame = 0;
            animator.currentTime = 0;
            animator.playing = true;
        }

        if (!animator.playing) return;

        if (animator.currentTime >= (1 / this.animation.fps) * (animator.currentFrame + 1)) {
            if (animator.currentFrame === this.animation.frames.length - 1) {
                if (this.animation.loop) {
                    animator.currentFrame = 0;
                    animator.currentTime = 0;
                } else {
                    animator.playing = false;
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
            if (typeof this.animation.image === "string") return;
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
