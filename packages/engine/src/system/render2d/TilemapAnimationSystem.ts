import { TileAnimation, TilemapRenderer, Tileset } from "@component/render2d/TilemapRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { TimeManager } from "@manager/TimeManager";

@injectable(SYSTEM_SYMBOLS.TilemapAnimationSystem)
export class TilemapAnimationSystem implements System {
    // a tileset can be shared by several tilemaps, so its animations are advanced only once per frame
    private tilesets: Set<Tileset> = new Set();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.TimeManager) private readonly timeManager: TimeManager,
    ) {}

    public onUpdate(): void {
        this.tilesets.clear();
        this.entityManager.search(TilemapRenderer, ({ tileset }) => {
            if (tileset) this.tilesets.add(tileset);
        });

        this.tilesets.forEach((tileset) => this.updateTileset(tileset));
    }

    private updateTileset(tileset: Tileset): void {
        if (!tileset.animations || tileset.animations.size === 0) {
            tileset._animationState?.clear();
            return;
        }

        if (!tileset._animationState) tileset._animationState = new Map();

        // drop state for tiles whose animation was removed, otherwise their last frame would render forever
        tileset._animationState.forEach((_, tile) => {
            if (!tileset.animations.has(tile)) tileset._animationState.delete(tile);
        });

        tileset.animations.forEach((animation, tile) => {
            this.advance(animation);
            tileset._animationState.set(tile, animation.tiles[animation.currentFrame]);
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
