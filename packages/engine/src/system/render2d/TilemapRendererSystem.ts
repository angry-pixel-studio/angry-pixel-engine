import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { RenderDataType, TilemapOrientation, TilemapRenderData } from "@webgl";

@injectable(SYSTEMS.TilemapRendererSystem)
export class TilemapRendererSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TilemapRenderer).forEach(({ entity, component: tilemapRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("TilemapRenderer component needs a Transform");

            if (!tilemapRenderer._processed) return;

            // The complete property determines if the image was loaded
            if (!tilemapRenderer.tileset.image || !tilemapRenderer.tileset.image.complete) return;

            tilemapRenderer.chunks.forEach((chunk) => {
                const renderData: TilemapRenderData = {
                    type: RenderDataType.Tilemap,
                    orientation: TilemapOrientation.Center,
                    position: new Vector2(),
                    layer: tilemapRenderer.layer,
                    tilemap: {
                        width: chunk.width,
                        height: Math.ceil(tilemapRenderer.data.length / chunk.width),
                        tileWidth: tilemapRenderer.tileWidth * Math.abs(transform.localScale.x),
                        tileHeight: tilemapRenderer.tileHeight * Math.abs(transform.localScale.y),
                        realWidth: 0,
                        realHeight: 0,
                    },
                    tiles: chunk.data,
                    tileset: tilemapRenderer.tileset,
                    opacity: tilemapRenderer.opacity,
                    rotation: transform.localRotation,
                    tintColor: tilemapRenderer.tintColor,
                    smooth: tilemapRenderer.smooth,
                };

                renderData.tilemap.realWidth = renderData.tilemap.width * renderData.tilemap.tileWidth;
                renderData.tilemap.realHeight = renderData.tilemap.height * renderData.tilemap.tileHeight;

                renderData.position.x =
                    transform.localPosition.x +
                    (chunk.x - tilemapRenderer.width / 2 + chunk.width / 2) * renderData.tilemap.tileWidth +
                    (renderData.orientation !== TilemapOrientation.Center ? renderData.tilemap.realWidth / 2 : 0);

                renderData.position.y =
                    transform.localPosition.y +
                    (tilemapRenderer.height / 2 - chunk.y - chunk.height / 2) * renderData.tilemap.tileHeight +
                    (renderData.orientation === TilemapOrientation.RightDown
                        ? -renderData.tilemap.realHeight / 2
                        : renderData.orientation === TilemapOrientation.RightUp
                          ? renderData.tilemap.realHeight / 2
                          : 0);

                this.renderManager.addRenderData(renderData);
            });
        });
    }
}
