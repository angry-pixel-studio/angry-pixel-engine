import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { MaskRenderData, MaskShape, RenderDataType } from "@webgl";

/**
 * MaskRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Rectangle,
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Circumference,
 *   radius: 16,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Polygon,
 *   vertexModel: [new Vector2(0, 0), new Vector2(32, 0), new Vector2(32, 32), new Vector2(0, 32)],
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 */
export interface MaskRendererOptions {
    shape: MaskShape;
    color: string;
    width: number;
    height: number;
    radius: number;
    vertexModel: Vector2[];
    offset: Vector2;
    rotation: number;
    opacity: number;
    layer: string;
}

/**
 * The MaskRenderer component renders filled shapes like rectangles, circles, or polygons.\
 * It supports different shape types with configurable dimensions, colors, positioning and rotation.\
 * Shapes can be rendered with variable opacity and assigned to specific render layers.\
 * This component is useful for creating UI elements, visual effects, or masking other rendered content.
 * @public
 * @category Components
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Rectangle,
 *   width: 32,
 *   height: 32,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Circumference,
 *   radius: 16,
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 * @example
 * ```js
 * const maskRenderer = new MaskRenderer({
 *   shape: MaskShape.Polygon,
 *   vertexModel: [new Vector2(0, 0), new Vector2(32, 0), new Vector2(32, 32), new Vector2(0, 32)],
 *   color: "#000000",
 *   offset: new Vector2(0, 0),
 *   opacity: 1,
 *   layer: "Default"
 * });
 * ```
 */
export class MaskRenderer {
    /** Mask shape: Rectangle, Circumference or Polygon */
    shape: MaskShape;
    /** Mask width in pixels (only for rectangle) */
    width: number = 0;
    /** Mask height in pixels (only for rectangle) */
    height: number = 0;
    /** Mask radius in pixels (only for circumference) */
    radius: number = 0;
    /** Polygon vertices (only for polygon) */
    vertexModel: Vector2[] = [];
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
        vertices: [],
        layer: undefined,
        opacity: undefined,
        position: new Vector2(),
        radius: undefined,
        rotation: undefined,
        shape: undefined,
        width: undefined,
    };

    /** @internal */
    static componentName: string = "MaskRenderer";

    constructor(options?: Partial<MaskRendererOptions>) {
        Object.assign(this, options);
    }
}
