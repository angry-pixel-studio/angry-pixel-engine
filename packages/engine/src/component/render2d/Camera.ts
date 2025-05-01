import { Vector2 } from "@math";
import { CameraData } from "@webgl";

/**
 * Default render layer
 * @internal
 */
export const defaultRenderLayer = "Default";

/**
 * Debug render layer
 * @internal
 */
export const debugRenderLayer = "Debug";

/**
 * Camera component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const camera = new Camera({
 *   layers: ["Default", "UI", "Background"],
 *   zoom: 1.5,
 *   depth: 0,
 *   debug: true
 * });
 * ```
 */
export interface CameraOptions {
    layers: string[];
    zoom: number;
    depth: number;
    debug: boolean;
}

/**
 * The Camera component controls what layers and objects are rendered to the screen.\
 * It supports multiple render layers, zoom level control, and depth ordering when using multiple cameras.\
 * Each camera can also optionally render debug information for development purposes.\
 * @public
 * @category Components
 * @example
 * ```js
 * const camera = new Camera({
 *   layers: ["Default", "UI", "Background"],
 *   zoom: 1.5,
 *   depth: 0,
 *   debug: true
 * });
 * ```
 */
export class Camera {
    /** Layers to be rendered by this camera. Layers are rendered in ascending order */
    layers: string[] = [defaultRenderLayer];
    /** Camera zoom. Default value is 1 */
    zoom: number = 1;
    /** In case you have more than one camera, the depth value determines which camera is rendered first. The lesser value, the first to render */
    depth: number = 0;
    /** Set to TRUE to allow this camera to render debug data (default FALSE) */
    debug: boolean = false;

    /** @internal */
    _renderData: CameraData = {
        position: new Vector2(),
        depth: 0,
        zoom: 1,
        layers: [],
    };

    constructor(options?: Partial<CameraOptions>) {
        Object.assign(this, options);
    }
}
