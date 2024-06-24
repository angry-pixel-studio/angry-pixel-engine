import { TilemapRenderer } from "../../component/renderer/TilemapRenderer";
import { IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { TiledLayer, TiledWrapper } from "../../component/TiledWrapper";

export class TiledWrapperSystem extends System {
    constructor(private readonly entityManager: IEntityManager) {
        super();

        this.group = SystemGroup.PreGameLogic;
    }

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
