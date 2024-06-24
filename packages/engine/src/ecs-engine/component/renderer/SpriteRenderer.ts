import { Vector2 } from "../../../math";
import { Slice } from "../../../2d-renderer";
import { defaultRenderLayer } from "../Camera";

export class SpriteRenderer {
    /** The render layer */
    public layer: string = defaultRenderLayer;
    /** The image to render */
    public image: HTMLImageElement;
    /** Cut the image based on straight coordinates starting from the top left downward */
    public slice?: Slice;
    /** TRUE for smooth pixels (not recommended for pixel art) */
    public smooth: boolean = false;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2(0, 0);
    /** Flip the image horizontally */
    public flipHorizontally: boolean = false;
    /** Flip the image vertically */
    public flipVertically: boolean = false;
    /** Image rotation in radians */
    public rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    public opacity: number = 1;
    /** Define a mask color for the image */
    public maskColor: string;
    /** Define the opacity of the mask color between 1 and 0 */
    public maskColorMix: number;
    /** Define a color for tinting the sprite image */
    public tintColor: string;
    /** Scale the image based on a vector */
    public scale: Vector2 = new Vector2(1, 1);
    /** Overwrite the original image width */
    public width: number;
    /** Overwrite the original image height */
    public height: number;
}
