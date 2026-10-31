import { Rectangle } from "@angry-pixel/math";
import { defaultRenderLayer } from "./Camera";

/**
 * LightRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const lightRenderer = new LightRenderer({
 *   radius: 100,
 *   smooth: true,
 *   steps: 0,
 *   layer: "Default",
 *   intensity: 0.8,
 *   color: "#FF9900"
 * });
 * ```
 */
export interface LightRendererOptions {
    radius: number;
    smooth: boolean;
    steps: number;
    layer: string;
    intensity: number;
    color: string;
}

/**
 * The LightRenderer component is used to render a light effect on the screen.\
 * It supports a circular light source with a specified radius and intensity.\
 * The light can be optionally smoothed for a softer edge effect.\
 * This component requires a DarknessRenderer component to be present in the scene to function properly,
 * as it works by illuminating areas within the darkness mask.\
 * @public
 * @category Components
 * @example
 * ```js
 * const lightRenderer = new LightRenderer({
 *   radius: 100,
 *   smooth: true,
 *   steps: 0,
 *   layer: "Default",
 *   intensity: 0.8,
 *   color: "#FF9900"
 * });
 * ```
 */
export class LightRenderer {
    /** Light radius */
    radius: number = 0;
    /** Smooth */
    smooth: boolean = false;
    /** Number of opacity steps of the smooth light, 0 means a continuous fade */
    steps: number = 0;
    /** Darkness render layer */
    layer: string = defaultRenderLayer;
    /** Light intensitry between 0 and 1 */
    intensity: number = 1;
    /** Light glow color in hexadecimal, its strength is set by the intensity. No glow if it's not set */
    color: string;

    /** @internal */
    _boundingBox: Rectangle = new Rectangle();

    /** @internal */
    static componentName: string = "LightRenderer";

    constructor(options?: Partial<LightRendererOptions>) {
        Object.assign(this, options);
    }
}
