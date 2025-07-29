import { RenderDataType, RenderLocation, TilemapOrientation } from "@angry-pixel/2d-renderer";
import { Vector2 } from "@angry-pixel/math";
import { RenderComponent } from "../../core/Component";
/**
 * The TilemapRenderer component allows you to render a tile map defined by an array of tile ids, using an instance of the TileSet object.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *   }
 *   tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
 *   width: 8,
 *   tileWidth: 16,
 *   tileHeight: 16,
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0),
 *   }
 *   tiles: [1, 2, 0, 0, 0, 0, 2, 1, 3, 4, 5, 5, 5, 5, 4, 3],
 *   width: 8,
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   layer: "Tilemap",
 *   smooth: false,
 * });
 * ```
 */
export class TilemapRenderer extends RenderComponent {
    constructor() {
        super(...arguments);
        /** Id of tiles separated by commas. The ids start at 1, and increment from left to right,
         * from top to bottom. ID 0 (zero) represents a space with no tile.  */
        this.tiles = [];
        this.scaledTileWidth = 0;
        this.scaledTileHeight = 0;
    }
    init({ tiles, tileset, tileWidth, tileHeight, width, layer, opacity, tintColor, smooth, }) {
        var _a;
        tiles.split("\n").forEach((row) => {
            row.split(",").forEach((tile) => (tile.trim().length > 0 ? this.tiles.push(Number(tile)) : null));
        });
        this.tileset = tileset;
        this.width = width;
        this.tileWidth = tileWidth !== null && tileWidth !== void 0 ? tileWidth : this.tileset.tileWidth * this.gameConfig.spriteDefaultScale.x;
        this.tileHeight = tileHeight !== null && tileHeight !== void 0 ? tileHeight : this.tileset.tileHeight * this.gameConfig.spriteDefaultScale.y;
        this.layer = layer;
        this.height = Math.ceil(this.tiles.length / this.width);
        this.opacity = opacity;
        this.tintColor = tintColor;
        this.renderData = {
            type: RenderDataType.Tilemap,
            layer: (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            tileset: this.tileset,
            tilemap: {
                width: this.width,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
            },
            tiles: this.tiles,
            orientation: TilemapOrientation.Center,
            smooth,
        };
        this.updateRenderData();
    }
    update() {
        this.updateRenderData();
        this.renderManager.addRenderData(this.renderData);
    }
    updateRenderData() {
        var _a;
        this.scaledTileWidth = this.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tileHeight * this.gameObject.transform.scale.y;
        this.realWidth = this.width * this.scaledTileWidth;
        this.realHeight = this.height * this.scaledTileHeight;
        this.renderData.layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
        this.renderData.position.copy(this.gameObject.transform.position);
        this.renderData.tintColor = this.tintColor;
        this.renderData.alpha = this.opacity;
        this.renderData.tilemap.tileWidth = this.scaledTileWidth;
        this.renderData.tilemap.tileHeight = this.scaledTileHeight;
    }
}
//# sourceMappingURL=TilemapRenderer.js.map