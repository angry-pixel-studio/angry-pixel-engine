import { RenderComponent } from "../../Component";
import { TextRenderData } from "../../Core/Rendering/RenderData/TextRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";

interface Config {
    text: string | string[];
    font?: string;
    size?: number;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    lineSeparation?: number;
}

export const TYPE_TEXT_RENDERER = "TextRenderer";

export class TextRenderer extends RenderComponent {
    public text: string | string[] = null;
    public font: string = "Sans";
    public size: number = 12;
    public color: string = "#000000";
    public bold: boolean = false;
    public italic: boolean = false;
    public lineSeparation: number = 5;

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private renderData: TextRenderData = new TextRenderData();

    constructor(config: Config) {
        super();

        this.type = TYPE_TEXT_RENDERER;

        this.text = config.text;
        this.font = config.font ?? this.font;
        this.size = config.size ?? this.size;
        this.color = config.color ?? this.color;
        this.bold = config.bold ?? this.bold;
        this.italic = config.italic ?? this.italic;
        this.lineSeparation = config.lineSeparation ?? this.lineSeparation;
    }

    protected start(): void {
        this.update();
    }

    protected update(): void {
        if (this.gameObject.ui === false) {
            throw new Error("TextRenderer only can be used on UI GameObjects");
        }

        this.renderData.layer = this.gameObject.layer;
        this.renderData.ui = this.gameObject.ui;
        this.renderData.text = this.text;
        this.renderData.textSize = this.size;
        this.renderData.color = this.color;
        this.renderData.font = this.font;
        this.renderData.position.x = this.gameObject.transform.position.x;
        this.renderData.position.y = this.gameObject.transform.position.y;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.bold = this.bold;
        this.renderData.italic = this.italic;

        this.renderManager.addToRenderStack(this.renderData);
    }
}
