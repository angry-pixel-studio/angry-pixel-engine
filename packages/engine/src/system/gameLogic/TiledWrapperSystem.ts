import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { TiledLayer, TiledTilemap, TiledTileset, TiledWrapper } from "@component/gameLogic/TiledWrapper";
import { TileAnimation, TilemapRenderer, Tileset } from "@component/render2d/TilemapRenderer";
import { forEachTiledLayer, resolveTiledPath, tiledTintColor } from "@utils/tiled";
import { AssetManager } from "@manager/AssetManager";

@injectable(SYSTEM_SYMBOLS.TiledWrapperSystem)
export class TiledWrapperSystem implements System {
    // the tilemaps whose load was requested, so it is not requested again on every frame while it is pending
    private readonly requestedTilemaps: Set<string> = new Set();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.AssetManager) private readonly assetManager: AssetManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(TiledWrapper, (tiledWrapper, entity) => {
            if (tiledWrapper._processed && tiledWrapper._animationsMapped) return;

            const tilemap = this.resolveTilemap(tiledWrapper);
            if (!tilemap) return;

            const tilemapRenderer = this.entityManager.getComponent(entity, TilemapRenderer);

            if (!tiledWrapper._processed) {
                if (tilemapRenderer) {
                    this.resolveTilesets(tiledWrapper, tilemap, tilemapRenderer);
                    this.renderLayer(tiledWrapper, tilemap, tilemapRenderer);
                }
                tiledWrapper._processed = true;
            }

            if (!tiledWrapper._animationsMapped) {
                if (tilemap.tilesets && tilemapRenderer?.tilesets.length > 0) {
                    this.mapAnimations(tilemap, tilemapRenderer.tilesets);
                }
                tiledWrapper._animationsMapped = true;
            }
        });
    }

    /**
     * The tilemap is read from the assets, and loaded if the scene did not load it, in which case it is\
     * read as soon as it becomes available. A wrapper without a tilemap path is ignored.
     */
    private resolveTilemap(tiledWrapper: TiledWrapper): TiledTilemap {
        if (!tiledWrapper.tilemapPath) return undefined;

        const tilemap = this.assetManager.getJson<TiledTilemap>(tiledWrapper.tilemapPath);

        if (!tilemap) {
            if (!this.requestedTilemaps.has(tiledWrapper.tilemapPath)) {
                this.requestedTilemaps.add(tiledWrapper.tilemapPath);
                this.assetManager.loadJson<TiledTilemap>(tiledWrapper.tilemapPath);
            }

            return undefined;
        }

        this.requestedTilemaps.delete(tiledWrapper.tilemapPath);
        tiledWrapper._tilemap = tilemap;

        return tilemap;
    }

    private resolveTilesets(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, tilemapRenderer: TilemapRenderer): void {
        if (tilemapRenderer.tilesets.length > 0 && !tiledWrapper._tilesetsCreated) {
            tilemapRenderer.tilesets.forEach((tileset, i) => {
                tileset.firstgid = tileset.firstgid ?? tilemap.tilesets?.[i]?.firstgid ?? 1;
            });

            return;
        }

        if (!(tilemap.tilesets?.length > 0)) {
            throw new Error(
                `The tilemap ${tiledWrapper.tilemapPath} has no embedded tilesets. Export it from Tiled with ` +
                    "its tilesets embedded, or declare the tilesets of the TilemapRenderer",
            );
        }

        // the paths of the tileset images are relative to the tilemap file
        tilemapRenderer.tilesets = tilemap.tilesets.map((tileset) =>
            this.createTileset(tileset, tiledWrapper.tilemapPath),
        );
        tiledWrapper._tilesetsCreated = true;
    }

    private createTileset(
        { firstgid, name, source, image, tilewidth, tileheight, margin, spacing, tilecount }: TiledTileset,
        tilemapPath: string,
    ): Tileset {
        if (!image) {
            throw new Error(
                `The tileset ${name ?? source} is not embedded in the tilemap, the engine does not read ` +
                    "external tilesets. Export the tilemap with its tilesets embedded, or declare the " +
                    "tilesets of the TilemapRenderer",
            );
        }

        return {
            image: resolveTiledPath(tilemapPath, image),
            tileWidth: tilewidth,
            tileHeight: tileheight,
            margin,
            spacing,
            firstgid,
            tileCount: tilecount,
        };
    }

    private renderLayer(tiledWrapper: TiledWrapper, tilemap: TiledTilemap, tilemapRenderer: TilemapRenderer): void {
        let layer: TiledLayer;
        let visible: boolean;
        let opacity: number;

        forEachTiledLayer(tilemap.layers, (candidate, offsetX, offsetY, layerVisible, layerOpacity) => {
            if (layer || candidate.type !== "tilelayer" || candidate.name !== tiledWrapper.layerToRender) return;

            layer = candidate;
            visible = layerVisible;
            // the opacity of the groups that contain the layer is already applied
            opacity = layerOpacity;
            // the y axis of Tiled points downwards
            tilemapRenderer.offset.set(offsetX, -offsetY);
        });

        if (!layer) return;

        tilemapRenderer.opacity = opacity;
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

    private mapAnimations(tilemap: TiledTilemap, tilesets: Tileset[]): void {
        tilemap.tilesets.forEach(({ firstgid, tiles }) => {
            if (!tiles) return;

            // the animations belong to the tileset that owns the animated tiles
            const tileset = tilesets.find((candidate) => candidate.firstgid === firstgid);
            if (!tileset) return;

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
