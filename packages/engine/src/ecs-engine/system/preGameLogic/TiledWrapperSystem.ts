import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { TilemapRenderer } from "../../component/renderer/TilemapRenderer";
import { TiledLayer, TiledWrapper } from "../../component/TiledWrapper";

export class TiledWrapperSystem implements System {
    constructor(private readonly entityManager: EntityManager) {}

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
