import { Rectangle } from "@math";
import { RenderDataType, ShadowRenderData } from "@webgl";
import { defaultRenderLayer } from "./Camera";

/**
 * ShadowRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const shadowRenderer = new ShadowRenderer({
 *   width: 100,
 *   height: 50,
 *   color: "#000000",
 *   opacity: 0.5,
 *   layer: "Default"
 * });
 * ```
 */
export interface ShadowRendererOptions {
    width: number;
    height: number;
    color: string;
    opacity: number;
    layer: string;
}

/**
 * The ShadowRenderer component is used to render a shadow effect on the screen.\
 * It supports a rectangular shadow with configurable width, height, color, opacity, and render layer.\
 * This component works in conjunction with LightRenderer components in the scene - the shadow will
 * block and be affected by any lights that intersect with it.\
 * @public
 * @category Components
 * @example
 * ```js
 * const shadowRenderer = new ShadowRenderer({
 *   width: 100,
 *   height: 50,
 *   color: "#000000",
 *   opacity: 0.5,
 *   layer: "Default"
 * });
 * ```
 */
export class ShadowRenderer {
    /** Shadow width */
    width: number = 0;
    /** Shadow height */
    height: number = 0;
    /** Shadow color */
    color: string = "#000000";
    /** Shadow opacity between 0 and 1 */
    opacity: number = 1;
    /** The render layer */
    layer: string = defaultRenderLayer;

    /** @internal */
    _boundingBox: Rectangle = new Rectangle();
    /** @internal */
    _renderData: ShadowRenderData = {
        type: RenderDataType.Shadow,
        layer: undefined,
        color: undefined,
        opacity: undefined,
        width: undefined,
        height: undefined,
        position: undefined,
        rotation: undefined,
        lights: [],
    };

    constructor(options?: Partial<ShadowRendererOptions>) {
        Object.assign(this, options);
    }
}
