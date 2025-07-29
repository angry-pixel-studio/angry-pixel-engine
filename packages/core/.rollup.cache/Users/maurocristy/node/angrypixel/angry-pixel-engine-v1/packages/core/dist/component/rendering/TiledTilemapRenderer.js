import { RenderDataType, RenderLocation, TilemapOrientation } from "@angry-pixel/2d-renderer";
import { Vector2 } from "@angry-pixel/math";
import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
/**
 * The TiledTilemapRenderer component allows you to render a tile map exported from the Tiled application,
 * using an instance of the TileSet object.
 * @public
 * @category Components
 * @example
 * ```js
 * import TilemapData from "export.json";
 *
 * this.addComponent(TiledTilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *   }
 *   tiledData: TilemapData,
 *   tilemapLayer: "Layer1",
 *   tileWidth: 16,
 *   tileHeight: 16,
 * });
 * ```
 * @example
 * ```js
 * import TilemapData from "export.json";
 *
 * this.addComponent(TilemapRenderer, {
 *   tileset: {
 *     image: this.assetManager.getImage("image.png"),
 *     width: 3,
 *     tileWidth: 16,
 *     tileHeight: 16,
 *     margin: new Vector2(0, 0),
 *     spacing: new Vector2(0, 0),
 *   }
 *   tiledData: TilemapData,
 *   tilemapLayer: "Layer1",
 *   tileWidth: 16,
 *   tileHeight: 16,
 *   layer: "Tilemap",
 *   smooth: false,
 * });
 * ```
 */
export class TiledTilemapRenderer extends RenderComponent {
    constructor() {
        super(...arguments);
        /**
         * Id of tiles separated by commas. The ids start at 1, and increment from left to right,
         * from top to bottom. ID 0 (zero) represents a space with no tile.
         * @readonly
         */
        this.tiles = [];
        this.infinite = false;
        this.tilesetTileIds = [];
        this.chunks = [];
        this.scaledTileWidth = 0;
        this.scaledTileHeight = 0;
        this.renderData = [];
    }
    init({ tiledData, tilemapLayer, tileset, tileWidth, tileHeight, layer, smooth, }) {
        this.tiledData = tiledData;
        this.tileset = tileset;
        this.tileWidth = tileWidth !== null && tileWidth !== void 0 ? tileWidth : this.tileset.tileWidth * this.gameConfig.spriteDefaultScale.x;
        this.tileHeight = tileHeight !== null && tileHeight !== void 0 ? tileHeight : this.tileset.tileHeight * this.gameConfig.spriteDefaultScale.y;
        this.layer = layer;
        this.smooth = smooth !== null && smooth !== void 0 ? smooth : false;
        this.tiledLayer = this.tiledData.layers.find((layer) => layer.type === "tilelayer" && layer.name === tilemapLayer);
        if (!this.tiledLayer)
            throw new Exception("Invalid tilemap layer");
        this.width = 0;
        this.height = 0;
        this.tiledData.layers.forEach((layer) => {
            if (layer.type !== "tilelayer")
                return;
            this.width = Math.max(this.width, layer.width);
            this.height = Math.max(this.height, layer.height);
        });
        this.processTilemap();
    }
    update() {
        this.updateRenderData();
        this.renderData.forEach((renderData) => this.renderManager.addRenderData(renderData));
    }
    processTilemap() {
        if (this.tiledLayer.visible === true) {
            this.opacity = this.tiledLayer.opacity;
            this.tintColor = this.tiledLayer.tintcolor;
            if (this.tiledData.infinite) {
                this.infinite = true;
                this.tiledLayer.chunks
                    .sort((a, b) => a.x - b.x)
                    .sort((a, b) => a.y - b.y)
                    .forEach((chunk) => this.processChunk(chunk));
            }
            else {
                this.processFixedLayer();
            }
        }
        this.updateRenderData();
        this.tilesetTileIds = []; // free memory
    }
    processFixedLayer() {
        var _a;
        this.tiles = this.tiledLayer.data.map((tile) => this.getTilesetTileId(tile));
        this.renderData.push({
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
            smooth: this.smooth,
        });
    }
    processChunk(chunk) {
        var _a;
        const renderData = {
            type: RenderDataType.Tilemap,
            layer: (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            tileset: this.tileset,
            tilemap: {
                width: chunk.width,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
            },
            tiles: chunk.data.map((tile) => this.getTilesetTileId(tile)),
            orientation: TilemapOrientation.Center,
            smooth: this.smooth,
        };
        renderData.tiles.forEach((t, i) => {
            this.tiles[this.width * (chunk.y + Math.floor(i / chunk.width)) + chunk.x + (i % chunk.width)] = t;
        });
        this.renderData.push(renderData);
        this.chunks.push(chunk);
    }
    getTilesetTileId(tile) {
        if (!this.tilesetTileIds[tile]) {
            this.tilesetTileIds[tile] = this.tiledData.tilesets.reduce((id, tileset) => (tile >= tileset.firstgid ? tile - tileset.firstgid + 1 : id), 0);
        }
        return this.tilesetTileIds[tile];
    }
    updateRenderData() {
        this.scaledTileWidth = this.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tileHeight * this.gameObject.transform.scale.y;
        this.realWidth = this.width * this.scaledTileWidth;
        this.realHeight = this.height * this.scaledTileHeight;
        this.renderData.forEach((renderData, index) => {
            var _a;
            renderData.layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
            if (this.infinite) {
                const chunk = this.chunks[index];
                renderData.position.set(this.gameObject.transform.position.x -
                    this.realWidth / 2 +
                    (chunk.x + chunk.width / 2) * this.scaledTileWidth, this.gameObject.transform.position.y +
                    this.realHeight / 2 -
                    (chunk.y + chunk.height / 2) * this.scaledTileHeight);
            }
            else {
                renderData.position.copy(this.gameObject.transform.position);
            }
            renderData.tilemap.tileWidth = this.scaledTileWidth;
            renderData.tilemap.tileHeight = this.scaledTileHeight;
            renderData.tintColor = this.tintColor;
            renderData.alpha = this.opacity;
        });
    }
}
//# sourceMappingURL=TiledTilemapRenderer.js.map