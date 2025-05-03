import { Rectangle } from "@math";
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
 *   layer: "Default",
 *   intensity: 0.8
 * });
 * ```
 */
export interface LightRendererOptions {
    radius: number;
    smooth: boolean;
    layer: string;
    intensity: number;
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
 *   layer: "Default",
 *   intensity: 0.8
 * });
 * ```
 */
export class LightRenderer {
    /** Light radius */
    radius: number = 0;
    /** Smooth */
    smooth: boolean = false;
    /** Darkness render layer */
    layer: string = defaultRenderLayer;
    /** Light intensitry between 0 and 1 */
    intensity: number = 1;

    /** @internal */
    _boundingBox: Rectangle = new Rectangle();

    constructor(options?: Partial<LightRendererOptions>) {
        Object.assign(this, options);
    }
}
