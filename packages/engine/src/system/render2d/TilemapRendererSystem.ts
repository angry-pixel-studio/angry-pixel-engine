import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { SYSTEMS } from "@config/systemTypes";
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

            tilemapRenderer.chunks.forEach((chunk, i) => {
                if (!tilemapRenderer._renderData[i]) tilemapRenderer._renderData[i] = renderDataFactory();
                const renderData = tilemapRenderer._renderData[i];

                renderData.type = RenderDataType.Tilemap;
                renderData.orientation = TilemapOrientation.Center;
                renderData.position = new Vector2();
                renderData.layer = tilemapRenderer.layer;

                renderData.tilemap.width = chunk.width;
                renderData.tilemap.height = Math.ceil(tilemapRenderer.data.length / chunk.width);
                renderData.tilemap.tileWidth = tilemapRenderer.tileWidth * Math.abs(transform.localScale.x);
                renderData.tilemap.tileHeight = tilemapRenderer.tileHeight * Math.abs(transform.localScale.y);
                renderData.tilemap.realWidth = renderData.tilemap.width * renderData.tilemap.tileWidth;
                renderData.tilemap.realHeight = renderData.tilemap.height * renderData.tilemap.tileHeight;

                renderData.tiles = chunk.data;
                renderData.tileset = tilemapRenderer.tileset;
                renderData.opacity = tilemapRenderer.opacity;
                renderData.rotation = transform.localRotation;
                renderData.tintColor = tilemapRenderer.tintColor;
                renderData.smooth = tilemapRenderer.smooth;
                renderData.maskColor = tilemapRenderer.maskColor;
                renderData.maskColorMix = tilemapRenderer.maskColorMix;

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

    /*private setPositionByOrientation(
        renderData: TilemapRenderData,
        tilemapRenderer: TilemapRenderer,
        transform: Transform,
        chunk: Chunk,
    ): void {
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
    }*/
}

const renderDataFactory = (): TilemapRenderData => ({
    type: RenderDataType.Tilemap,
    layer: undefined,
    position: new Vector2(),
    tilemap: {
        height: undefined,
        realHeight: undefined,
        realWidth: undefined,
        tileHeight: undefined,
        tileWidth: undefined,
        width: undefined,
    },
    tiles: undefined,
    tileset: undefined,
});
