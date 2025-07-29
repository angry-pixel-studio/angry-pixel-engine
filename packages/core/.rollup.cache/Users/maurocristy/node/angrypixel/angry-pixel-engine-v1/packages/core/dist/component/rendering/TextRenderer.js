import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { RenderDataType, RenderLocation, TextOrientation } from "@angry-pixel/2d-renderer";
export { TextOrientation };
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
    constructor() {
        super(...arguments);
        //cache
        this.lastFrameText = "";
    }
    init(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.text = (_a = config.text) !== null && _a !== void 0 ? _a : "";
        this.font = (_b = config.font) !== null && _b !== void 0 ? _b : "Sans";
        this.fontSize = (_c = config.fontSize) !== null && _c !== void 0 ? _c : 12;
        this.width = (_d = config.width) !== null && _d !== void 0 ? _d : 100;
        this.height = (_e = config.height) !== null && _e !== void 0 ? _e : 100;
        this.offset = (_f = config.offset) !== null && _f !== void 0 ? _f : new Vector2();
        this.color = (_g = config.color) !== null && _g !== void 0 ? _g : "#000000";
        this.charRanges = (_h = config.charRanges) !== null && _h !== void 0 ? _h : [32, 126, 161, 255];
        this.lineSeparation = (_j = config.lineSeparation) !== null && _j !== void 0 ? _j : 0;
        this.letterSpacing = (_k = config.letterSpacing) !== null && _k !== void 0 ? _k : 0;
        this.smooth = (_l = config.smooth) !== null && _l !== void 0 ? _l : false;
        this.rotation = (_m = config.rotation) !== null && _m !== void 0 ? _m : new Rotation();
        this.opacity = (_o = config.opacity) !== null && _o !== void 0 ? _o : 1;
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
    start() {
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
    update() {
        var _a, _b;
        if (!this.text)
            return;
        this.renderData.layer = this.gameObject.layer;
        this.renderData.location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData.text = this.text !== this.lastFrameText ? this.crop() : this.renderData.text;
        this.renderData.fontSize = this.fontSize;
        this.renderData.color = this.color;
        this.renderData.orientation = this.orientation;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.letterSpacing = this.letterSpacing;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + ((_b = (_a = this.rotation) === null || _a === void 0 ? void 0 : _a.radians) !== null && _b !== void 0 ? _b : 0);
        this.renderData.alpha = this.opacity;
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.offset);
        this.renderManager.addRenderData(this.renderData);
        this.lastFrameText = this.text;
    }
    crop() {
        if (this.fontSize > this.height)
            return "";
        const text = [];
        let height = 0;
        const lines = this.text.split("\n");
        for (const line of lines) {
            const newLines = line.split(" ").reduce((lines, word) => {
                const currentLine = lines[lines.length - 1] + (lines[lines.length - 1].length > 0 ? " " : "") + word;
                if (currentLine.length * (this.fontSize + this.letterSpacing) > this.width)
                    lines.push(word);
                else
                    lines[lines.length - 1] = currentLine;
                return lines;
            }, [""]);
            for (const newLine of newLines) {
                height += this.fontSize + this.lineSeparation;
                if (height > this.height)
                    return text.join("\n");
                text.push(newLine);
            }
        }
        return text.join("\n");
    }
}
//# sourceMappingURL=TextRenderer.js.map