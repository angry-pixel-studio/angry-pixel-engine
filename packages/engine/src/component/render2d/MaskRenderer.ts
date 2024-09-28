import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { MaskRenderData, MaskShape, RenderDataType } from "@webgl";

/**
 * @public
 * @category Components
 */
export interface MaskRendererOptions {
    shape: MaskShape;
    color: string;
    width: number;
    height: number;
    radius: number;
    offset: Vector2;
    rotation: number;
    opacity: number;
    layer: string;
}

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
    shape: MaskShape;
    /** Mask width in pixels */
    width: number = 0;
    /** Mask height in pixels */
    height: number = 0;
    /** Mask radius in pixels (only for circumference) */
    radius: number = 0;
    /** The color of the mask */
    color: string;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** Mask rotation in radians */
    rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    opacity: number = 1;
    /** The render layer */
    layer: string = defaultRenderLayer;

    /** @internal */
    _renderData: MaskRenderData = {
        type: RenderDataType.Mask,
        color: undefined,
        height: undefined,
        layer: undefined,
        opacity: undefined,
        position: new Vector2(),
        radius: undefined,
        rotation: undefined,
        shape: undefined,
        width: undefined,
    };

    constructor(options?: Partial<MaskRendererOptions>) {
        Object.assign(this, options);
    }
}
