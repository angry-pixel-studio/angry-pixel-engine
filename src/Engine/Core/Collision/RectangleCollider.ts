import { LAYER_DEFAULT } from "../../GameObject";
import Rectangle from "../../Helper/Rectangle";
import Vector2 from "../../Helper/Vector2";
import RenderData, { GEOMETRIC_RECTANGLE } from "../Rendering/RenderData";
import ICollider from "./ICollider";

interface Config {
    x: number;
    y: number;
    width: number;
    height: number
}

export default class RectangleCollider {
    private rectangle: Rectangle;
    private renderData: RenderData;

    constructor({ x, y, width, height }: Config) {
        this.rectangle = new Rectangle(x, y * -1, width, height);
        this.setupRenderData();
    }

    public collidesWith(other: ICollider): boolean {
        return true;
    }

    public getRectangle(): Rectangle {
        return this.rectangle;
    }

    public getRenderData(): RenderData {
        return this.renderData;
    }

    private setupRenderData(): void {
        this.renderData = new RenderData();
        this.renderData.position = new Vector2(this.rectangle.x, this.rectangle.y);
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.rectangle;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = '#00FF00';
    }
}
