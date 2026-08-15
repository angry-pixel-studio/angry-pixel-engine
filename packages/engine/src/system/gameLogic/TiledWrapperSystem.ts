import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TiledLayer, TiledTilemap, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TileAnimation, TilemapRenderer, Tileset } from "@component/render2d/TilemapRenderer";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_SYMBOLS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper, (tiledWrapper, entity) => {
            const tilemap = this.resolveTilemap(tiledWrapper);
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

            if (tilemapRenderer) {
                this.renderLayer(tiledWrapper, tilemap, tilemapRenderer);

                if (!tiledWrapper._animationsMapped && tilemapRenderer.tileset) {
                    this.mapAnimations(tilemap, tilemapRenderer.tileset);
                    tiledWrapper._animationsMapped = true;
                }
            }
        });
    }

    private resolveTilemap(tiledWrapper: TiledWrapper): TiledTilemap {
        if (typeof tiledWrapper.tilemap === "string") {
            const tilemap = this.assetManager.getJson<TiledTilemap>(tiledWrapper.tilemap);
            if (!tilemap) throw new Error(`Tilemap ${tiledWrapper.tilemap} not found`);

            tiledWrapper.tilemap = tilemap;
        }

        return tiledWrapper.tilemap;
    }

    private renderLayer(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, tilemapRenderer: TilemapRenderer): void {
        const layer = tilemap.layers.find(
            (l) => l.name === tiledWrapper.layerToRender && l.type === "tilelayer",
        ) as TiledLayer;

        if (!layer) return;

        if (tilemap.infinite) tilemapRenderer.chunks = layer.chunks;
        else tilemapRenderer.data = layer.data;

        tilemapRenderer.width = tilemap.width;
    }

    private mapAnimations(tilemap: TiledTilemap, tileset: Tileset): void {
        tilemap.tilesets.forEach(({ firstgid, tiles }) => {
            if (!tiles) return;

            tiles.forEach(({ id, animation }) => {
                if (!animation || animation.length === 0) return;

                const tile = firstgid + id;
                if (tileset.animations?.has(tile)) return;

                if (!tileset.animations) tileset.animations = new Map();

                tileset.animations.set(
                    tile,
                    new TileAnimation({
                        tiles: animation.map(({ tileid }) => firstgid + tileid),
                        // Tiled defines a duration per frame, the engine renders every frame at the same rate,
                        // so the average duration is used to preserve the total duration of the animation
                        fps: (1000 * animation.length) / animation.reduce((total, { duration }) => total + duration, 0),
                    }),
                );
            });
        });
    }
}
