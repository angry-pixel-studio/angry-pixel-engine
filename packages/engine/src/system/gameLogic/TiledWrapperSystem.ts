import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { TYPES } from "@config/types";
import { SYSTEMS } from "@config/systems";
import { TiledLayer, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";

@injectable(SYSTEMS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper).forEach(({ entity, component: tiledWrapper }) => {
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);
            if (!tilemapRenderer) return;

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
