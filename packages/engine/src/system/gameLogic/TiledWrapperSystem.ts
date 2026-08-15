import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TiledLayer, TiledTilemap, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TileAnimation, TilemapRenderer, Tileset } from "@component/render2d/TilemapRenderer";
import { forEachTiledLayer, tiledTintColor } from "@utils/tiled";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_SYMBOLS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper, (tiledWrapper, entity) => {
            if (tiledWrapper._processed && tiledWrapper._animationsMapped) return;

            const tilemap = this.resolveTilemap(tiledWrapper);
            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

            if (!tiledWrapper._processed) {
                if (tilemapRenderer) this.renderLayer(tiledWrapper, tilemap, tilemapRenderer);
                tiledWrapper._processed = true;
            }

            if (!tiledWrapper._animationsMapped) {
                if (tilemapRenderer?.tileset) this.mapAnimations(tilemap, tilemapRenderer.tileset);
                tiledWrapper._animationsMapped = true;
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
        let layer: TiledLayer;
        let visible: boolean;

        forEachTiledLayer(tilemap.layers, (candidate, offsetX, offsetY, layerVisible) => {
            if (layer || candidate.type !== "tilelayer" || candidate.name !== tiledWrapper.layerToRender) return;

            layer = candidate;
            visible = layerVisible;
            // the y axis of Tiled points downwards
            tilemapRenderer.offset.set(offsetX, -offsetY);
        });

        if (!layer) return;

        tilemapRenderer.opacity = layer.opacity ?? tilemapRenderer.opacity;
        if (layer.tintcolor) tilemapRenderer.tintColor = tiledTintColor(layer.tintcolor);
        tilemapRenderer.tileWidth = tilemapRenderer.tileWidth ?? tilemap.tilewidth;
        tilemapRenderer.tileHeight = tilemapRenderer.tileHeight ?? tilemap.tileheight;

        if (!visible) {
            tilemapRenderer.data = [];
            tilemapRenderer.chunks = [];
            tilemapRenderer.width = 0;
            tilemapRenderer.height = 0;
            return;
        }

        if (tilemap.infinite) {
            // the chunks of an infinite tilemap are placed from the top-left corner of the layer,
            // which is not the origin of the tilemap and can even have negative coordinates
            const startX = layer.startx ?? 0;
            const startY = layer.starty ?? 0;

            tilemapRenderer.chunks = layer.chunks.map((chunk) => ({
                ...chunk,
                x: chunk.x - startX,
                y: chunk.y - startY,
            }));
            tilemapRenderer.width = layer.width;
            tilemapRenderer.height = layer.height;
            tiledWrapper._origin.set(startX, startY);
        } else {
            tilemapRenderer.data = layer.data;
            tilemapRenderer.width = tilemap.width;
            tilemapRenderer.height = tilemap.height;
            tiledWrapper._origin.set(0, 0);
        }
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
