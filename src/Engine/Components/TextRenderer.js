import Component from "../Component";
import RenderData from "../Core/Rendering/RenderData";
import { PIVOT_CENTER } from "../Core/Rendering/RenderPivots";

export * from '../Core/Rendering/RenderPivots';

export default class TextRenderer extends Component {
    text = '';
    font = 'Sans';
    size = 12;
    color = '#000000';
    bold = false;
    italic = false;
    renderData = null;
    lineSeparation = 5;

    constructor(gameObject, config) {
        super(gameObject);

        this.renderData = new RenderData();

        this.text = config.text ? config.text : this.text;
        this.font = config.font ? config.font : this.font;
        this.size = config.size ? config.size : this.size
        this.color = config.color ? config.color : this.color;
        this.bold = config.bold ? config.bold : this.bold;
        this.italic = config.italic ? config.italic : this.italic;
        this.lineSeparation = config.lineSeparation ? config.lineSeparation : this.lineSeparation;
    }

    update(event) {
        this.renderData.text = this.text;
        this.renderData.textSize = this.size;
        this.renderData.color = this.color;
        this.renderData.font = this.font;
        this.renderData.position = this.gameObject.transform.position;
        this.renderData.lineSeparation = this.lineSeparation;
        this.renderData.bold = this.bold;
        this.renderData.italic = this.italic;

        event.renderManager.addToRenderStack(this.renderData);
    }
}