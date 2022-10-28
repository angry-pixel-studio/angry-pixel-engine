import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Rotation, Vector2 } from "angry-pixel-math";
import {
    IRenderManager,
    ITextRenderData,
    RenderDataType,
    RenderLocation,
    TextOrientation,
} from "angry-pixel-2d-renderer";

export { TextOrientation };

export interface TextRendererOptions {
    text: string;
    font: FontFace | string;
    fontSize?: number;
    color?: string;
    lineSeparation?: number;
    letterSpacing?: number;
    width?: number;
    height?: number;
    offset?: Vector2;
    charRanges?: number[];
    smooth?: boolean;
    rotation?: Rotation;
    opacity?: number;
    orientation?: TextOrientation;
    bitmapMargin?: Vector2;
    bitmapSpacing?: Vector2;
}

export class TextRenderer extends RenderComponent {
    public text: string;
    public font: FontFace | string;
    public fontSize: number;
    public width: number;
    public height: number;
    public offset: Vector2;
    public color: string;
    public lineSeparation: number;
    public letterSpacing: number;
    public charRanges: number[];
    public smooth: boolean;
    public rotation: Rotation;
    public opacity: number;
    public orientation: TextOrientation;
    public bitmapMargin: Vector2;
    public bitmapSpacing: Vector2;

    private renderManager: IRenderManager = this.container.getSingleton<IRenderManager>("RenderManager");
    private renderData: ITextRenderData;
    private lastFrameText: string = "";

    protected init(config: TextRendererOptions): void {
        this.text = config.text;
        this.font = config.font ?? "Sans";
        this.fontSize = config.fontSize ?? 12;
        this.width = config.width ?? 100;
        this.height = config.height ?? 100;
        this.offset = config.offset ?? new Vector2();
        this.color = config.color ?? "#000000";
        this.charRanges = config.charRanges ?? [32, 126, 161, 255];
        this.lineSeparation = config.lineSeparation ?? 0;
        this.letterSpacing = config.letterSpacing ?? 0;
        this.smooth = config.smooth;
        this.rotation = config.rotation ?? new Rotation();
        this.opacity = config.opacity;
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
            const newLines = line.match(
                new RegExp(".{1," + Math.floor(this.width / (this.fontSize + this.letterSpacing)) + "}", "g")
            ) ?? [""];

            for (const newLine of newLines) {
                height += this.fontSize + this.lineSeparation;
                if (height > this.height) return text.join("\n");

                text.push(newLine);
            }
        }

        return text.join("\n");
    }
}
