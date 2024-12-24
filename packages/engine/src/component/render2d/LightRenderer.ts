import { Rectangle } from "@math";
import { defaultRenderLayer } from "./Camera";

/**
 * @public
 * @category Components
 */
export interface LightRendererOptions {
    radius: number;
    smooth: boolean;
    layer: string;
    intensity: number;
}

/**
 * @public
 * @category Components
 */
export class LightRenderer {
    /** Light radius */
    radius: number = 0;
    /** Smooth */
    smooth: boolean = false;
    /** Shadow render layer */
    layer: string = defaultRenderLayer;
    /** Light intensitry between 0 and 1 */
    intensity: number = 1;

    /** @internal */
    _boundingBox: Rectangle = new Rectangle();

    constructor(options?: Partial<LightRendererOptions>) {
        Object.assign(this, options);
    }
}
