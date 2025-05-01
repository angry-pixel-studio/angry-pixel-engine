import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { TiledLayer, TiledTilemap, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_TYPES.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper).forEach(({ entity, component: tiledWrapper }) => {
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);
            if (!tilemapRenderer) return;

            if (typeof tiledWrapper.tilemap === "string") {
                tiledWrapper.tilemap = this.assetManager.getJson<TiledTilemap>(tiledWrapper.tilemap);
                if (!tiledWrapper.tilemap) throw new Error(`Tilemap ${tiledWrapper.tilemap} not found`);
            }

            const layer = tiledWrapper.tilemap.layers.find(
                (l) => l.name === tiledWrapper.layerToRender && l.type === "tilelayer",
            ) as TiledLayer;

            if (!layer) return;

            if (tiledWrapper.tilemap.infinite) tilemapRenderer.chunks = layer.chunks;
            else tilemapRenderer.data = layer.data;

            tilemapRenderer.width = tiledWrapper.tilemap.width;
        });
    }
}
