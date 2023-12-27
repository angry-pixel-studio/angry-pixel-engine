import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { ITextRenderData, RenderDataType, RenderLocation, TextOrientation } from "@angry-pixel/2d-renderer";

export { TextOrientation };

/**
 * TextRenderer configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TextRenderer, {
 *   text: "Hello world",
 *   font: "Impact",
 *   fontSize: 16,
 *   width: 320,
 *   height: 32,
 *   color: "#FF0000",
 *   offset: new Vector2(0, 0),
 *   lineSeparation: 1,
 *   letterSpacing: 1,
 *   charRanges: [32, 126, 161, 255],
 *   smooth: false,
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   orientation: TextOrientation.RightDown
 *   bitmapMargin: new Vector2(0, 0),
 *   bitmapSpacing: new Vector2(0, 0),
 * });
 * ```
 */
export interface TextRendererOptions {
    /** The text to render */
    text: string;
    /** The font family to use */
    font: FontFace | string;
    /** The size of the font in pixels */
    fontSize: number;
    /** The text color */
    color: string;
    /** The width of the invisible box where the text is rendered */
    width: number;
    /** The height of the invisible box where the text is rendered */
    height: number;
    /** The separation between lines in pixels */
    lineSeparation?: number;
    /** The space between chars in pixels */
    letterSpacing?: number;
    /** X-axis and Y-axis offset */
    offset?: Vector2;
    /** Range of characters covered by the component defined in number pairs.
     * The default value is [32, 126, 161, 255], this means that characters
     * from 32 to 126 and from 161 to 255 will be valid. */
    charRanges?: number[];
    /** Smoothing pixels (not recommended for pixel art) */
    smooth?: boolean;
    /** Text rotation (degrees or radians) */
    rotation?: Rotation;
    /** Change the opacity between 1 and 0 */
    opacity?: number;
    /** Direction in which the text will be rendered. */
    orientation?: TextOrientation;
    /** Margin in pixels to correct badly sliced characters. */
    bitmapMargin?: Vector2;
    /** Spacing in pixels to correct badly sliced characters. */
    bitmapSpacing?: Vector2;
}

/**
 * The TextRenderer component allows to render text using font families, colors, and other configuration options.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(TextRenderer, {
 *   text: "Hello world",
 *   font: "Impact",
 *   fontSize: 16,
 *   width: 320,
 *   height: 32,
 *   color: "#FF0000",
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(TextRenderer, {
 *   text: "Hello world",
 *   font: "Impact",
 *   fontSize: 16,
 *   width: 320,
 *   height: 32,
 *   color: "#FF0000",
 *   offset: new Vector2(0, 0),
 *   lineSeparation: 1,
 *   letterSpacing: 1,
 *   charRanges: [32, 126, 161, 255],
 *   smooth: false,
 *   rotation: new Rotation(0),
 *   opacity: 1,
 *   orientation: TextOrientation.RightDown
 *   bitmapMargin: new Vector2(0, 0),
 *   bitmapSpacing: new Vector2(0, 0),
 * });
 * ```
 */
export class TextRenderer extends RenderComponent {
    /** The text to render */
    public text: string;
    /** The font family to use */
    public font: FontFace | string;
    /** The size of the font in pixels. */
    public fontSize: number;
    /** The width of the invisible box where the text is rendered */
    public width: number;
    /** The height of the invisible box where the text is rendered */
    public height: number;
    /** X-axis and Y-axis offset */
    public offset: Vector2;
    /** The text color */
    public color: string;
    /** The separation between lines in pixels */
    public lineSeparation: number;
    /** The space between chars in pixels */
    public letterSpacing: number;
    /** Range of characters covered by the component defined in number pairs.
     * The default value is [32, 126, 161, 255], this means that characters
     * from 32 to 126 and from 161 to 255 will be valid. */
    public charRanges: number[];
    /** Smoothing pixels (not recommended for pixel art) */
    public smooth: boolean;
    /** Text rotation (degrees or radians) */
    public rotation: Rotation;
    /** Change the opacity between 1 and 0 */
    public opacity: number;
    /** Direction in which the text will be rendered. */
    public orientation: TextOrientation;
    /** Margin in pixels to correct badly sliced characters. */
    public bitmapMargin: Vector2;
    /** Spacing in pixels to correct badly sliced characters. */
    public bitmapSpacing: Vector2;

    private renderData: ITextRenderData;
    //cache
    private lastFrameText: string = "";

    protected init(config: TextRendererOptions): void {
        this.text = config.text ?? "";
        this.font = config.font ?? "Sans";
        this.fontSize = config.fontSize ?? 12;
        this.width = config.width ?? 100;
        this.height = config.height ?? 100;
        this.offset = config.offset ?? new Vector2();
        this.color = config.color ?? "#000000";
        this.charRanges = config.charRanges ?? [32, 126, 161, 255];
        this.lineSeparation = config.lineSeparation ?? 0;
        this.letterSpacing = config.letterSpacing ?? 0;
        this.smooth = config.smooth ?? false;
        this.rotation = config.rotation ?? new Rotation();
        this.opacity = config.opacity ?? 1;
        this.orientation = config.orientation;
        this.bitmapMargin = config.bitmapMargin;
        this.bitmapSpacing = config.bitmapSpacing;

        if (this.charRanges.length % 2 !== 0) {
            throw new Exception("TextRenderer.charRanges must be a 2 column matrix");
        }

        if (this.lineSeparation % 2 !== 0) {
            throw new Exception("TextRenderer.lineSeparation must be multiple of 2");
        }
    }

    protected start(): void {
        this.renderData = {
            type: RenderDataType.Text,
            location: RenderLocation.WorldSpace,
            position: new Vector2(),
            layer: this.gameObject.layer,
            text: "",
            font: this.font,
            fontSize: this.fontSize,
            bitmap: {
                charRanges: this.charRanges,
                margin: this.bitmapMargin,
                spacing: this.bitmapSpacing,
            },
            smooth: this.smooth,
        };
    }

    protected update(): void {
        if (!this.text) return;

        this.renderData.layer = this.gameObject.layer;
        this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData.text = this.text !== this.lastFrameText ? this.crop() : this.renderData.text;
        this.renderData.fontSize = this.fontSize;
        this.renderData.color = this.color;
        this.renderData.orientation = this.orientation;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.letterSpacing = this.letterSpacing;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation?.radians ?? 0;
        this.renderData.alpha = this.opacity;

        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.offset);

        this.renderManager.addRenderData(this.renderData);

        this.lastFrameText = this.text;
    }

    private crop(): string {
        if (this.fontSize > this.height) return "";

        const text: string[] = [];
        let height = 0;

        const lines = this.text.split("\n");

        for (const line of lines) {
            const newLines = line.split(" ").reduce(
                (lines, word) => {
                    const currentLine =
                        lines[lines.length - 1] + (lines[lines.length - 1].length > 0 ? " " : "") + word;
                    if (currentLine.length * (this.fontSize + this.letterSpacing) > this.width) lines.push(word);
                    else lines[lines.length - 1] = currentLine;
                    return lines;
                },
                [""]
            );

            for (const newLine of newLines) {
                height += this.fontSize + this.lineSeparation;
                if (height > this.height) return text.join("\n");

                text.push(newLine);
            }
        }

        return text.join("\n");
    }
}
