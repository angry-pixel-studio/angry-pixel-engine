import { RenderComponent } from "../../core/Component";
import { RenderLocation, RenderDataType, MaskShape } from "@angry-pixel/2d-renderer";
import { Vector2, Rotation } from "@angry-pixel/math";
export { MaskShape };
/**
 * Renders a rectangle based on width, height and color
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(MaskRenderer, {
 *   shape: MaskShape.Rectangle,
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(MaskRenderer, {
 *   shape: MaskShape.Circumference,
 *   radius: 16,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   layer: "Mask",
 * });
 * ```
 */
export class MaskRenderer extends RenderComponent {
    constructor() {
        super(...arguments);
        /** X-axis and Y-axis offset */
        this.offset = new Vector2();
        /** Mask rotation (degrees or radians) */
        this.rotation = new Rotation();
        /** Change the opacity between 1 and 0 */
        this.opacity = 1;
        // cache
        this.innerPosition = new Vector2();
        this.scaledOffset = new Vector2();
    }
    init(config) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.shape = config.shape;
        this.color = config.color;
        this.width = (_a = config.width) !== null && _a !== void 0 ? _a : 0;
        this.height = (_b = config.height) !== null && _b !== void 0 ? _b : 0;
        this.radius = (_c = config.radius) !== null && _c !== void 0 ? _c : 0;
        this.offset = (_d = config.offset) !== null && _d !== void 0 ? _d : this.offset;
        this.rotation = (_e = config.rotation) !== null && _e !== void 0 ? _e : this.rotation;
        this.opacity = (_f = config.opacity) !== null && _f !== void 0 ? _f : this.opacity;
        this.layer = config.layer;
        this.renderData = {
            type: RenderDataType.Mask,
            layer: (_g = this.layer) !== null && _g !== void 0 ? _g : this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            width: 0,
            height: 0,
            radius: 0,
            color: "",
            shape: this.shape,
        };
    }
    update() {
        var _a;
        this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData.layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
        this.renderData.shape = this.shape;
        this.renderData.width = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData.height = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData.color = this.color;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData.alpha = this.opacity;
        this.renderData.radius =
            this.radius * Math.abs(Math.max(this.gameObject.transform.scale.x, this.gameObject.transform.scale.y));
        this.calculateRenderPosition();
        this.renderManager.addRenderData(this.renderData);
    }
    calculateRenderPosition() {
        this.scaledOffset.set(this.offset.x * this.gameObject.transform.scale.x, this.offset.y * this.gameObject.transform.scale.y);
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.scaledOffset);
        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition();
        }
    }
    translateRenderPosition() {
        Vector2.subtract(this.innerPosition, this.renderData.position, this.gameObject.transform.position);
        const translatedAngle = Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.renderData.position.set(this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle), this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle));
    }
}
//# sourceMappingURL=MaskRenderer.js.map