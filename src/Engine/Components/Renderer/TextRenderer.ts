import { RenderComponent } from "../../Component";
import { MiniEngineException } from "../../Core/Exception/MiniEngineException";
import { Pivot, TextRenderData } from "../../Core/Rendering/RenderData/TextRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Vector2 } from "../../Math/Vector2";

export interface TextRendererConfig {
    text: string;
    fontFamily: string;
    fontUrl?: string;
    size?: number;
    color?: string;
    lineSeparation?: number;
    letterSpacing?: number;
    pivot?: Pivot;
    smooth?: boolean;
    charRanges?: number[];
    bitmapSize?: number;
    bitmapOffset?: Vector2;
}

export const TYPE_TEXT_RENDERER = "TextRenderer";

export class TextRenderer extends RenderComponent {
    public text: string = null;
    public fontFamily: string = "Sans";
    public fontUrl: string = null;
    public size: number = 12;
    public color: string = "#000000";
    public lineSeparation: number = 0;
    public letterSpacing: number = 0;
    public pivot: Pivot = "left";
    public bitmapSize: number = 64;
    public charRanges: number[] = [32, 126, 161, 255];
    public smooth: boolean = false;
    public bitmapOffset: Vector2 = new Vector2();

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private renderData: TextRenderData = new TextRenderData();

    constructor(config: TextRendererConfig) {
        super();

        this.type = TYPE_TEXT_RENDERER;

        this.text = config.text;
        this.fontFamily = config.fontFamily;
        this.fontUrl = config.fontUrl ?? this.fontUrl;
        this.size = config.size ?? this.size;
        this.color = config.color ?? this.color;
        this.lineSeparation = config.lineSeparation ?? this.lineSeparation;
        this.letterSpacing = config.letterSpacing ?? this.letterSpacing;
        this.pivot = config.pivot ?? this.pivot;
        this.bitmapSize = config.bitmapSize ?? this.bitmapSize;
        this.charRanges = config.charRanges ?? this.charRanges;
        this.smooth = config.smooth ?? this.smooth;
        this.bitmapOffset = config.bitmapOffset ?? this.bitmapOffset;

        if (this.charRanges.length % 2 !== 0) {
            throw new MiniEngineException("TextRenderer.charRanges must be a 2 column matrix");
        }

        if (this.lineSeparation % 2 !== 0) {
            throw new MiniEngineException("TextRenderer.lineSeparation must be multiple of 2");
        }
    }

    protected start(): void {
        if (this.gameObject.ui === false) {
            throw new MiniEngineException("TextRenderer only can be used on UI GameObjects");
        }

        this.renderData.layer = this.gameObject.layer;
        this.renderData.ui = this.gameObject.ui;
        this.renderData.fontFamily = this.fontFamily;
        this.renderData.fontUrl = this.fontUrl;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.letterSpacing = this.letterSpacing;
        this.renderData.pivot = this.pivot;
        this.renderData.bitmapSize = this.bitmapSize;
        this.renderData.charRanges = this.charRanges;
        this.renderData.smooth = this.smooth;
        this.renderData.bitmapOffset = this.bitmapOffset;
    }

    protected update(): void {
        if (this.gameObject.ui === false) {
            throw new MiniEngineException("TextRenderer only can be used on UI GameObjects");
        }

        this.renderData.text = this.text;
        this.renderData.fontSize = this.size;
        this.renderData.color = this.color;
        this.renderData.position.set(this.gameObject.transform.position.x, this.gameObject.transform.position.y);

        this.renderManager.addRenderData(this.renderData);
    }
}
