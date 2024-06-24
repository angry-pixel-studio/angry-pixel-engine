import { TextOrientation } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { defaultRenderLayer } from "../Camera";

/**
 * The TextRenderer component allows to render text using font families, colors, and other configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 *   textRenderer.layer: "default";
 *   textRenderer.text: "Hello world!";
 *   textRenderer.font: "Arial";
 *   textRenderer.fontSize: 16;
 *   textRenderer.width: 160;
 *   textRenderer.height: 16;
 *   textRenderer.color: "#000000";
 *   textRenderer.offset: new Vector2();
 *   textRenderer.lineSeparation: 0;
 *   textRenderer.letterSpacing: 0;
 *   textRenderer.charRanges: [32, 126, 161, 255];
 *   textRenderer.smooth: false;
 *   textRenderer.rotation: 0;
 *   textRenderer.opacity: 1;
 *   textRenderer.orientation: TextOrientation.RightDown;
 *   textRenderer.bitmapMargin: new Vector2();
 *   textRenderer.bitmapSpacing: new Vector2();
 * ```
 */
export class TextRenderer {
    /** The render layer */
    public layer: string = defaultRenderLayer;
    /** The text to render */
    public text: string = "Hello World!";
    /** The font family to use */
    public font: FontFace | string = "Arial";
    /** The size of the font in pixels. */
    public fontSize: number = 16;
    /** The width of the invisible box where the text is rendered */
    public width: number = 160;
    /** The height of the invisible box where the text is rendered */
    public height: number = 16;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** The text color */
    public color: string = "#000000";
    /** The separation between lines in pixels */
    public lineSeparation: number = 0;
    /** The space between chars in pixels */
    public letterSpacing: number = 0;
    /** Range of characters covered by the component defined in number pairs.
     * The default value is [32, 126, 161, 255], this means that the component
     * will render characters from 32 to 126 and from 161 to 255. */
    public charRanges: number[] = [32, 126, 161, 255];
    /** Smoothing pixels (not recommended for bitmap fonts) */
    public smooth: boolean = false;
    /** Text rotation in radians */
    public rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    public opacity: number = 1;
    /** Direction in which the text will be rendered. */
    public orientation: TextOrientation = TextOrientation.Center;
    /** Margin in pixels to correct badly sliced characters. */
    public bitmapMargin: Vector2;
    /** Spacing in pixels to correct badly sliced characters. */
    public bitmapSpacing: Vector2;
}
