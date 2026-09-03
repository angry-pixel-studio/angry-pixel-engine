import { TiledGroupLayer, TiledLayer, TiledObjectLayer } from "@component/gameLogic/TiledWrapper";

/** @internal */
export type TiledLayerCallback = (
    layer: TiledLayer | TiledObjectLayer,
    offsetX: number,
    offsetY: number,
    visible: boolean,
    opacity: number,
) => void;

/**
 * Walks the layers of a tilemap, including the ones nested in group layers.\
 * The offset, the visibility and the opacity of the groups are applied to the layers they contain.
 * @internal
 */
export const forEachTiledLayer = (
    layers: (TiledLayer | TiledObjectLayer | TiledGroupLayer)[],
    callback: TiledLayerCallback,
    offsetX: number = 0,
    offsetY: number = 0,
    visible: boolean = true,
    opacity: number = 1,
): void =>
    layers.forEach((layer) => {
        const layerOffsetX = offsetX + (layer.offsetx ?? 0);
        const layerOffsetY = offsetY + (layer.offsety ?? 0);
        const layerVisible = visible && layer.visible !== false;
        const layerOpacity = opacity * (layer.opacity ?? 1);

        if (layer.type === "group") {
            forEachTiledLayer(layer.layers, callback, layerOffsetX, layerOffsetY, layerVisible, layerOpacity);
        } else {
            callback(layer, layerOffsetX, layerOffsetY, layerVisible, layerOpacity);
        }
    });

/**
 * Tiled stores the path of a tileset image relative to the tilemap file, while the assets are keyed\
 * by the URL they were loaded with, so the path is resolved against the URL of the tilemap.\
 * Absolute paths are left as they are, and so are relative ones when the URL of the tilemap is unknown.
 * @internal
 */
export const resolveTiledPath = (tilemapPath: string, path: string): string => {
    if (!tilemapPath || path.startsWith("/") || path.includes("://")) return path;

    const segments: string[] = [];

    `${tilemapPath.slice(0, tilemapPath.lastIndexOf("/") + 1)}${path}`.split("/").forEach((segment) => {
        if (segment === ".") return;

        if (segment === ".." && segments.length > 0 && segments[segments.length - 1] !== "..") segments.pop();
        else segments.push(segment);
    });

    return segments.join("/");
};

/**
 * Tiled tint colors are hex-formatted, and include the alpha channel when it is not opaque.\
 * The engine has no alpha channel for the tint color, so it is discarded.
 * @internal
 */
export const tiledTintColor = (tintcolor: string): string =>
    tintcolor.length === 9 ? `#${tintcolor.slice(3)}` : tintcolor;
