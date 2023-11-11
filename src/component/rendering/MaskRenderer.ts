import { RenderComponent } from "../../core/Component";
import { IMaskRenderData, RenderLocation, RenderDataType } from "angry-pixel-2d-renderer";
import { Vector2, Rotation } from "angry-pixel-math";

/**
 * MaskRenderer configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(MaskRenderer, {
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   layer: "Mask",
 * });
 * ```
 */
export interface MaskRendererOptions {
    /** Mask width in pixels */
    width: number;
    /** Mask height in pixels */
    height: number;
    /** The color of the mask */
    color: string;
    /** X-axis and Y-axis offset */
    offset?: Vector2;
    /** Mask rotation (degrees or radians) */
    rotation?: Rotation;
    /** Change the opacity between 1 and 0 */
    opacity?: number;
    /** The render layer */
    layer?: string;
}

/**
 * Renders a rectangle based on width, height and color
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(MaskRenderer, {
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(MaskRenderer, {
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   layer: "Mask",
 * });
 * ```
 */
export class MaskRenderer extends RenderComponent {
    /** Mask width in pixels */
    public width: number;
    /** Mask height in pixels */
    public height: number;
    /** The color of the mask */
    public color: string;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** Mask rotation (degrees or radians) */
    public rotation: Rotation = new Rotation();
    /** Change the opacity between 1 and 0 */
    public opacity: number = 1;
    /** The render layer */
    public layer: string;

    private renderData: IMaskRenderData;
    // cache
    private innerPosition: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();

    protected init(config: MaskRendererOptions): void {
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.offset = config.offset ?? this.offset;
        this.rotation = config.rotation ?? this.rotation;
        this.opacity = config.opacity ?? this.opacity;
        this.layer = config.layer;

        this.renderData = {
            type: RenderDataType.Mask,
            layer: this.layer ?? this.gameObject.layer,
            location: this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace,
            position: new Vector2(),
            width: 0,
            height: 0,
            color: "",
        };
    }

    protected update(): void {
        this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData.layer = this.layer ?? this.gameObject.layer;
        this.renderData.width = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData.height = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData.color = this.color;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData.alpha = this.opacity;

        this.calculateRenderPosition();

        this.renderManager.addRenderData(this.renderData);
    }

    private calculateRenderPosition(): void {
        this.scaledOffset.set(
            this.offset.x * this.gameObject.transform.scale.x,
            this.offset.y * this.gameObject.transform.scale.y
        );
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.scaledOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition();
        }
    }

    private translateRenderPosition(): void {
        Vector2.subtract(this.innerPosition, this.renderData.position, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.renderData.position.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }
}
