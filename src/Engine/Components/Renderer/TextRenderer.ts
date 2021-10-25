import { RenderComponent } from "../../Component";
import { GameEngineException } from "../../Core/Exception/GameEngineException";
import { Orientation, TextRenderData } from "../../Core/Rendering/RenderData/TextRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Rotation } from "../../Math/Rotation";
import { Vector2 } from "../../Math/Vector2";
import { ComponentTypes } from "../ComponentTypes";

export interface TextRendererConfig {
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

    constructor(config: TextRendererConfig) {
        super();

        this.type = ComponentTypes.TextRenderer;

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
            throw new GameEngineException("TextRenderer.charRanges must be a 2 column matrix");
        }

        if (this.lineSeparation % 2 !== 0) {
            throw new GameEngineException("TextRenderer.lineSeparation must be multiple of 2");
        }
    }

    protected start(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.ui = this.gameObject.ui;
        this.renderData.fontFamily = this.fontFamily;
        this.renderData.fontUrl = this.fontUrl;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.letterSpacing = this.letterSpacing;
        this.renderData.bitmapSize = this.bitmapSize;
        this.renderData.charRanges = this.charRanges;
        this.renderData.smooth = this.smooth;
        this.renderData.bitmapOffset = this.bitmapOffset;
        this.renderData.orientation = this.orientation;
    }

    protected update(): void {
        if (!this.text) return;

        this.renderData.width = this.width;
        this.renderData.height = this.height;
        this.renderData.text = this.text !== this.lastFrameText ? this.crop() : this.renderData.text;
        this.renderData.fontSize = this.fontSize;
        this.renderData.color = this.color;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData.opacity = this.opacity;
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.offset);

        this.renderManager.addRenderData(this.renderData);

        this.lastFrameText = this.text;
    }

    private crop(): string {
        if (this.fontSize > this.height) return "";

        let width = 0;
        let height = this.fontSize;
        let line = [];

        const text = [];
        const words = this.text.replace(/\n/, " \n ").split(" ");

        for (const word of words) {
            const wordWidth = word !== "\n" ? word.length * (this.fontSize + this.letterSpacing) : 0;

            if (word === "\n" || (width > 0 && width + wordWidth > this.width)) {
                text.push(line.join(" "));
                height += this.fontSize + this.lineSeparation;

                if (height > this.height) return text.join("\n");

                line = [];
                width = 0;
            }

            if (wordWidth > 0) {
                line.push(word);
                width += wordWidth;
            }
        }

        text.push(line.join(" "));
        return text.join("\n");
    }
}
