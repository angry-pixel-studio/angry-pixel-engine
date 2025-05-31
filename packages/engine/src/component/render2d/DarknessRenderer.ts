import { Rectangle } from "@math";
import { RenderDataType, DarknessRenderData } from "@webgl";
import { defaultRenderLayer } from "./Camera";

/**
 * DarknessRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const darknessRenderer = new DarknessRenderer({
 *   width: 100,
 *   height: 50,
 *   color: "#000000",
 *   opacity: 0.5,
 *   layer: "Default"
 * });
 * ```
 */
export interface DarknessRendererOptions {
    width: number;
    height: number;
    color: string;
    opacity: number;
    layer: string;
}

/**
 * The DarknessRenderer component is used to render a darkness effect on the screen.\
 * It supports a rectangular darkness mask with configurable width, height, color, opacity, and render layer.\
 * This component works in conjunction with LightRenderer components in the scene - the darkness will
 * block and be affected by any lights that intersect with it.
 * @public
 * @category Components
 * @example
 * ```js
 * const darknessRenderer = new DarknessRenderer({
 *   width: 100,
 *   height: 50,
 *   color: "#000000",
 *   opacity: 0.5,
 *   layer: "Default"
 * });
 * ```
 */
export class DarknessRenderer {
    /** Darkness rectangle width */
    width: number = 0;
    /** Darkness height */
    height: number = 0;
    /** Darkness color */
    color: string = "#000000";
    /** Darkness opacity between 0 and 1 */
    opacity: number = 1;
    /** The render layer */
    layer: string = defaultRenderLayer;

    /** @internal */
    _boundingBox: Rectangle = new Rectangle();
    /** @internal */
    _renderData: DarknessRenderData = {
        type: RenderDataType.Darkness,
        layer: undefined,
        color: undefined,
        opacity: undefined,
        width: undefined,
        height: undefined,
        position: undefined,
        rotation: undefined,
        lights: [],
    };

    /** @internal */
    static componentName: string = "DarknessRenderer";

    constructor(options?: Partial<DarknessRendererOptions>) {
        Object.assign(this, options);
    }
}
