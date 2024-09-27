import { Vector2 } from "@math";
import { defaultRenderLayer } from "./Camera";
import { TextOrientation } from "@webgl";

/**
 * @public
 * @category Components
 */
export interface TextRendererOptions {
    layer: string;
    text: string;
    font: FontFace | string;
    fontSize: number;
    width: number;
    height: number;
    offset: Vector2;
    color: string;
    lineSeparation: number;
    letterSpacing: number;
    charRanges: number[];
    smooth: boolean;
    rotation: number;
    opacity: number;
    orientation: TextOrientation;
    bitmapMargin: Vector2;
    bitmapSpacing: Vector2;
}

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
    layer: string = defaultRenderLayer;
    /** The text to render */
    text: string = "Hello World!";
    /** The font family to use */
    font: FontFace | string = "Arial";
    /** The size of the font in pixels. */
    fontSize: number = 16;
    /** The width of the invisible box where the text is rendered */
    width: number = 160;
    /** The height of the invisible box where the text is rendered */
    height: number = 16;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** The text color */
    color: string = "#000000";
    /** The separation between lines in pixels */
    lineSeparation: number = 0;
    /** The space between chars in pixels */
    letterSpacing: number = 0;
    /** Range of characters covered by the component defined in number pairs.
     * The default value is [32, 126, 161, 255], this means that the component
     * will render characters from 32 to 126 and from 161 to 255. */
    charRanges: number[] = [32, 126, 161, 255];
    /** Smoothing pixels (not recommended for bitmap fonts) */
    smooth: boolean = false;
    /** Text rotation in radians */
    rotation: number = 0;
    /** Change the opacity between 1 and 0 */
    opacity: number = 1;
    /** Direction in which the text will be rendered. */
    orientation: TextOrientation = TextOrientation.Center;
    /** Margin in pixels to correct badly sliced characters. */
    bitmapMargin: Vector2;
    /** Spacing in pixels to correct badly sliced characters. */
    bitmapSpacing: Vector2;
    /** @internal */
    _position: Vector2 = new Vector2();

    constructor(options?: Partial<TextRendererOptions>) {
        Object.assign(this, options);
    }
}
