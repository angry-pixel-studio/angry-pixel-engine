import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { GeometricShape, RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
import { Vector2 } from "@angry-pixel/math";
import { Line, Rectangle } from "@angry-pixel/2d-physics";
/**
 * Generates rectangle colliders for the map edge tiles (or lines if composite is TRUE).
 * **Limitations:** At the moment, it is not possible to modify the shape, position, scale and rotation of the collider once it has been generated.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TilemapCollider, {
 *   tilemapRenderer: this.getComponent(TilemapRenderer),
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(TilemapCollider, {
 *   tilemapRenderer: this.getComponent(TilemapRenderer),
 *   layer: "Foreground",
 *   debug: false,
 *   composite: true,
 * });
 * ```
 */
export class TilemapCollider extends BaseCollider {
    constructor() {
        super(...arguments);
        /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
        this.debug = false;
        this.position = new Vector2();
    }
    init(config) {
        var _a, _b;
        this.tilemapRenderer = config.tilemapRenderer;
        this.layer = config.layer;
        this.debug = ((_a = config.debug) !== null && _a !== void 0 ? _a : this.debug) && this.gameConfig.debugEnabled;
        this.physics = true; // TODO: find a better way
        this.composite = (_b = config.composite) !== null && _b !== void 0 ? _b : false;
        this.scaledTileWidth = this.tilemapRenderer.tileWidth * this.gameObject.transform.scale.x;
        this.scaledTileHeight = this.tilemapRenderer.tileHeight * this.gameObject.transform.scale.y;
        this.scaledWidth = this.tilemapRenderer.width * this.scaledTileWidth;
        this.scaledHeight = this.tilemapRenderer.height * this.scaledTileHeight;
        this.position.set(this.gameObject.transform.position.x - this.scaledWidth / 2, this.gameObject.transform.position.y + this.scaledHeight / 2);
        this.composite ? this.useLineColliders() : this.useBoxColliders();
        if (this.debug) {
            this.renderer = this.gameObject.addComponent(TilemapColliderRenderer, { colliders: this.colliders });
        }
    }
    useBoxColliders() {
        this.tilemapRenderer.tiles.forEach((tile, index) => {
            var _a;
            if (!this.needsCollider(tile, index))
                return;
            this.colliders.push(this.physicsManager.addCollider({
                layer: (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer,
                position: new Vector2(this.position.x + ((index % this.tilemapRenderer.width) + 0.5) * this.scaledTileWidth, this.position.y - (Math.floor(index / this.tilemapRenderer.width) + 0.5) * this.scaledTileHeight),
                shape: new Rectangle(this.scaledTileWidth, this.scaledTileHeight),
                updateCollisions: false,
                physics: this.physics,
                group: this.gameObject.id.toString(),
            }));
        });
    }
    needsCollider(tile, index) {
        return (tile !== 0 &&
            this.getNeighbors(index).some((neighbor) => !neighbor || !this.tilemapRenderer.tiles[neighbor] || this.tilemapRenderer.tiles[neighbor] === 0));
    }
    useLineColliders() {
        const hVertices = [];
        const vVertices = [];
        this.tilemapRenderer.tiles.forEach((tile, index) => {
            if (tile === 0)
                return;
            const x = index % this.tilemapRenderer.width;
            const y = Math.floor(index / this.tilemapRenderer.width);
            if (!hVertices[y])
                hVertices[y] = [];
            if (!hVertices[y + 1])
                hVertices[y + 1] = [];
            if (!vVertices[y])
                vVertices[y] = [];
            if (!vVertices[y + 1])
                vVertices[y + 1] = [];
            const neighbors = this.getNeighbors(index);
            // up
            if (!this.hasTile(neighbors[0])) {
                hVertices[y][x] = true;
            }
            // down
            if (!this.hasTile(neighbors[2])) {
                hVertices[y + 1][x] = true;
            }
            // left
            if (!this.hasTile(neighbors[1])) {
                vVertices[y][x] = true;
            }
            // right
            if (!this.hasTile(neighbors[3])) {
                vVertices[y][x + 1] = true;
            }
        });
        let start;
        let end;
        for (let y = 0; y < hVertices.length; y++) {
            if (!hVertices[y])
                continue;
            for (let x = 0; x < hVertices[y].length; x++) {
                if (start && end && (y !== end.y || !hVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }
                if (hVertices[y][x]) {
                    if (!start)
                        start = new Vector2(x, y);
                    end = new Vector2(x + 1, y);
                }
            }
        }
        if (start && end)
            this.addLineCollider(start, end);
        start = undefined;
        end = undefined;
        for (let x = 0; x <= this.tilemapRenderer.width; x++) {
            for (let y = 0; y < vVertices.length; y++) {
                if (!vVertices[y])
                    continue;
                if (start && end && (x !== end.x || !vVertices[y][x])) {
                    this.addLineCollider(start, end);
                    start = undefined;
                    end = undefined;
                }
                if (vVertices[y][x]) {
                    if (!start)
                        start = new Vector2(x, y);
                    end = new Vector2(x, y + 1);
                }
            }
        }
        if (start && end)
            this.addLineCollider(start, end);
    }
    hasTile(index) {
        return index !== undefined && this.tilemapRenderer.tiles[index] && this.tilemapRenderer.tiles[index] > 0;
    }
    addLineCollider(start, end) {
        var _a;
        const collider = this.physicsManager.addCollider({
            layer: (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer,
            position: this.position.clone(),
            shape: new Line([
                new Vector2(start.x * this.scaledTileWidth, start.y * -this.scaledTileHeight),
                new Vector2(end.x * this.scaledTileWidth, end.y * -this.scaledTileHeight),
            ]),
            updateCollisions: false,
            physics: this.physics,
            group: this.gameObject.id.toString(),
        });
        this.colliders.push(collider);
    }
    getNeighbors(index) {
        // up - left - down - right
        return [
            index - this.tilemapRenderer.width >= 0 ? index - this.tilemapRenderer.width : undefined,
            index % this.tilemapRenderer.width > 0 ? index - 1 : undefined,
            index + this.tilemapRenderer.width <= this.tilemapRenderer.width * this.tilemapRenderer.height
                ? index + this.tilemapRenderer.width
                : undefined,
            index % this.tilemapRenderer.width < this.tilemapRenderer.width - 1 ? index + 1 : undefined,
        ];
    }
    updateRealSize() {
        // do nothing
    }
    updatePosition() {
        // do nothing
    }
    updateColliders() {
        this.colliders.forEach((collider) => { var _a; return (collider.layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer); });
    }
}
/** @internal */
class TilemapColliderRenderer extends RenderComponent {
    constructor() {
        super(...arguments);
        this.renderData = [];
        this.colliders = [];
    }
    init({ colliders }) {
        this.colliders = colliders;
        this.colliders.forEach((collider, index) => {
            this.renderData[index] = {
                type: RenderDataType.Geometric,
                layer: this.gameObject.layer,
                location: RenderLocation.WorldSpace,
                position: new Vector2(),
                shape: GeometricShape.Polygon,
                color: "#00FF00",
            };
        });
    }
    update() {
        this.colliders.forEach((collider, index) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position.copy(collider.shape.position);
            this.renderData[index].rotation = collider.rotation;
            this.renderData[index].vertexModel = collider.shape.vertexModel;
            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
//# sourceMappingURL=TilemapCollider.js.map