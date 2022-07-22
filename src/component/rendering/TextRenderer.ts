import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Orientation, TextRenderData } from "../../rendering/renderData/TextRenderData";
import { RenderManager } from "../../rendering/RenderManager";
import { container } from "../../core/Game";
import { Rotation } from "../../math/Rotation";
import { Vector2 } from "../../math/Vector2";
import { InitOptions } from "../../core/GameActor";

export interface TextRendererOptions extends InitOptions {
    text: string;
    fontFamily: string;
    fontUrl?: string;
    fontSize?: number;
    color?: string;
    lineSeparation?: number;
    letterSpacing?: number;
    width?: number;
    height?: number;
    offset?: Vector2;
    smooth?: boolean;
    charRanges?: number[];
    bitmapSize?: number;
    bitmapOffset?: Vector2;
    rotation?: Rotation;
    opacity?: number;
    orientation?: Orientation;
}

export class TextRenderer extends RenderComponent {
    public text: string;
    public fontFamily: string = "Sans";
    public fontUrl: string = null;
    public fontSize: number = 12;
    public width: number = 100;
    public height: number = 100;
    public offset: Vector2 = new Vector2();
    public color: string = "#000000";
    public lineSeparation: number = 0;
    public letterSpacing: number = 0;
    public bitmapSize: number = 64;
    public charRanges: number[] = [32, 126, 161, 255];
    public smooth: boolean = false;
    public bitmapOffset: Vector2 = new Vector2();
    public rotation: Rotation = new Rotation();
    public opacity: number = 1;
    public orientation: Orientation = "center";

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private renderData: TextRenderData = new TextRenderData();
    private lastFrameText: string = "";

    protected init(config: TextRendererOptions): void {
        this.text = config.text;
        this.fontFamily = config.fontFamily;
        this.fontUrl = config.fontUrl ?? this.fontUrl;
        this.fontSize = config.fontSize ?? this.fontSize;
        this.width = config.width ?? this.width;
        this.height = config.height ?? this.height;
        this.offset = config.offset ?? this.offset;
        this.color = config.color ?? this.color;
        this.lineSeparation = config.lineSeparation ?? this.lineSeparation;
        this.letterSpacing = config.letterSpacing ?? this.letterSpacing;
        this.bitmapSize = config.bitmapSize ?? this.bitmapSize;
        this.charRanges = config.charRanges ?? this.charRanges;
        this.smooth = config.smooth ?? this.smooth;
        this.bitmapOffset = config.bitmapOffset ?? this.bitmapOffset;
        this.rotation = config.rotation ?? this.rotation;
        this.opacity = config.opacity ?? this.opacity;
        this.orientation = config.orientation ?? this.orientation;

        if (this.charRanges.length % 2 !== 0) {
            throw new Exception("TextRenderer.charRanges must be a 2 column matrix");
        }

        if (this.lineSeparation % 2 !== 0) {
            throw new Exception("TextRenderer.lineSeparation must be multiple of 2");
        }
    }

    protected start(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.ui = this.gameObject.ui;
        this.renderData.fontFamily = this.fontFamily;
        this.renderData.fontUrl = this.fontUrl;
        this.renderData.fontSize = this.fontSize;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.letterSpacing = this.letterSpacing;
        this.renderData.bitmapSize = this.bitmapSize;
        this.renderData.charRanges = this.charRanges;
        this.renderData.smooth = this.smooth;
        this.renderData.bitmapOffset = this.bitmapOffset;
        this.renderData.orientation = this.orientation;
        this.renderData.width = this.width;
        this.renderData.height = this.height;
    }

    protected update(): void {
        if (!this.text) return;

        this.renderData.text = this.text !== this.lastFrameText ? this.crop() : this.renderData.text;
        this.renderData.color = this.color;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData.opacity = this.opacity;
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
