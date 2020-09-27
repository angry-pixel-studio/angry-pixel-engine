import Component from "../../Component";
import RenderData from "../../Core/Rendering/RenderData";
import Game from "../../Game";

export * from "../../Core/Rendering/RenderPivots";

export type TextRendererConfig = {
    text: string;
    font: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
    lineSeparation: number;
    width: number;
    height: number;
};

export default class TextRenderer extends Component {
    public text: string = "";
    public font: string = "Sans";
    public size: number = 12;
    public color: string = "#000000";
    public bold: boolean = false;
    public italic: boolean = false;
    public renderData: RenderData = null;
    public lineSeparation: number = 5;
    public width: number = 0;
    public height: number = 0;

    constructor(config: TextRendererConfig) {
        super();

        this.renderData = new RenderData();

        this.text = config.text ? config.text : this.text;
        this.font = config.font ? config.font : this.font;
        this.size = config.size ? config.size : this.size;
        this.color = config.color ? config.color : this.color;
        this.bold = config.bold ? config.bold : this.bold;
        this.italic = config.italic ? config.italic : this.italic;
        this.lineSeparation = config.lineSeparation ? config.lineSeparation : this.lineSeparation;
        this.width = config.width ? config.width : this.width;
        this.height = config.height ? config.height : this.height;
    }

    start(): void {
        this.update();
    }

    update(): void {
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
        this.renderData.width = this.width;
        this.renderData.height = this.height;

        Game.renderManager.addToRenderStack(this.renderData);
    }
}
