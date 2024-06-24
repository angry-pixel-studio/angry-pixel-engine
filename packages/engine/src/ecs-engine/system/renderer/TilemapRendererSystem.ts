import {
    IRenderManager,
    ITilemapRenderData,
    RenderDataType,
    RenderLocation,
    TilemapOrientation,
} from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { Entity, IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";
import { TilemapRenderer } from "../../component/renderer/TilemapRenderer";
import { Transform } from "../../component/Transform";

export class TilemapRendererSystem extends System {
    private renderData: Map<Entity, ITilemapRenderData[]> = new Map();

    constructor(
        private entityManager: IEntityManager,
        private renderManager: IRenderManager,
    ) {
        super();
        this.group = SystemGroup.Render;
    }

    public onEnable(): void {
        this.renderData = new Map();
    }

    public onUpdate(): void {
        this.entityManager.search(TilemapRenderer).forEach(({ entity, component: tilemapRenderer }) => {
            if (!this.renderData.has(entity)) this.createRenderData(entity, tilemapRenderer);

            // The natural width value determines if the image was loaded
            if (!tilemapRenderer.tileset.image || !tilemapRenderer.tileset.image.naturalWidth) return;

            const transform = this.entityManager.getComponent(entity, Transform);

            tilemapRenderer.chunks.forEach((chunk, index) => {
                const renderData = this.renderData.get(entity)[index];

                renderData.alpha = tilemapRenderer.opacity;
                renderData.layer = tilemapRenderer.layer;
                renderData.rotation = transform.localRotation;
                renderData.tintColor = tilemapRenderer.tintColor;
                renderData.smooth = tilemapRenderer.smooth;

                renderData.tilemap.tileWidth = tilemapRenderer.tileWidth * Math.abs(transform.localScale.x);
                renderData.tilemap.tileHeight = tilemapRenderer.tileHeight * Math.abs(transform.localScale.y);

                renderData.position.x =
                    transform.localPosition.x +
                    (chunk.x - tilemapRenderer.width / 2 + chunk.width / 2) * renderData.tilemap.tileWidth;

                renderData.position.y =
                    transform.localPosition.y +
                    (tilemapRenderer.height / 2 - chunk.y - chunk.height / 2) * renderData.tilemap.tileHeight;

                this.renderManager.addRenderData(renderData);
            });
        });
    }

    private createRenderData(entity: Entity, tilemapRenderer: TilemapRenderer): void {
        this.renderData.set(entity, []);

        tilemapRenderer.chunks.forEach(
            (chunk, index) =>
                (this.renderData.get(entity)[index] = {
                    type: RenderDataType.Tilemap,
                    location: RenderLocation.WorldSpace,
                    orientation: TilemapOrientation.Center,
                    position: new Vector2(),
                    layer: undefined,
                    tilemap: {
                        width: chunk.width,
                        tileHeight: 0,
                        tileWidth: 0,
                    },
                    tiles: chunk.data,
                    tileset: tilemapRenderer.tileset,
                }),
        );
    }
}
