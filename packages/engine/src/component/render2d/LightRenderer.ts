import { Rectangle, Vector2 } from "@math";

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
    layer: string = "";
    /** Light intensitry between 0 and 1 */
    intensity: number = 1;
    /** @internal */
    _boundingBox: Rectangle = new Rectangle();
    /** @internal */
    _position: Vector2 = new Vector2();
}
