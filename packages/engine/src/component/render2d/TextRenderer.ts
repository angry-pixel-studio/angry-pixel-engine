import { Vector2 } from "@angry-pixel/math";
import { defaultRenderLayer } from "./Camera";
import { RenderDataType, TextOrientation, TextRenderData } from "@angry-pixel/webgl";

/**
 * @internal
 */
export const defaultTextureAtlasOptions = {
    charRanges: [32, 126, 161, 255],
    fontSize: 64,
    spacing: 8,
};

/**
 * TextRenderer component configuration
 * @public
 * @category Components Configuration
 * @example
 * ```js
 * const textRenderer = new TextRenderer({
 *   text: "Hello World!",
 *   color: "#FFFFFF",
 *   fontSize: 24,
 *   width: 1920,
 *   height: 32,
 *   opacity: 1,
 *   layer: "TextLayer",
 *   orientation: TextOrientation.RightCenter,
 *   shadow: {
 *     color: "#00FF00",
 *     offset: new Vector2(3, -3),
 *     opacity: 0.5,
 *   },
 *   textureAtlas: {
 *     charRanges: [32, 126, 161, 255, 0x3040, 0x309f],
 *     fontSize: 64,
 *     spacing: 4,
 *   },
 *   font: "Arial",
 *   flipHorizontally: false,
 *   flipVertically: false,
 *   letterSpacing: 0,
 *   lineHeight: 24,
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 *   smooth: false,
 * });
 * ```
 */
export interface TextRendererOptions {
    /** The text color */
    color: string;
    /** Flip the text horizontally */
    flipHorizontally: boolean;
    /** Flip the text vertically */
    flipVertically: boolean;
    /** The font family to use */
    font: FontFace | string;
    /** The size of the font in pixels. */
    fontSize: number;
    /** The height of the invisible box where the text is rendered */
    height: number;
    /** The render layer */
    layer: string;
    /** The space between chars in pixels */
    letterSpacing: number;
    /** The height of the line in pixels. Default value is equal to the font size */
    lineHeight: number;
    /** X-axis and Y-axis offset */
    offset: Vector2;
    /** Change the opacity between 1 and 0 */
    opacity: number;
    /** Direction in which the text will be rendered. */
    orientation: TextOrientation;
    /** Text rotation in radians */
    rotation: number;
    /** Smoothing pixels (not recommended for bitmap fonts) */
    smooth: boolean;
    /** Shadow text configuration */
    shadow?: {
        /** Shadow text color */
        color: string;
        /** Shadow text offset in pixels */
        offset: Vector2;
        /** Shadow text opacity */
        opacity: number;
    };
    /** The text to render */
    text: string;
    /** The texture atlas configuration */
    textureAtlas: {
        /** Range of characters covered by the component defined in number pairs.
         * The default value is [32, 126, 161, 255], this means that the component
         * will render characters from 32 to 126 and from 161 to 255. */
        charRanges?: number[];
        /** The size of the font in pixels for bitmap fonts. */
        fontSize?: number;
        /** Spacing in pixels to correct badly sliced characters. */
        spacing?: number;
    };
    /** The width of the invisible box where the text is rendered */
    width: number;
}

/**
 * The TextRenderer component renders text to the screen with extensive customization options.\
 * It supports both web-safe and imported fonts, but works optimally with bitmap fonts.\
 * Under the hood, it generates a texture atlas containing all the characters needed for rendering.\
 * The atlas generation can be configured with custom character ranges, font sizes, and spacing.\
 * Text can be customized with font families, colors, sizing, orientation, shadows, letter spacing,\
 * line height, opacity, smoothing, and positioning. The component allows text to be rotated,\
 * flipped, and assigned to specific render layers.
 * @public
 * @category Components
 *  @example
 * ```typescript
 * const textRenderer = new TextRenderer({
 *   text: "Hello World!",
 *   color: "#FFFFFF",
 *   fontSize: 24,
 *   font: "Arial",
 *   width: 1920,
 *   height: 32,
 *   layer: "TextLayer",
 * });
 * ```
 * @example
 * ```typescript
 * const textRenderer = new TextRenderer({
 *   text: "Hello World!",
 *   color: "#FFFFFF",
 *   fontSize: 24,
 *   width: 1920,
 *   height: 32,
 *   opacity: 1,
 *   layer: "TextLayer",
 *   orientation: TextOrientation.RightCenter,
 *   shadow: {
 *     color: "#00FF00",
 *     offset: new Vector2(3, -3),
 *     opacity: 0.5,
 *   },
 *   textureAtlas: {
 *     charRanges: [32, 126, 161, 255, 0x3040, 0x309f],
 *     fontSize: 64,
 *     spacing: 4,
 *   },
 *   font: "Arial",
 *   flipHorizontally: false,
 *   flipVertically: false,
 *   letterSpacing: 0,
 *   lineHeight: 24,
 *   offset: new Vector2(0, 0),
 *   rotation: 0,
 *   smooth: false,
 * });
 * ```
 */
export class TextRenderer {
    /** The text color */
    color: string = "#000000";
    /** Flip the text horizontally */
    flipHorizontally: boolean = false;
    /** Flip the text vertically */
    flipVertically: boolean = false;
    /** The font family to use */
    font: FontFace | string = "Arial";
    /** The size of the font in pixels. */
    fontSize: number = 16;
    /** The height of the invisible box where the text is rendered */
    height: number = 16;
    /** The render layer */
    layer: string = defaultRenderLayer;
    /** The space between chars in pixels */
    letterSpacing: number = 0;
    /** The height of the line in pixels. Default value is equal to the font size */
    lineHeight: number = undefined;
    /** X-axis and Y-axis offset */
    offset: Vector2 = new Vector2();
    /** Change the opacity between 1 and 0 */
    opacity: number = 1;
    /** Direction in which the text will be rendered. */
    orientation: TextOrientation = TextOrientation.Center;
    /** Text rotation in radians */
    rotation: number = 0;
    /** Shadow text configuration */
    shadow: {
        /** Shadow text color */
        color: string;
        /** Shadow text offset in pixels */
        offset: Vector2;
        /** Shadow text opacity */
        opacity: number;
    } = undefined;
    /** Smoothing pixels (not recommended for bitmap fonts) */
    smooth: boolean = false;
    /** The text to render */
    text: string = "Hello World!";
    /** The texture atlas configuration */
    textureAtlas: {
        /** Range of characters covered by the component defined in number pairs.
         * The default value is [32, 126, 161, 255], this means that the component
         * will render characters from 32 to 126 and from 161 to 255. */
        charRanges?: number[];
        /** The size of the font in pixels for bitmap fonts. */
        fontSize?: number;
        /** Spacing in pixels to correct badly sliced characters. */
        spacing?: number;
    } = { ...defaultTextureAtlasOptions };
    /** The width of the invisible box where the text is rendered */
    width: number = 160;

    /** @internal */
    _renderData: TextRenderData = {
        color: undefined,
        flipHorizontally: false,
        flipVertically: false,
        font: undefined,
        fontSize: undefined,
        layer: undefined,
        letterSpacing: undefined,
        lineHeight: undefined,
        opacity: undefined,
        orientation: undefined,
        position: new Vector2(),
        rotation: undefined,
        shadow: undefined,
        smooth: undefined,
        text: undefined,
        textureAtlas: { ...defaultTextureAtlasOptions },
        type: RenderDataType.Text,
    };

    /** @internal */
    static componentName: string = "TextRenderer";

    constructor(options?: Partial<TextRendererOptions>) {
        Object.assign(this, options);
    }
}
