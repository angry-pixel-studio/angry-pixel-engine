import { Rectangle, Vector2 } from "@math";

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
    _position: Vector2 = new Vector2();

    constructor(options?: Partial<ShadowRendererOptions>) {
        Object.assign(this, options);
    }
}
