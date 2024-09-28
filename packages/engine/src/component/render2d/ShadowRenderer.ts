import { Rectangle } from "@math";
import { RenderDataType, ShadowRenderData } from "@webgl";

/**
 * @public
 * @category Components
 */
export interface ShadowRendererOptions {
    width: number;
    height: number;
    color: string;
    opacity: number;
    layer: string;
}

/**
 * @public
 * @category Components
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
    layer: string = "";

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
