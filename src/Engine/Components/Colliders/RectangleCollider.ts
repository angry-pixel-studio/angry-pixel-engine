import Component from "../../Component";
import ICollider from "../../Core/Collision/ICollider";
import RenderData, { GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData";
import GameObject, { LAYER_DEFAULT } from "../../GameObject";
import Rectangle from "../../Helper/Rectangle";
import Vector2 from "../../Helper/Vector2";

export default class RectangleCollider extends Component {
    private rectangle: Rectangle;
    private renderData: RenderData;

    constructor() {
        super();
        this.rectangle = new Rectangle(0, 0, 32, 32);
        this.renderData = new RenderData();
    }

    start(event: { [key: string]: any }): void {
        event.collisionManager.addCollider(this);
        this.renderData.position = new Vector2(this.rectangle.x - 16, this.rectangle.y + 16);
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.rectangle;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = '#FF0000';
    }

    update(event: { [key: string]: any }): void {
        this.rectangle.x = this.gameObject.transform.position.x - 16;
        this.rectangle.y = this.gameObject.transform.position.y + 16;
        this.renderData.position.x = this.rectangle.x;
        this.renderData.position.y = this.rectangle.y;
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
}
