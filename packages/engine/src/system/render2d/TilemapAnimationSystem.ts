import { TileAnimation, TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { TimeManager } from "@manager/TimeManager";

@injectable(SYSTEM_SYMBOLS.TilemapAnimationSystem)
export class TilemapAnimationSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TilemapRenderer, (tilemapRenderer) => {
            // drop state for tiles whose animation was removed, otherwise their last frame would render forever
            tilemapRenderer._tileAnimationState.forEach((_, tile) => {
                if (!tilemapRenderer.animations.has(tile)) tilemapRenderer._tileAnimationState.delete(tile);
            });

            if (tilemapRenderer.animations.size === 0) return;

            tilemapRenderer.animations.forEach((animation, tile) => {
                this.advance(animation);
                tilemapRenderer._tileAnimationState.set(tile, animation.tiles[animation.currentFrame]);
            });
        });
    }

    private advance(animation: TileAnimation): void {
        if (animation.tiles.length === 0) return;

        if (animation.currentTime >= (1 / animation.fps) * (animation.currentFrame + 1)) {
            if (animation.currentFrame === animation.tiles.length - 1) {
                animation.currentFrame = 0;
                animation.currentTime = 0;
            } else {
                animation.currentFrame++;
            }
        }

        animation.currentTime += this.timeManager.renderDeltaTime;
    }
}
