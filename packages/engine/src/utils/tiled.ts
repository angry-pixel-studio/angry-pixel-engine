import { TiledGroupLayer, TiledLayer, TiledObjectLayer } from "@component/gameLogic/TiledWrapper";

/** @internal */
export type TiledLayerCallback = (
    layer: TiledLayer | TiledObjectLayer,
    offsetX: number,
    offsetY: number,
    visible: boolean,
) => void;

/**
 * Walks the layers of a tilemap, including the ones nested in group layers.\
 * The offset and the visibility of the groups are applied to the layers they contain.
 * @internal
 */
export const forEachTiledLayer = (
    layers: (TiledLayer | TiledObjectLayer | TiledGroupLayer)[],
    callback: TiledLayerCallback,
    offsetX: number = 0,
    offsetY: number = 0,
    visible: boolean = true,
): void =>
    layers.forEach((layer) => {
        const layerOffsetX = offsetX + (layer.offsetx ?? 0);
        const layerOffsetY = offsetY + (layer.offsety ?? 0);
        const layerVisible = visible && layer.visible !== false;

        if (layer.type === "group") {
            forEachTiledLayer(layer.layers, callback, layerOffsetX, layerOffsetY, layerVisible);
        } else {
            callback(layer, layerOffsetX, layerOffsetY, layerVisible);
        }
    });

/**
 * Tiled tint colors are hex-formatted, and include the alpha channel when it is not opaque.\
 * The engine has no alpha channel for the tint color, so it is discarded.
 * @internal
 */
export const tiledTintColor = (tintcolor: string): string =>
    tintcolor.length === 9 ? `#${tintcolor.slice(3)}` : tintcolor;
