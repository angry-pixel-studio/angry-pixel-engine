import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TiledLayer, TiledTilemap, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_SYMBOLS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
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
