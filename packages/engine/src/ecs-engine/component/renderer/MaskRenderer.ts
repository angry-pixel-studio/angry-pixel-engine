import { MaskShape } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { defaultRenderLayer } from "../Camera";

/**
 * Renders a filled shape (rectangle or circumference)
 * @public
 * @category Components
 * @example
 * ```js
 * maskRenderer.shape    = MaskShape.Rectangle;
 * maskRenderer.width    = 32;
 * maskRenderer.height   = 32;
 * maskRenderer.color    = "#000000";
 * maskRenderer.offset   = new Vector2(0, 0);
 * maskRenderer.rotation = 0;
 * maskRenderer.opacity  = 1;
 * maskRenderer.layer    = "Default";
 * ```
 * @example
 * ```js
 * maskRenderer.shape    = MaskShape.Circumference;
 * maskRenderer.radius   = 16;
 * maskRenderer.color    = "#000000";
 * maskRenderer.offset   = new Vector2(0, 0);
 * maskRenderer.opacity  = 1;
 * maskRenderer.layer    = "Default";
 * ```
 */
export class MaskRenderer {
    /** Mask shape: Rectangle or Circumference */
    public shape: MaskShape;
    /** Mask width in pixels */
    public width: number = 0;
    /** Mask height in pixels */
    public height: number = 0;
    /** Mask radius in pixels (only for circumference) */
    public radius: number = 0;
    /** The color of the mask */
    public color: string;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** Mask rotation in radians */
    public rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    public opacity: number = 1;
    /** The render layer */
    public layer: string = defaultRenderLayer;
}
