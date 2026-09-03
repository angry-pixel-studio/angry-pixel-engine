import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { AssetManager } from "@manager/AssetManager";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@angry-pixel/math";
import { RenderDataType, TilemapOrientation, TilemapRenderData, Tileset } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.TilemapRendererSystem)
export class TilemapRendererSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TilemapRenderer, (tilemapRenderer, entity) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("TilemapRenderer component needs a Transform");

            tilemapRenderer.tilesets.forEach((tileset) => {
                if (typeof tileset.image === "string") {
                    const image = this.assetManager.getImage(tileset.image);
                    if (!image) throw new Error(`Asset ${tileset.image} not found`);

                    tileset.image = image;
                }
            });

            if (!tilemapRenderer._processed) return;

            // the tiles of each tileset are rendered in a separate pass, so the tilesets are iterated first
            // to keep the same texture bound for as many consecutive draws as possible
            tilemapRenderer.tilesets.forEach((tileset, t) => {
                // The complete property determines if the image was loaded
                if (!tileset.image || !(tileset.image as HTMLImageElement).complete) return;

                tilemapRenderer.chunks.forEach((chunk, c) => {
                    const i = t * tilemapRenderer.chunks.length + c;

                    if (!tilemapRenderer._renderData[i]) tilemapRenderer._renderData[i] = renderDataFactory();
                    const renderData = tilemapRenderer._renderData[i];

                    renderData.type = RenderDataType.Tilemap;
                    renderData.orientation = TilemapOrientation.Center;
                    renderData.layer = tilemapRenderer.layer;

                    // the render data represents a single chunk of the tilemap, rendered with a single tileset
                    renderData.tilemap.width = chunk.width;
                    renderData.tilemap.height = chunk.height;
                    renderData.tilemap.tileWidth = tilemapRenderer.tileWidth * Math.abs(transform.localScale.x);
                    renderData.tilemap.tileHeight = tilemapRenderer.tileHeight * Math.abs(transform.localScale.y);
                    renderData.tilemap.realWidth = renderData.tilemap.width * renderData.tilemap.tileWidth;
                    renderData.tilemap.realHeight = renderData.tilemap.height * renderData.tilemap.tileHeight;

                    renderData.tiles = chunk.data;
                    renderData.tileset = tileset as Tileset;
                    renderData.opacity = tilemapRenderer.opacity;
                    renderData.rotation = transform.localRotation;
                    renderData.tintColor = tilemapRenderer.tintColor;
                    renderData.smooth = tilemapRenderer.smooth;
                    renderData.maskColor = tilemapRenderer.maskColor;
                    renderData.maskColorMix = tilemapRenderer.maskColorMix;

                    renderData.position.x =
                        transform.localPosition.x +
                        tilemapRenderer.offset.x * transform.localScale.x +
                        (chunk.x - tilemapRenderer.width / 2 + chunk.width / 2) * renderData.tilemap.tileWidth;

                    renderData.position.y =
                        transform.localPosition.y +
                        tilemapRenderer.offset.y * transform.localScale.y +
                        (tilemapRenderer.height / 2 - chunk.y - chunk.height / 2) * renderData.tilemap.tileHeight;

                    this.renderManager.addRenderData(renderData);
                });
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
