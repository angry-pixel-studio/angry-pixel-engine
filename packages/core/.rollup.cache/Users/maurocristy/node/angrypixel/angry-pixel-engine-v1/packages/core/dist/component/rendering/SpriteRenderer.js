import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
/**
 * The SpriteRenderer component renders the Sprite and allows to configure options such as opacity, offser, color, etc.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(SpriteRenderer, {
 *   sprite: new Sprite({image: this.assetManager.getImage("image.png")})
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(SpriteRenderer, {
 *   sprite: new Sprite({image: this.assetManager.getImage("image.png")}),
 *   offset: new Vector2(0, 0),
 *   flipHorizontal:  false,
 *   flipVertical: false,
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   tiled: new Vector2(1,1),
 *   maskColor: "#FF0000",
 *   maskColorMix: 0,
 *   tintColor: "#00FF00",
 *   layer: "Background",
 *   scale: new Vector2(1,1),
 *   width: 16,
 *   height: 16
 * });
 * ```
 */
export class SpriteRenderer extends RenderComponent {
    constructor() {
        super(...arguments);
        this.renderData = [];
        // cache
        this.innerPosition = new Vector2();
        this.cachePosition = new Vector2();
        this.cacheRenderPosition = new Vector2();
        this.scaledOffset = new Vector2();
        this.cacheScale = new Vector2();
    }
    init(config = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.sprite = config.sprite;
        this.offset = (_a = config.offset) !== null && _a !== void 0 ? _a : new Vector2();
        this.rotation = (_b = config.rotation) !== null && _b !== void 0 ? _b : new Rotation();
        this.flipHorizontal = (_c = config.flipHorizontal) !== null && _c !== void 0 ? _c : false;
        this.flipVertical = (_d = config.flipVertical) !== null && _d !== void 0 ? _d : false;
        this.opacity = (_e = config.opacity) !== null && _e !== void 0 ? _e : 1;
        this._tiled = (_f = config.tiled) !== null && _f !== void 0 ? _f : new Vector2(1, 1);
        this.maskColor = config.maskColor;
        this.maskColorMix = (_g = config.maskColorMix) !== null && _g !== void 0 ? _g : 0;
        this.tintColor = config.tintColor;
        this.layer = config.layer;
        this.scale = (_j = (_h = config.scale) !== null && _h !== void 0 ? _h : this.gameConfig.spriteDefaultScale.clone()) !== null && _j !== void 0 ? _j : new Vector2(1, 1);
        this.width = config.width;
        this.height = config.height;
    }
    /** Render the image in tiles */
    get tiled() {
        return this._tiled;
    }
    /** Renders the image in tiles */
    set tiled(tiled) {
        if (tiled.x % 1 !== 0 || tiled.y % 1 !== 0) {
            throw new Exception("SpriteRenderer.tiled: Vector2 components must be integers");
        }
        this._tiled.set(tiled.x, tiled.y);
    }
    update() {
        if (this.sprite && this.sprite.loaded === true) {
            this.cacheScale.set(this.scale.x * this.gameObject.transform.scale.x, this.scale.y * this.gameObject.transform.scale.y);
            this.updateRenderDataArray();
            let index = 0;
            for (let tileX = 0; tileX < this._tiled.x; tileX++) {
                for (let tileY = 0; tileY < this._tiled.y; tileY++) {
                    this.updateRenderData(index, tileX, tileY);
                    index++;
                }
            }
        }
    }
    updateRenderDataArray() {
        if (this.renderData.length !== this._tiled.x * this._tiled.y) {
            this.renderData = [];
            for (let i = 0; i < this._tiled.x * this._tiled.y; i++) {
                this.renderData[i] = {
                    type: RenderDataType.Sprite,
                    location: RenderLocation.WorldSpace,
                    layer: "",
                    position: new Vector2(),
                    image: this.sprite.image,
                    width: 0,
                    height: 0,
                };
            }
        }
    }
    updateRenderData(index, tileX, tileY) {
        var _a, _b, _c;
        this.renderData[index].location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData[index].layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
        this.renderData[index].image = this.sprite.image;
        this.renderData[index].width = ((_b = this.width) !== null && _b !== void 0 ? _b : this.sprite.width) * Math.abs(this.cacheScale.x);
        this.renderData[index].height = ((_c = this.height) !== null && _c !== void 0 ? _c : this.sprite.height) * Math.abs(this.cacheScale.y);
        this.renderData[index].slice = this.sprite.slice;
        this.renderData[index].flipHorizontal = this.flipHorizontal !== this.cacheScale.x < 0;
        this.renderData[index].flipVertical = this.flipVertical !== this.cacheScale.y < 0;
        this.renderData[index].rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData[index].smooth = this.sprite.smooth;
        this.renderData[index].alpha = this.opacity;
        this.renderData[index].maskColor = this.maskColor;
        this.renderData[index].maskColorMix = this.maskColorMix;
        this.renderData[index].tintColor = this.tintColor;
        this.calculateRenderPosition(index, tileX, tileY);
        this.renderManager.addRenderData(this.renderData[index]);
    }
    calculateRenderPosition(index, tileX, tileY) {
        this.scaledOffset.set(this.offset.x * this.gameObject.transform.scale.x, this.offset.y * this.gameObject.transform.scale.y);
        Vector2.add(this.cachePosition, this.gameObject.transform.position, this.scaledOffset);
        this.cacheRenderPosition.set((this.renderData[index].width / 2) * (this._tiled.x - 1), (this.renderData[index].height / 2) * (this._tiled.y - 1));
        Vector2.subtract(this.cachePosition, this.cachePosition, this.cacheRenderPosition);
        this.cacheRenderPosition.set(tileX * this.renderData[index].width, tileY * this.renderData[index].height);
        Vector2.add(this.renderData[index].position, this.cachePosition, this.cacheRenderPosition);
        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition(index);
        }
    }
    translateRenderPosition(index) {
        Vector2.subtract(this.innerPosition, this.renderData[index].position, this.gameObject.transform.position);
        const translatedAngle = Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.renderData[index].position.set(this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle), this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle));
    }
}
//# sourceMappingURL=SpriteRenderer.js.map